import { ClinicianInviteRequest, ClinicianInviteResponse } from 'types/dataMapper';
import { Result, failure, success } from 'types/httpResponses';

import serviceLogger from '../logger.js';

import { createInviteConsentData, createParticipantConsentData } from './das/consent.js';
import { createInvitePiData, createParticipantPiData, deleteInvitePiData } from './das/pi.js';
import { createParticipantOhipKey } from './das/keys.js';
import { saveParticipantOhipNumber } from './das/phi.js';

const logger = serviceLogger.forModule('CreateService');

// separates data along concerns to store in respective DASes
// will remove ohip data from this request, this would be added to an existing participant from the wizard
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
 * @returns {ClinicianInviteResponse} Created Clinician Invite data
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
			// Unable to create invite in Consent DB, rollback invite already created in PI
			const deletePiInvite = await deleteInvitePiData(piInviteResult.data.id);
			if (deletePiInvite.status !== 'SUCCESS') {
				logger.error('Error deleting existing PI invite', deletePiInvite.message);
				return failure('SYSTEM_ERROR', 'An unexpected error occurred.');
			}
			return consentInviteResult;
		}

		const invite = ClinicianInviteResponse.safeParse({
			...piInviteResult.data,
			...consentInviteResult.data,
		});

		if (!invite.success) {
			logger.error('Received invalid data in create invite response', invite.error.issues);
			return failure('SYSTEM_ERROR', invite.error.message);
		}

		return success(invite.data);
	} catch (error) {
		logger.error('Unexpected error handling create invite response', error);
		return failure('SYSTEM_ERROR', 'An unexpected error occurred.');
	}
};
