import urlJoin from 'url-join';
import { ClinicianInviteRequest, ClinicianInviteResponse } from 'types/entities';

import logger from '../logger.js';
import { getAppConfig } from '../config.js';

import axiosClient from './axiosClient.js';
import { createInvitePiData } from './das/pi.js';
import { createInviteConsentData } from './das/consent.js';

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

/**
 * Creates clinician invite in the PI DAS first to get an inviteId,
 * then uses the same inviteId to create a corresponding entry in the Consent DAS
 * @async
 * @param {ClinicianInviteRequest} data
 * @returns {Promise<ClinicianInviteResponse>} Created Clinician Invite data
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
}: ClinicianInviteRequest): Promise<ClinicianInviteResponse> => {
	try {
		const invitePiData = await createInvitePiData({
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
		const inviteConsentData = await createInviteConsentData({
			id: invitePiData.id,
			clinicianFirstName,
			clinicianLastName,
			clinicianInstitutionalEmailAddress,
			clinicianTitleOrRole,
			consentGroup,
			consentToBeContacted,
		});
		// validate Consent and PI data together
		return ClinicianInviteResponse.parse({
			...invitePiData,
			...inviteConsentData,
		});
	} catch (error) {
		logger.error(error);
		// TODO: rollback/delete invites already created
		throw error; // TODO: remove and send custom error schema
	}
};
