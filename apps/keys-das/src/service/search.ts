import prisma, { ClinicalProfileKey, OhipKey } from '../prismaClient';

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

export const getClinicalProfileKey = async (participantId: string): Promise<ClinicalProfileKey> => {
	// TODO: add error handling
	const result = await prisma.clinicalProfileKey.findUniqueOrThrow({
		where: {
			participantId,
		},
	});
	return result;
};

export const getClinicalProfileKeys = async (): Promise<ClinicalProfileKey[]> => {
	// TODO: add error handling
	const result = await prisma.clinicalProfileKey.findMany();
	return result;
};
