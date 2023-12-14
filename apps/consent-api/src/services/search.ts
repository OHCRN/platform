import urlJoin from 'url-join';
import { AxiosError } from 'axios';
import { Result, failure, success } from 'types/httpResponses';
import { ClinicianInviteResponse } from 'types/entities';

import serviceLogger from '../logger.js';
import { getAppConfig } from '../config.js';

import axiosClient from './axiosClient.js';

const logger = serviceLogger.forModule('DataMapperClient');

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

export type GetInviteFailureStatus = 'SYSTEM_ERROR' | 'INVITE_DOES_NOT_EXIST';
/**
 * Retrieves clinician invite data from Consent and PI DAS
 * by making GET request to Data Mapper's `/invites` route
 * @param inviteId Clinician Invite ID
 * @returns Clinician Invite object
 */
export const getInvite = async (
	inviteId: string,
): Promise<Result<ClinicianInviteResponse, GetInviteFailureStatus>> => {
	try {
		const { dataMapperUrl } = getAppConfig();
		const { data } = await axiosClient.get(urlJoin(dataMapperUrl, 'invites', inviteId));
		const invite = ClinicianInviteResponse.safeParse(data);

		if (!invite.success) {
			logger.error('Received invalid data in get invite response', invite.error.issues);
			return failure('SYSTEM_ERROR', invite.error.message);
		}

		return success(invite.data);
	} catch (error) {
		if (error instanceof AxiosError && error.response) {
			const { data, status } = error.response;
			logger.error('AxiosError handling get invite request', data);

			if (status === 404) {
				return failure('INVITE_DOES_NOT_EXIST', data.message);
			}

			return failure('SYSTEM_ERROR', data.message);
		}
		logger.error('Unexpected error handling get invite request', error);
		return failure('SYSTEM_ERROR', 'An unexpected error occurred.');
	}
};
