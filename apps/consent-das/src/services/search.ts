import { ParticipantResponsesRequest } from 'types/consentDas';
import { Result, failure, success, SystemError } from 'types/httpResponses';

import prisma, {
	Participant,
	ConsentQuestion,
	ConsentQuestionId,
	ParticipantResponse,
	ConsentCategory,
	ClinicianInvite,
} from '../prismaClient.js';
import { PrismaClientKnownRequestError } from '../generated/client/runtime/library.js';
import serviceLogger from '../logger.js';

const logger = serviceLogger.forModule('SearchService');

type GetParticipantFailureStatus = SystemError | 'PARTICIPANT_DOES_NOT_EXIST';
/**
 * Fetches participant by ID from Consent DB.
 * If the participant does not exist, returns a failure with status `"PARTICIPANT_DOES_NOT_EXIST"`.
 * @param participantId Participant ID in DB
 * @returns {Participant} Participant object from Consent DB
 */
export const getParticipantById = async (
	participantId: string,
): Promise<Result<Participant, GetParticipantFailureStatus>> => {
	return prisma.participant
		.findUniqueOrThrow({
			where: {
				id: participantId,
			},
		})
		.then((data) => success(data))
		.catch((error) => {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2025') {
					const errorMessage = `Participant with id '${participantId}' does not exist.`;
					logger.error(errorMessage, error.message);
					return failure('PARTICIPANT_DOES_NOT_EXIST', errorMessage);
				}
				logger.error(error.code, error.message);
				return failure(
					'SYSTEM_ERROR',
					`An unexpected error occurred in the PrismaClient - ${error.code}`,
				);
			}
			logger.error('Unexpected error handling get participant request.', error.message);
			return failure('SYSTEM_ERROR', 'An unexpected error occurred.');
		});
};

export const getParticipants = async (): Promise<Participant[]> => {
	// TODO: add error handling
	const result = await prisma.participant.findMany();
	return result;
};

export const getConsentQuestion = async (
	consentQuestionId: ConsentQuestionId,
): Promise<ConsentQuestion> => {
	// TODO: add error handling
	const result = await prisma.consentQuestion.findUniqueOrThrow({
		where: {
			id: consentQuestionId,
		},
	});
	return result;
};

/**
 * Fetches all consent questions, optionally filtered by category
 * @param category Optional category to filter, returns all consent questions if category is undefined
 * @returns {ConsentQuestion[]} Array of consent questions
 */
export const getConsentQuestions = async (
	category?: ConsentCategory,
): Promise<Result<ConsentQuestion[], SystemError>> => {
	return await prisma.consentQuestion
		.findMany({
			where: {
				AND: [{ category }],
			},
		})
		.then((data) => success(data))
		.catch((error) => {
			if (error instanceof PrismaClientKnownRequestError) {
				logger.error(error.code, error.message);
				return failure(
					'SYSTEM_ERROR',
					`An unexpected error occurred in the PrismaClient - ${error.code}`,
				);
			}
			logger.error('Unexpected error retrieving consent questions.', error.message);
			return failure('SYSTEM_ERROR', 'An unexpected error occurred.');
		});
};

/**
 * Fetches all participant responses for specified consent question from Consent DB.
 * If the participant does not exist, returns a failure with status `"PARTICIPANT_DOES_NOT_EXIST"`.
 * Consent question should exist because it expects `consentQuestionId` to be a `ConsentQuestionId` enum value.
 * @param sortOrder defaults to descending to sort by most recently submitted responses first
 * @returns {ParticipantResponse[]} All participant responses for consent question
 */
export const getParticipantResponses = async ({
	participantId,
	consentQuestionId,
	sortOrder,
}: ParticipantResponsesRequest): Promise<
	Result<ParticipantResponse[], GetParticipantFailureStatus>
> => {
	// Consent Question ID has already been verified
	// Check that participant exists, return failure if not
	const participantResult = await getParticipantById(participantId);

	if (participantResult.status !== 'SUCCESS') {
		return participantResult;
	}

	// Consent question and participant exist, retrieve all participant responses for that consent question
	return prisma.participantResponse
		.findMany({
			where: {
				participantId,
				consentQuestionId,
			},
			orderBy: {
				submittedAt: sortOrder,
			},
		})
		.then((data) => success(data))
		.catch((error) => {
			if (error instanceof PrismaClientKnownRequestError) {
				logger.error(error.code, error.message);
				return failure(
					'SYSTEM_ERROR',
					`An unexpected error occurred in the PrismaClient - ${error.code}`,
				);
			}
			logger.error('Unexpected error retrieving participant responses.', error.message);
			return failure('SYSTEM_ERROR', 'An unexpected error occurred.');
		});
};

type GetInviteFailureStatus = SystemError | 'INVITE_DOES_NOT_EXIST';
/**
 * Fetches clinician invite by ID from Consent DB.
 * If the invite does not exist, returns a failure with status `"INVITE_DOES_NOT_EXIST"`.
 * @param inviteId
 * @returns {ClinicianInvite} Clinician Invite
 */
export const getClinicianInviteById = async (
	inviteId: string,
): Promise<Result<ClinicianInvite, GetInviteFailureStatus>> => {
	return prisma.clinicianInvite
		.findUniqueOrThrow({
			where: {
				id: inviteId,
			},
		})
		.then((data) => success(data))
		.catch((error) => {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2025') {
					const errorMessage = `Invite with id '${inviteId}' does not exist.`;
					logger.error(errorMessage, error.message);
					return failure('INVITE_DOES_NOT_EXIST', errorMessage);
				}
				logger.error(error.code, error.message);
				return failure(
					'SYSTEM_ERROR',
					`An unexpected error occurred in the PrismaClient - ${error.code}`,
				);
			}
			logger.error('Unexpected error handling get invite request.', error.message);
			return failure('SYSTEM_ERROR', 'An unexpected error occurred.');
		});
};

export const getClinicianInvites = async (): Promise<ClinicianInvite[]> => {
	// TODO: add error handling
	const result = await prisma.clinicianInvite.findMany();
	return result;
};
