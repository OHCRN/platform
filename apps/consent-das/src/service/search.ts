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
	id: string,
	participantId: string,
	consentQuestionId: string,
): Promise<ParticipantResponse> => {
	// TODO: add error handling
	const result = await prisma.participantResponse.findUniqueOrThrow({
		where: {
			id_participantId_consentQuestionId: {
				id,
				participantId,
				consentQuestionId,
			},
		},
	});
	return result;
};

export const getParticipantResponses = async (): Promise<ParticipantResponse[]> => {
	// TODO: add error handling
	const result = await prisma.participantResponse.findMany();
	return result;
};
