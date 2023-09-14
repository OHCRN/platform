import prisma, {
	Participant,
	ConsentQuestion,
	ConsentCategory,
	ParticipantResponse,
} from '../prismaClient';

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

export const createParticipantResponse = async ({
	participantId,
	consentQuestionId,
	response,
	submittedAt,
}: {
	participantId: string;
	consentQuestionId: string;
	response: boolean;
	submittedAt: Date;
}): Promise<ParticipantResponse> => {
	// TODO: add error handling
	const result = await prisma.participantResponse.create({
		data: {
			participantId,
			consentQuestionId,
			response,
			submittedAt,
		},
	});
	return result;
};
