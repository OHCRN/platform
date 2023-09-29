import prisma, { Participant } from '@/prismaClient';

export const createParticipant = async ({
	name,
	email,
}: {
	name: string;
	email: string;
}): Promise<Participant> => {
	// TODO: add error handling
	const result = await prisma.participant.create({
		data: {
			name,
			email,
		},
	});
	return result;
};
