import prisma, { Participant, ConsentQuestion, ConsentCategory } from '../prismaClient';

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
