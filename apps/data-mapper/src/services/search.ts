import { ClinicianInviteResponse, InformedConsentResponse } from 'types/dataMapper';
import { ConsentCategory, ConsentQuestionId } from 'types/entities';
import { Result, failure, isSuccess, success } from 'types/httpResponses';
import urlJoin from 'url-join';

import { getAppConfig } from '../config.js';
import serviceLogger from '../logger.js';

import axiosClient from './axiosClient.js';
import {
	getConsentQuestionsByCategory,
	getInviteConsentData,
	getParticipantResponsesByQuestionId,
} from './das/consent.js';
import { getInvitePiData } from './das/pi.js';

const logger = serviceLogger.forModule('SearchService');

const { INFORMED_CONSENT } = ConsentCategory.enum;

export type SystemError = 'SYSTEM_ERROR';
export type InvalidRequest = 'INVALID_REQUEST';

// PI-DAS
// TODO: add Type instead of any
const getParticipantPiData = async (participantId: string): Promise<any> => {
	const { piDasUrl } = getAppConfig();
	// TODO: add error handling
	const result = await axiosClient.get(urlJoin(piDasUrl, 'participants', participantId));
	return result.data.participant;
};

// KEYS-DAS
// TODO: add Type instead of any
const getParticipantOhipKey = async (participantId: string): Promise<any> => {
	const { keysDasUrl } = getAppConfig();
	// TODO: add error handling
	const result = await axiosClient.get(urlJoin(keysDasUrl, 'ohip-keys', participantId));
	return result.data.ohipKey.ohipPrivateKey;
};

// PHI-DAS
// TODO: add Type instead of any
const getParticipantOhipNumber = async (ohipPrivateKey: string): Promise<any> => {
	const { phiDasUrl } = getAppConfig();
	// TODO: add error handling
	const result = await axiosClient.get(urlJoin(phiDasUrl, 'ohip', ohipPrivateKey));
	return result.data.ohipData.ohipNumber;
};

// CONSENT-DAS
// TODO: add Type instead of any
const getParticipantConsentData = async (participantId: string): Promise<any> => {
	const { consentDasUrl } = getAppConfig();
	// TODO: add error handling
	const result = await axiosClient.get(urlJoin(consentDasUrl, 'participants', participantId));
	return result.data.participant;
};

// combines data from respective DASes to return a single Participant object
// TODO: add Type instead of any
export const getParticipant = async (participantId: string): Promise<any> => {
	const participantPiData = await getParticipantPiData(participantId);
	const participantOhipKey = await getParticipantOhipKey(participantId);
	const participantOhipNumber = await getParticipantOhipNumber(participantOhipKey);
	const participantConsentData = await getParticipantConsentData(participantId);

	return {
		...participantPiData,
		ohipNumber: participantOhipNumber,
		emailVerified: participantConsentData.emailVerified,
	};
};

export type GetResponsesFailureStatus = SystemError | InvalidRequest | 'PARTICIPANT_DOES_NOT_EXIST';
export type ParticipantResponsesByCategory = { [key in ConsentQuestionId]?: boolean };

/**
 * Fetches all consent questions for the category
 * and returns the most recent responses for each question
 * @returns {ParticipantResponsesByCategory} Most recent participant response for each consent question in the category
 */
export const getParticipantResponsesByCategory = async ({
	participantId,
	consentCategory,
}: {
	participantId: string;
	consentCategory: ConsentCategory;
}): Promise<Result<ParticipantResponsesByCategory, GetResponsesFailureStatus>> => {
	/**
	 * Steps:
	 * 1) Get all question IDs for the consent category
	 * 2) For each question ID get all participant responses for that question,
	 *    sorted in descending order (most to least recent)
	 * 3) Return most recent response for each question
	 */
	try {
		const consentQuestionsResult = await getConsentQuestionsByCategory(consentCategory);

		if (!isSuccess(consentQuestionsResult)) {
			return consentQuestionsResult;
		}
		// Fetch all ParticipantResponse entries by question
		const responses = await Promise.all(
			consentQuestionsResult.data.map(({ id: consentQuestionId }) =>
				getParticipantResponsesByQuestionId({
					participantId,
					consentQuestionId,
				}),
			),
		);
		// Search for any failures and return the first one
		const failedResponse = responses.find((result) => !isSuccess(result));
		if (failedResponse && !isSuccess(failedResponse)) {
			logger.error(
				`Unable to retrieve ${consentCategory} participant reponses`,
				failedResponse.message,
			);
			return failedResponse;
		}
		// Convert array of ParticipantResponses to key, value pair of the question ID, response
		const participantResponses = responses
			.filter(isSuccess)
			.reduce<ParticipantResponsesByCategory>((participantResponses, { data }) => {
				if (data.length) {
					const { consentQuestionId, response } = data[0]; // retrieve the first (most recent) ParticipantResponse
					participantResponses[consentQuestionId] = response;
				}
				return participantResponses;
			}, {});

		return success(participantResponses);
	} catch (error) {
		logger.error('Unexpected error retrieving participant responses.', error);
		return failure('SYSTEM_ERROR', 'An unexpected error occurred.');
	}
};

/**
 * Retrieves most recent responses for each INFORMED_CONSENT question
 * @param participantId ID of participant to retrieve responses for
 * @returns {InformedConsentResponse} most recent responses for Informed Consent
 */
export const getInformedConsentResponses = async (
	participantId: string,
): Promise<Result<InformedConsentResponse, GetResponsesFailureStatus>> => {
	try {
		const participantResponsesResult = await getParticipantResponsesByCategory({
			participantId,
			consentCategory: INFORMED_CONSENT,
		});

		if (!isSuccess(participantResponsesResult)) {
			return participantResponsesResult;
		}

		const informedConsentResponses = InformedConsentResponse.safeParse(
			participantResponsesResult.data,
		);

		if (!informedConsentResponses.success) {
			logger.error(
				'Received invalid data fetching Informed Consent responses.',
				informedConsentResponses.error.issues,
			);
			return failure('SYSTEM_ERROR', informedConsentResponses.error.message);
		}

		return success(informedConsentResponses.data);
	} catch (error) {
		logger.error('Unexpected error handling retrieving Informed Consent responses.', error);
		return failure('SYSTEM_ERROR', 'An unexpected error occurred.');
	}
};

export type GetInviteFailureStatus = SystemError | InvalidRequest | 'INVITE_DOES_NOT_EXIST';
/**
 * Fetches clinician invite in PI DAS first by inviteId,
 * then uses the same inviteId to get the corresponding invite in Consent DAS
 * Combines both invite objects and returns as Clinician Invite
 * @async
 * @param inviteId
 * @returns {ClinicianInviteResponse} Clinician Invite
 */
export const getInvite = async (
	inviteId: string,
): Promise<Result<ClinicianInviteResponse, GetInviteFailureStatus>> => {
	try {
		const piInviteResult = await getInvitePiData(inviteId);

		if (!isSuccess(piInviteResult)) {
			return piInviteResult;
		}

		const consentInviteResult = await getInviteConsentData(inviteId);

		if (!isSuccess(consentInviteResult)) {
			return consentInviteResult;
		}

		const invite = ClinicianInviteResponse.safeParse({
			...piInviteResult.data,
			...consentInviteResult.data,
		});

		if (!invite.success) {
			logger.error('Received invalid data in get invite response.', invite.error.issues);
			return failure('SYSTEM_ERROR', invite.error.message);
		}

		return success(invite.data);
	} catch (error) {
		logger.error('Unexpected error handling get invite request.', error);
		return failure('SYSTEM_ERROR', 'An unexpected error occurred.');
	}
};
