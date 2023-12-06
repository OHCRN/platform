import urlJoin from 'url-join';
import { ClinicianInviteRequest, ClinicianInviteResponse } from 'types/entities';
import { Result, failure, success } from 'types/httpResponses';

import serviceLogger from '../logger.js';
import { getAppConfig } from '../config.js';

import axiosClient from './axiosClient.js';
import { createInvitePiData } from './das/pi.js';
import { createInviteConsentData } from './das/consent.js';

const logger = serviceLogger.forModule('PrismaClient');

// PI-DAS
const createParticipantPiData = async ({
	name,
	email,
}: {
	name: string;
	email: string;
}): Promise<any> => {
	// TODO: add Type instead of any
	const { piDasUrl } = getAppConfig();
	// TODO: add error handling
	const result = await axiosClient.post(urlJoin(piDasUrl, 'participants'), {
		name,
		email,
	});
	return result.data.participant;
};

// KEYS-DAS
// TODO: add Type instead of any
const createParticipantOhipKey = async (participantId: string): Promise<any> => {
	const { keysDasUrl } = getAppConfig();
	// TODO: add error handling
	const result = await axiosClient.post(urlJoin(keysDasUrl, 'ohip-keys'), {
		participantId,
	});
	return result.data.ohipKey;
};

// PHI-DAS
const saveParticipantOhipNumber = async ({
	ohipPrivateKey,
	ohipNumber,
}: {
	ohipPrivateKey: string;
	ohipNumber: string;
}): Promise<any> => {
	// TODO: add Type instead of any
	const { phiDasUrl } = getAppConfig();
	// TODO: add error handling
	const result = await axiosClient.post(urlJoin(phiDasUrl, 'ohip'), {
		ohipPrivateKey,
		ohipNumber,
	});
	return result.data.ohipData.ohipNumber;
};

// CONSENT-DAS
const createParticipantConsentData = async ({
	participantId,
	emailVerified,
}: {
	participantId: string;
	emailVerified: boolean;
}): Promise<any> => {
	// TODO: add Type instead of any
	const { consentDasUrl } = getAppConfig();
	// TODO: add error handling
	const result = await axiosClient.post(urlJoin(consentDasUrl, 'participants'), {
		participantId,
		emailVerified,
	});
	return result.data.participant;
};

// separates data along concerns to store in respective DASes
export const createParticipant = async ({
	name,
	email,
	ohipNumber,
	emailVerified,
}: {
	name: string;
	email: string;
	ohipNumber: string;
	emailVerified: boolean;
}): Promise<any> => {
	// TODO: add Type instead of any
	const participantPiData = await createParticipantPiData({ name, email });
	const participantId = participantPiData.id;
	const participantOhipKey = await createParticipantOhipKey(participantId);
	const ohipPrivateKey = participantOhipKey.ohipPrivateKey;
	const participantOhipNumber = await saveParticipantOhipNumber({
		ohipPrivateKey,
		ohipNumber,
	});
	const participantConsentData = await createParticipantConsentData({
		participantId,
		emailVerified,
	});

	return {
		...participantPiData,
		ohipNumber: participantOhipNumber,
		emailVerified: participantConsentData.emailVerified,
	};
};

export type CreateInviteFailureStatus = 'SYSTEM_ERROR' | 'INVITE_EXISTS';
/**
 * Creates clinician invite in the PI DAS first to get an inviteId,
 * then uses the same inviteId to create a corresponding entry in the Consent DAS.
 * Makes a request to delete the created invite in PI DAS if an error occurs during
 * creation of entry in Consent DAS.
 * @async
 * @param data Clinician Invite request
 * @returns Created Clinician Invite data
 */
export const createInvite = async ({
	participantFirstName,
	participantLastName,
	participantEmailAddress,
	participantPhoneNumber,
	participantPreferredName,
	guardianName,
	guardianPhoneNumber,
	guardianEmailAddress,
	guardianRelationship,
	clinicianFirstName,
	clinicianLastName,
	clinicianInstitutionalEmailAddress,
	clinicianTitleOrRole,
	consentGroup,
	consentToBeContacted,
}: ClinicianInviteRequest): Promise<Result<ClinicianInviteResponse, CreateInviteFailureStatus>> => {
	/**
	 * Steps:
	 * 1) Creates invite in PI DAS
	 * 2) If error creating PI invite, returns the resulting `failure()` with an error status and message
	 * 3) If success, creates invite in Consent DAS with the same ID
	 * 4) If error creating Consent invite, deletes the previously created PI invite,
	 *    and returns the resulting `failure()` with an error status and message
	 * 5) If success, parses the combination of PI and Consent invites to validate response object
	 * 6) If error parsing, returns `failure()` with a SYSTEM_ERROR and Zod error message
	 * 7) If success, returns created invite
	 */
	try {
		const piInviteResult = await createInvitePiData({
			participantFirstName,
			participantLastName,
			participantEmailAddress,
			participantPhoneNumber,
			participantPreferredName,
			guardianName,
			guardianPhoneNumber,
			guardianEmailAddress,
			guardianRelationship,
		});

		if (piInviteResult.status !== 'SUCCESS') {
			return piInviteResult;
		}

		const consentInviteResult = await createInviteConsentData({
			id: piInviteResult.data.id,
			clinicianFirstName,
			clinicianLastName,
			clinicianInstitutionalEmailAddress,
			clinicianTitleOrRole,
			consentGroup,
			consentToBeContacted,
		});

		if (consentInviteResult.status !== 'SUCCESS') {
			// TODO: rollback/delete invite already created in PI
			return consentInviteResult;
		}

		const invite = ClinicianInviteResponse.safeParse({
			...piInviteResult.data,
			...consentInviteResult.data,
		});

		if (!invite.success) {
			logger.error('POST /invites', 'Received invalid data in response.', invite.error.issues);
			return failure('SYSTEM_ERROR', invite.error.message);
		}

		return success(invite.data);
	} catch (error) {
		logger.error('POST /invites', 'Unexpected error handling create invite request.', error);
		return failure('SYSTEM_ERROR', 'An unexpected error occurred.');
	}
};
