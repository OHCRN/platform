import prisma, {
	Participant,
	ConsentQuestion,
	ConsentCategory,
	ConsentGroup,
	ParticipantResponse,
} from '../prismaClient';

export const createParticipant = async ({
	emailVerified,
	registeringOnBehalfOfSomeoneElse,
	consentGroup,
	registrantIdVerified,
}: {
	emailVerified: boolean;
	registeringOnBehalfOfSomeoneElse: boolean;
	consentGroup?: ConsentGroup;
	registrantIdVerified?: boolean;
}): Promise<Participant> => {
	// TODO: add error handling
	const result = await prisma.participant.create({
		data: {
			emailVerified,
			registeringOnBehalfOfSomeoneElse,
			consentGroup,
			registrantIdVerified,
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
