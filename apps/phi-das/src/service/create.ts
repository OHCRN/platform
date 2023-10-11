import prisma, { Ohip } from '../prismaClient.js';

export const createOhipNumber = async ({
	ohipPrivateKey,
	ohipNumber,
}: {
	ohipPrivateKey: string;
	ohipNumber: string;
}): Promise<Ohip> => {
	// TODO: add error handling
	const result = await prisma.ohip.create({
		data: {
			ohipPrivateKey,
			ohipNumber,
		},
	});
	return result;
};
