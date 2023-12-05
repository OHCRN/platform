import { ConsentClinicianInviteRequest } from 'types/entities';
import { Result, failure, success } from 'types/httpResponses';

import prisma, {
	Participant,
	ConsentQuestion,
	ConsentCategory,
	ConsentGroup,
	ParticipantResponse,
	ClinicianInvite,
	ConsentQuestionId,
	LifecycleState,
} from '../prismaClient.js';
import serviceLogger from '../logger.js';

const logger = serviceLogger.forModule('PrismaClient');

export const createParticipant = async ({
	emailVerified,
	isGuardian,
	consentGroup,
	guardianIdVerified,
	participantId,
	currentLifecycleState,
	previousLifecycleState,
}: {
	emailVerified: boolean;
	isGuardian: boolean;
	consentGroup: ConsentGroup;
	guardianIdVerified?: boolean;
	participantId?: string;
	currentLifecycleState?: LifecycleState;
	previousLifecycleState?: LifecycleState;
}): Promise<Participant> => {
	// TODO: add error handling
	const result = await prisma.participant.create({
		data: {
			emailVerified,
			isGuardian,
			consentGroup,
			guardianIdVerified,
			id: participantId,
			currentLifecycleState,
			previousLifecycleState,
		},
	});
	return result;
};

export const createConsentQuestion = async ({
	consentQuestionId,
	isActive,
	category,
}: {
	consentQuestionId: ConsentQuestionId;
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
	consentQuestionId: ConsentQuestionId;
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

type CreateInviteFailureStatus = 'SYSTEM_ERROR';
/**
 * Creates a ClinicianInvite entry in the Consent DB
 * @param inviteRequest Clinician Invite data
 * @returns ClinicianInvite object from Consent DB
 */
export const createClinicianInvite = async (
	inviteRequest: ConsentClinicianInviteRequest,
): Promise<Result<ClinicianInvite, CreateInviteFailureStatus>> => {
	return await prisma.clinicianInvite
		.create({
			data: inviteRequest,
		})
		.then((invite) => success(invite))
		.catch((error) => {
			logger.error(
				'POST /invites',
				'Unexpected error handling create invite request.',
				error.message,
			);
			return failure('SYSTEM_ERROR', 'An unexpected error occurred.');
		});
};
