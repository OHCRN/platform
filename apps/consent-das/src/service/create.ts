import prisma, {
	Participant,
	ConsentQuestion,
	ConsentCategory,
	ConsentGroup,
	ParticipantResponse,
} from '../prismaClient.js';

export const createParticipant = async ({
	emailVerified,
	isGuardian,
	consentGroup,
	guardianIdVerified,
}: {
	emailVerified: boolean;
	isGuardian: boolean;
	consentGroup?: ConsentGroup;
	guardianIdVerified?: boolean;
}): Promise<Participant> => {
	// TODO: add error handling
	const result = await prisma.participant.create({
		data: {
			emailVerified,
			isGuardian,
			consentGroup,
			guardianIdVerified,
		},
	});
	return result;
};

export const createConsentQuestion = async ({
	consentQuestionId,
	isActive,
	category,
}: {
	consentQuestionId: string;
	isActive: boolean;
	category: ConsentCategory;
}): Promise<ConsentQuestion> => {
	// TODO: add error handling
	const result = await prisma.consentQuestion.create({
		data: {
			id: consentQuestionId,
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
