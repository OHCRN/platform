import prisma, { ConsentQuestion, ConsentQuestionId } from '../prismaClient.js';

export const updateConsentQuestionIsActive = async ({
	consentQuestionId,
	isActive,
}: {
	consentQuestionId: ConsentQuestionId;
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
