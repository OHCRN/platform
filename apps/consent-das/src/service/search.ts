import { Prisma } from '../generated/client/index.js';
import prisma, {
	Participant,
	ConsentQuestion,
	ParticipantResponse,
	ConsentCategory,
} from '../prismaClient.js';

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

export const getConsentQuestion = async (consentQuestionId: string): Promise<ConsentQuestion> => {
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
	consentQuestionId: string,
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
