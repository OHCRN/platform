import { ParticipantResponseRequest } from 'types/entities';
import { Result, failure, success } from 'types/httpResponses';

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

const logger = serviceLogger.forModule('PrismaClient');

type GetParticipantFailureStatus = 'SYSTEM_ERROR' | 'PARTICIPANT_DOES_NOT_EXIST';
/**
 * Fetches participant by ID from Consent DB.
 * If the participant does not exist, returns a failure with status `"PARTICIPANT_DOES_NOT_EXIST"`.
 * @param
 * @returns All participant responses for consent question
 */
export const getParticipant = async (
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
					logger.error('GET /:participantId/:consentQuestionId', errorMessage, error.message);
					return failure('PARTICIPANT_DOES_NOT_EXIST', errorMessage);
				}
				logger.error('GET /:participantId/:consentQuestionId', error.code, error.message);
				return failure(
					'SYSTEM_ERROR',
					`An unexpected error occurred in the PrismaClient - ${error.code}`,
				);
			}
			logger.error(
				'GET /:participantId/:consentQuestionId',
				'Unexpected error handling get participant request.',
				error.message,
			);
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

export const getConsentQuestions = async (
	category?: ConsentCategory,
): Promise<ConsentQuestion[]> => {
	// TODO: add error handling
	const result = await prisma.consentQuestion.findMany({
		where: {
			AND: [{ category }], // returns all consent questions if category is undefined
		},
	});
	return result;
};

/**
 * Fetches all participant responses for specified consent question from Consent DB.
 * If the participant does not exist, returns a failure with status `"PARTICIPANT_DOES_NOT_EXIST"`.
 * Consent question should exist because it expects `consentQuestionId` to be a `ConsentQuestionId` enum value.
 * @param
 * @returns All participant responses for consent question
 */
export const getParticipantResponses = async ({
	participantId,
	consentQuestionId,
	sortOrder,
}: ParticipantResponseRequest): Promise<
	Result<ParticipantResponse[], GetParticipantFailureStatus>
> => {
	// Consent Question ID has already been verified
	// Check that participant exists, return failure if not
	const participantResult = await getParticipant(participantId);

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
				// defaults to sort by most recently submitted responses first (descending)
				submittedAt: sortOrder,
			},
		})
		.then((data) => success(data))
		.catch((error) => {
			if (error instanceof PrismaClientKnownRequestError) {
				logger.error('GET /:participantId/:consentQuestionId', error.code, error.message);
				return failure(
					'SYSTEM_ERROR',
					`An unexpected error occurred in the PrismaClient - ${error.code}`,
				);
			}
			logger.error(
				'GET /:participantId/:consentQuestionId',
				'Unexpected error handling get participant response request.',
				error.message,
			);
			return failure('SYSTEM_ERROR', 'An unexpected error occurred.');
		});
};

export const getClinicianInvite = async (inviteId: string): Promise<ClinicianInvite> => {
	// TODO: add error handling
	const result = await prisma.clinicianInvite.findUniqueOrThrow({
		where: {
			id: inviteId,
		},
	});
	return result;
};

export const getClinicianInvites = async (): Promise<ClinicianInvite[]> => {
	// TODO: add error handling
	const result = await prisma.clinicianInvite.findMany();
	return result;
};
