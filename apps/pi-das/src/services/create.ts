import { Result, SystemError, failure, success } from 'types/httpResponses';
import { PIClinicianInviteRequest, PICreateParticipantRequest } from 'types/piDas';

import { PrismaClientKnownRequestError } from '../generated/client/runtime/library.js';
import serviceLogger from '../logger.js';
import prisma, { ClinicianInvite, Participant } from '../prismaClient.js';

const logger = serviceLogger.forModule('CreateService');

type CreateParticipantFailure = SystemError | 'PARTICIPANT_EXISTS';
/**
 * Creates a Participant entry in the PI DB
 * @param PICreateParticipantRequest Create Participant data
 * @returns PICreateParticipantResponse object from PI DB
 */
export const createParticipant = async (
	req: PICreateParticipantRequest,
): Promise<Result<Participant, CreateParticipantFailure>> => {
	const {
		participantOhipFirstName,
		participantOhipLastName,
		participantEmailAddress,
		participantPhoneNumber,
		participantPreferredName,
		dateOfBirth,
		guardianName,
		guardianEmailAddress,
		guardianPhoneNumber,
		guardianRelationship,
		keycloakId,
		inviteId,
		assentFormIdentifier,
	} = req;
	const result = await prisma.participant
		.create({
			data: {
				participantOhipFirstName,
				participantOhipLastName,
				dateOfBirth,
				participantEmailAddress,
				participantPhoneNumber,
				participantPreferredName,
				guardianName,
				guardianEmailAddress,
				guardianPhoneNumber,
				guardianRelationship,
				keycloakId,
				inviteId,
				assentFormIdentifier,
			},
		})
		.then((participant) => success(participant))
		.catch((error) => {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					const errorMessage = `A participant already exists with that '${
						error.meta?.target ?? 'data'
					}'`;
					logger.error('POST /participants', errorMessage, error.message);
					return failure('PARTICIPANT_EXISTS', errorMessage);
				}
				logger.error('POST /participants', error.code, error.message);
				return failure(
					'SYSTEM_ERROR',
					`An unexpected error occurred in the PrismaClient - ${error.code}`,
				);
			}
			logger.error(
				'POST /participants',
				'Unexpected error handling create participant request.',
				error.message,
			);
			return failure('SYSTEM_ERROR', 'An unexpected error occurred.');
		});
	return result;
};

type CreateInviteFailureStatus = SystemError | 'INVITE_EXISTS';
/**
 * Creates a ClinicianInvite entry in the PI DB
 * @param inviteRequest Clinician Invite data
 * @returns ClinicianInvite object from PI DB
 */
export const createClinicianInvite = async (
	inviteRequest: PIClinicianInviteRequest,
): Promise<Result<ClinicianInvite, CreateInviteFailureStatus>> => {
	return prisma.clinicianInvite
		.create({
			data: inviteRequest,
		})
		.then((invite) => success(invite))
		.catch((error) => {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					const errorMessage = `An invite already exists with that '${
						error.meta?.target ?? 'data'
					}'`;
					logger.error('POST /invites', errorMessage, error.message);
					return failure('INVITE_EXISTS', errorMessage);
				}
				logger.error('POST /invites', error.code, error.message);
				return failure(
					'SYSTEM_ERROR',
					`An unexpected error occurred in the PrismaClient - ${error.code}`,
				);
			}
			logger.error(
				'POST /invites',
				'Unexpected error handling create invite request.',
				error.message,
			);
			return failure('SYSTEM_ERROR', 'An unexpected error occurred.');
		});
};
