import prisma, { OhipKey, ClinicalProfileKey } from '../prismaClient.js';

export const createOhipKey = async ({
	participantId,
	ohipPrivateKey,
}: {
	participantId: string;
	ohipPrivateKey?: string;
}): Promise<OhipKey> => {
	// TODO: add error handling
	const result = await prisma.ohipKey.create({
		data: {
			participantId,
			ohipPrivateKey,
		},
	});
	return result;
};

export const createClinicalProfileKey = async ({
	participantId,
	clinicalProfilePrivateKey,
}: {
	participantId: string;
	clinicalProfilePrivateKey?: string;
}): Promise<ClinicalProfileKey> => {
	// TODO: add error handling
	const result = await prisma.clinicalProfileKey.create({
		data: {
			participantId,
			clinicalProfilePrivateKey,
		},
	});
	return result;
};
