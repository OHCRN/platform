// TODO: add Type instead of any
export const getParticipant = async (id: string): Promise<any> => {
	// TODO: fetch from data-mapper, then return the result
	return { id };
};

// TODO: add Type instead of any
export const getParticipants = async (): Promise<any[]> => {
	// TODO: fetch from data-mapper, then return the result
	return [];
};

// TODO: add Type instead of any
export const getConsentQuestion = async (id: string): Promise<any> => {
	// TODO: fetch from data-mapper, then return the result
	return { id };
};

// TODO: add Type instead of any
export const getConsentQuestions = async (parameters: any = {}): Promise<any[]> => {
	// TODO: fetch from data-mapper, then return the result
	return [parameters];
};

// TODO: add Type instead of any
export const getLatestParticipantResponseByParticipantIdAndQuestionId = async (
	participantId: string,
	consentQuestionId: string,
): Promise<any> => {
	// TODO: fetch from data-mapper, then return the result
	return { participantId, consentQuestionId };
};
