import prisma, { OhipKey, ClinicalProfileKey } from '../prismaClient.js';

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

export const createClinicalProfileKey = async ({
	participantId,
}: {
	participantId: string;
}): Promise<ClinicalProfileKey> => {
	// TODO: add error handling
	const result = await prisma.clinicalProfileKey.create({
		data: {
			participantId,
		},
	});
	return result;
};
