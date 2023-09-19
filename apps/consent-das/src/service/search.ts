import prisma, { Participant, ConsentQuestion, ParticipantResponse } from '../prismaClient';

export const getParticipant = async (participantId: string): Promise<Participant> => {
	// TODO: add error handling
	const result = await prisma.participant.findUniqueOrThrow({
		where: {
			participantId,
		},
	});
	return result;
};

export const getParticipants = async (): Promise<Participant[]> => {
	// TODO: add error handling
	const result = await prisma.participant.findMany();
	return result;
};

export const getConsentQuestion = async (id: string): Promise<ConsentQuestion> => {
	// TODO: add error handling
	const result = await prisma.consentQuestion.findUniqueOrThrow({
		where: {
			id,
		},
	});
	return result;
};

export const getConsentQuestions = async (): Promise<ConsentQuestion[]> => {
	// TODO: add error handling
	const result = await prisma.consentQuestion.findMany();
	return result;
};

export const getParticipantResponse = async (
	participantId: string,
	consentQuestionId: string,
): Promise<ParticipantResponse> => {
	// TODO: add error handling
	const result = await prisma.participantResponse.findFirstOrThrow({
		where: {
			participantId,
			consentQuestionId,
		},
		orderBy: {
			// gets the most recently submitted response
			submittedAt: 'desc',
		},
	});
	return result;
};

export const getParticipantResponses = async (
	participantId: string,
	consentQuestionId: string,
	ascending?: boolean,
): Promise<ParticipantResponse[]> => {
	// TODO: add error handling
	const result = await prisma.participantResponse.findMany({
		where: {
			participantId,
			consentQuestionId,
		},
		orderBy: {
			// defaults to sort by most recently submitted responses first
			submittedAt: ascending ? 'asc' : 'desc',
		},
	});
	return result;
};
