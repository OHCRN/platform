import prisma, { Participant, ConsentQuestion, ConsentCategory } from '../prismaClient';

export const createParticipant = async ({
	participantId,
	emailVerified,
}: {
	participantId: string;
	emailVerified: boolean;
}): Promise<Participant> => {
	// TODO: add error handling
	const result = await prisma.participant.create({
		data: {
			participantId,
			emailVerified,
		},
	});
	return result;
};

export const createConsentQuestion = async ({
	id,
	isActive,
	createdAt,
	category,
}: {
	id: string;
	isActive: boolean;
	createdAt: Date;
	category: ConsentCategory;
}): Promise<ConsentQuestion> => {
	// TODO: add error handling
	const result = await prisma.consentQuestion.create({
		data: {
			id,
			isActive,
			createdAt,
			category,
		},
	});
	return result;
};
