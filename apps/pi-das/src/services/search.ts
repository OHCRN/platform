import prisma, { Participant, ClinicianInvite } from '../prismaClient.js';

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
