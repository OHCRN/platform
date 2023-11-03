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

export const createClinicianInvite = async ({
	clinicianFirstName,
	clinicianInstitutionalEmailAddress,
	clinicianInviteId,
	clinicianLastName,
	clinicianTitleOrRole,
	consentGroup,
	consentToBeContacted,
	inviteSentDate,
	inviteAcceptedDate,
	inviteAccepted,
}: {
	clinicianFirstName: string;
	clinicianInstitutionalEmailAddress: string;
	clinicianInviteId?: string;
	clinicianLastName: string;
	clinicianTitleOrRole: string;
	consentGroup: ConsentGroup;
	consentToBeContacted: boolean;
	inviteSentDate: Date;
	inviteAcceptedDate?: Date;
	inviteAccepted?: boolean;
}): Promise<ClinicianInvite> => {
	// TODO: add error handling
	const result = await prisma.clinicianInvite.create({
		data: {
			clinicianFirstName,
			clinicianInstitutionalEmailAddress,
			clinicianLastName,
			clinicianTitleOrRole,
			consentGroup,
			consentToBeContacted,
			id: clinicianInviteId,
			inviteSentDate,
			inviteAcceptedDate,
			inviteAccepted,
		},
	});
	return result;
};
