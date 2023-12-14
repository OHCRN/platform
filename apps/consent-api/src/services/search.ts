import urlJoin from 'url-join';
import { AxiosError } from 'axios';
import { InformedConsentResponse } from 'types/entities';
import { Result, failure, success } from 'types/httpResponses';

import serviceLogger from '../logger.js';
import { getAppConfig } from '../config.js';

import axiosClient from './axiosClient.js';

const logger = serviceLogger.forModule('SearchService');

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

export type GetResponsesFailureStatus = 'SYSTEM_ERROR';

/**
 * Retrieves most recent responses for each INFORMED_CONSENT question
 * by making request to Data Mapper, which fetches all questions for the category
 * and then fetches the corresponding response per question
 * @param participantId ID of participant to retrieve responses for
 * @returns
 */
export const getInformedConsentResponses = async (
	participantId: string,
): Promise<Result<InformedConsentResponse, GetResponsesFailureStatus>> => {
	try {
		const { dataMapperUrl } = getAppConfig();
		const { data } = await axiosClient.get(
			urlJoin(dataMapperUrl, 'wizard', 'steps', 'informed-consent', participantId),
		);
		const participantResponses = InformedConsentResponse.safeParse(data);

		if (!participantResponses.success) {
			logger.error(
				'Received invalid data in Informed Consent response',
				participantResponses.error.issues,
			);
			return failure('SYSTEM_ERROR', participantResponses.error.message);
		}

		return success(participantResponses.data);
	} catch (error) {
		if (error instanceof AxiosError && error.response) {
			const { data } = error.response;
			logger.error('AxiosError handling Informed Consent request', data);
			return failure('SYSTEM_ERROR', data.message);
		}
		logger.error('Unexpected error handling Informed Consent request.', error);
		return failure('SYSTEM_ERROR', 'An unexpected error occurred.');
	}
};
