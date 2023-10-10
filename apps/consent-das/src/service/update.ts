import prisma, { ConsentQuestion } from '../prismaClient.js';

export const updateConsentQuestionIsActive = async ({
	consentQuestionId,
	isActive,
}: {
	consentQuestionId: string;
	isActive: boolean;
}): Promise<ConsentQuestion> => {
	// TODO: add error handling
	const result = await prisma.consentQuestion.update({
		where: {
			id: consentQuestionId,
		},
		data: {
			isActive,
		},
	});
	return result;
};
