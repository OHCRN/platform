import prisma, { OhipKey } from '../prismaClient.js';

export const createOhipKey = async ({
	participantId,
	id,
}: {
	participantId: string;
	id?: string;
}): Promise<OhipKey> => {
	// TODO: add error handling
	const result = await prisma.ohipKey.create({
		data: {
			participantId,
			id,
		},
	});
	return result;
};
