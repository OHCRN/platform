import { Result, failure, success } from 'types/httpResponses';

import { Prisma } from '../generated/client/index.js';
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

export const getParticipant = async (participantId: string): Promise<Participant> => {
	// TODO: add error handling
	const result = await prisma.participant.findUniqueOrThrow({
		where: {
			id: participantId,
		},
	});
	return result;
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

export const getParticipantResponses = async (
	participantId: string,
	consentQuestionId: ConsentQuestionId,
	sortOrder: Prisma.SortOrder = Prisma.SortOrder.desc,
): Promise<ParticipantResponse[]> => {
	// TODO: add error handling
	const result = await prisma.participantResponse.findMany({
		where: {
			participantId,
			consentQuestionId,
		},
		orderBy: {
			// defaults to sort by most recently submitted responses first
			submittedAt: sortOrder,
		},
	});
	return result;
};

type GetInviteFailureStatus = 'SYSTEM_ERROR' | 'INVITE_DOES_NOT_EXIST';

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
