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
	category,
}: {
	id: string;
	isActive: boolean;
	category: ConsentCategory;
}): Promise<ConsentQuestion> => {
	// TODO: add error handling
	const result = await prisma.consentQuestion.create({
		data: {
			id,
			isActive,
			category,
		},
	});
	return result;
};

export const createParticipantResponse = async ({
	participantId,
	consentQuestionId,
	response,
}: {
	participantId: string;
	consentQuestionId: string;
	response: boolean;
}): Promise<ParticipantResponse> => {
	// TODO: add error handling
	const result = await prisma.participantResponse.create({
		data: {
			participantId,
			consentQuestionId,
			response,
		},
	});
	return result;
};
