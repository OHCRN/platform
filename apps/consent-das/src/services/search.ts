import { Prisma } from '../generated/client/index.js';
import prisma, {
	Participant,
	ConsentQuestion,
	ConsentQuestionId,
	ParticipantResponse,
	ConsentCategory,
	ClinicianInvite,
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

export const getClinicianInvite = async (inviteId: string): Promise<ClinicianInvite> => {
	// TODO: add error handling
	const result = await prisma.clinicianInvite.findUniqueOrThrow({
		where: {
			id: inviteId,
		},
	});
	return result;
};

export const getClinicianInvites = async (): Promise<ClinicianInvite[]> => {
	// TODO: add error handling
	const result = await prisma.clinicianInvite.findMany();
	return result;
};
