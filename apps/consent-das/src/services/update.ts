import prisma, { ConsentQuestion } from '../prismaClient';

export const updateConsentQuestionIsActive = async ({
	id,
	isActive,
}: {
	id: string;
	isActive: boolean;
}): Promise<ConsentQuestion> => {
	// TODO: add error handling
	const result = await prisma.consentQuestion.update({
		where: {
			id,
		},
		data: {
			isActive,
		},
	});
	return result;
};
