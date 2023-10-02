import prisma, { Participant } from '../prismaClient';

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
