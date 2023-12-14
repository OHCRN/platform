import urlJoin from 'url-join';
import { Result, failure, success } from 'types/httpResponses';
import { ClinicianInviteResponse } from 'types/entities';

import { getAppConfig } from '../config.js';
import serviceLogger from '../logger.js';

import axiosClient from './axiosClient.js';
import { getInvitePiData } from './das/pi.js';
import { getInviteConsentData } from './das/consent.js';

const logger = serviceLogger.forModule('SearchService');

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

export type GetInviteFailureStatus = 'SYSTEM_ERROR' | 'INVITE_DOES_NOT_EXIST';
/**
 * Fetches clinician invite in PI DAS first by inviteId,
 * then uses the same inviteId to get the corresponding invite in Consent DAS
 * Combines both invite objects and returns as Clinician Invite
 * @async
 * @param inviteId
 * @returns Clinician Invite
 */
export const getInvite = async (
	inviteId: string,
): Promise<Result<ClinicianInviteResponse, GetInviteFailureStatus>> => {
	try {
		const piInviteResult = await getInvitePiData(inviteId);

		if (piInviteResult.status !== 'SUCCESS') {
			return piInviteResult;
		}

		const consentInviteResult = await getInviteConsentData(inviteId);

		if (consentInviteResult.status !== 'SUCCESS') {
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
