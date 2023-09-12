import prisma, { Ohip } from '../prismaClient';

export const getOhipNumber = async (ohipPrivateKey: string): Promise<Ohip> => {
	// TODO: add error handling
	const result = await prisma.ohip.findUniqueOrThrow({
		where: {
			ohipPrivateKey,
		},
	});
	return result;
};

export const getOhipNumbers = async (): Promise<Ohip[]> => {
	// TODO: add error handling
	const result = await prisma.ohip.findMany();
	return result;
};
