import prisma, { OhipKey } from '../prismaClient.js';

export const createOhipKey = async ({
	participantId,
}: {
	participantId: string;
}): Promise<OhipKey> => {
	// TODO: add error handling
	const result = await prisma.ohipKey.create({
		data: {
			participantId,
		},
	});
	return result;
};
