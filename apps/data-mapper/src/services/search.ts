import urlJoin from 'url-join';
import { ConsentCategory, ConsentQuestionId, InformedConsentResponse } from 'types/entities';
import { Result, failure, success } from 'types/httpResponses';

import { getAppConfig } from '../config.js';
import logger from '../logger.js';

import axiosClient from './axiosClient.js';
import {
	getConsentQuestionsByCategory,
	getParticipantResponsesByQuestionId,
} from './das/consent.js';

const { INFORMED_CONSENT } = ConsentCategory.enum;

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

export type GetResponsesFailureStatus = 'SYSTEM_ERROR' | 'PARTICIPANT_DOES_NOT_EXIST';
export type ParticipantResponsesByCategory = { [key in ConsentQuestionId]?: boolean };

/**
 * Fetches all consent questions for the category
 * and returns the most recent responses for each question
 * @param
 * @returns Most recent participant response for each consent question in the category
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
		const consentQuestions = await getConsentQuestionsByCategory(consentCategory);

		if (consentQuestions.status !== 'SUCCESS') {
			return failure('SYSTEM_ERROR', consentQuestions.message);
		}

		const participantResponses: ParticipantResponsesByCategory = {};

		for (const consentQuestion of consentQuestions.data) {
			const responsesResult = await getParticipantResponsesByQuestionId({
				participantId,
				consentQuestionId: consentQuestion.id,
			});

			if (responsesResult.status !== 'SUCCESS') {
				return responsesResult;
			}

			const { consentQuestionId, response } = responsesResult.data[0]; // first item is most recent response
			participantResponses[consentQuestionId] = response;
		}

		return success(participantResponses);
	} catch (error) {
		logger.error('Unexpected error retrieving participant responses.', error);
		return failure('SYSTEM_ERROR', 'An unexpected error occurred.');
	}
};

/**
 * Retrieves most recent responses for each INFORMED_CONSENT question
 * @param participantId ID of participant to retrieve responses for
 * @returns
 */
export const getInformedConsentResponses = async (
	participantId: string,
): Promise<Result<InformedConsentResponse, GetResponsesFailureStatus>> => {
	try {
		const participantResponsesResult = await getParticipantResponsesByCategory({
			participantId,
			consentCategory: INFORMED_CONSENT,
		});

		if (participantResponsesResult.status !== 'SUCCESS') {
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
