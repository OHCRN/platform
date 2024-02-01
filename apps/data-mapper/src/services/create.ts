import {
	ClinicianInviteRequest,
	ClinicianInviteResponse,
	CreateParticipantRequest,
	CreateParticipantResponse,
} from 'types/dataMapper';
import { Result, failure, success, SystemError } from 'types/httpResponses';

import serviceLogger from '../logger.js';

import { createInviteConsentData, createParticipantConsentData } from './das/consent.js';
import {
	createInvitePiData,
	createParticipantPiData,
	deleteInvitePiData,
	deletePIParticipant,
} from './das/pi.js';

const logger = serviceLogger.forModule('CreateService');

type CreateParticipantFailureStatus = SystemError | 'PARTICIPANT_EXISTS';
/**
 * Creates a participant first in the PI DAS,
 * then uses the created participantId to create a corresponding entry in the Consent DAS.
 * Will delete PI DAS participant if an error occurs during PI response parsing or
 * participant creation in Consent DAS.
 * @async
 * @param {CreateParticipantRequest}
 * @returns {CreateParticipantResponse} Created Participant data
 */
export const createParticipant = async ({
	participantOhipFirstName,
	participantOhipLastName,
	dateOfBirth,
	participantPhoneNumber,
	participantPreferredName,
	participantEmailAddress,
	isGuardian,
	guardianEmailAddress,
	guardianPhoneNumber,
	guardianRelationship,
	guardianName,
	consentToBeContacted,
	consentGroup,
	emailVerified,
	currentLifecycleState,
	keycloakId,
}: CreateParticipantRequest): Promise<
	Result<CreateParticipantResponse, CreateParticipantFailureStatus>
> => {
	/**
	 * Steps:
	 * 1) Creates participant in PI DAS
	 * 2) If error creating PI participant, returns the resulting `failure()` with an error status and message.
	 * 3) If success, creates participant in Consent DAS with the same ID
	 * 4) If error creating Consent participant, deletes the previously created PI participant,
	 *    and returns the resulting `failure()` with an error status and message
	 * 5) If success, parses the combination of PI and Consent participants to validate response object
	 * 6) If error parsing, returns `failure()` with a SYSTEM_ERROR and Zod error message
	 * 7) If success, returns created participant
	 */
	try {
		// create participant in pi-das
		const participantPiData = await createParticipantPiData({
			participantOhipFirstName,
			participantOhipLastName,
			dateOfBirth,
			participantPhoneNumber,
			participantPreferredName,
			participantEmailAddress,
			guardianEmailAddress,
			guardianPhoneNumber,
			guardianRelationship,
			guardianName,
			consentGroup,
			keycloakId,
		});

		if (participantPiData.status !== 'SUCCESS') {
			return participantPiData;
		}

		const participantId = participantPiData.data.id;
		// create participant in consent-das with pi id
		const participantConsentData = await createParticipantConsentData({
			id: participantId,
			consentToBeContacted,
			consentGroup,
			isGuardian,
			currentLifecycleState,
			emailVerified,
		});

		if (participantConsentData.status !== 'SUCCESS') {
			// Unable to create participant in Consent DAS, rollback participant already created in PI-DAS
			const deletePiParticipant = await deletePIParticipant(participantId);
			if (deletePiParticipant.status !== 'SUCCESS') {
				logger.error(
					'Error deleting existing PI participant:',
					participantId,
					deletePiParticipant.message,
				);
				return failure('SYSTEM_ERROR', 'An unexpected error occurred.');
			}
			return participantConsentData;
		}
		// parse complete result from both dases
		const result = CreateParticipantResponse.safeParse({
			...participantPiData,
			...participantConsentData,
		});
		if (!result.success) {
			logger.error('Received invalid data in create participant response', result.error.issues);
			return failure('SYSTEM_ERROR', result.error.message);
		}
		return success(result.data);
	} catch (error) {
		logger.error('Unexpected error handling create participant response', error);
		return failure('SYSTEM_ERROR', 'An unexpected error occurred.');
	}
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
