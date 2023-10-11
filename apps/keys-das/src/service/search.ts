import prisma, { OhipKey } from '../prismaClient.js';

export const getOhipKey = async (participantId: string): Promise<OhipKey> => {
	// TODO: add error handling
	const result = await prisma.ohipKey.findUniqueOrThrow({
		where: {
			participantId,
		},
	});
	return result;
};

export const getOhipKeys = async (): Promise<OhipKey[]> => {
	// TODO: add error handling
	const result = await prisma.ohipKey.findMany();
	return result;
};
