export const createResponse = async ({
	consentQuestionId,
	participantId,
	response,
}: {
	consentQuestionId: string;
	participantId: string;
	response: boolean;
}): Promise<any> => {
	const updateObj = {
		consentQuestionId,
		participantId,
		response,
	};

	// TODO: POST to data-mapper, then return the result
	return updateObj;
};
