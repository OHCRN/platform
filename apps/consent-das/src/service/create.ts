import prisma, { Participant } from '../prismaClient';

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
