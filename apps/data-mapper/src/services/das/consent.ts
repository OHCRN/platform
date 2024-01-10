/*
 * Copyright (c) 2023 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { AxiosError } from 'axios';
import {
	ConsentCategory,
	ConsentClinicianInviteRequest,
	ConsentClinicianInviteResponse,
	ConsentQuestionArray,
	ConsentQuestionId,
} from 'types/entities';
import { Result, failure, success } from 'types/httpResponses';
import { ParticipantResponseArray } from 'types/dataMapper';
import urlJoin from 'url-join';

import { getAppConfig } from '../../config.js';
import serviceLogger from '../../logger.js';
import axiosClient from '../axiosClient.js';
import { CreateInviteFailureStatus } from '../create.js';
import { GetInviteFailureStatus, GetResponsesFailureStatus } from '../search.js';

const logger = serviceLogger.forModule('ConsentClient');

/**
 * Makes request to Consent DAS to fetch a Clinician Invite
 * @param inviteId
 * @returns {ConsentClinicianInviteResponse} ClinicianInvite object from Consent DB
 */
export const getInviteConsentData = async (
	inviteId: string,
): Promise<Result<ConsentClinicianInviteResponse, GetInviteFailureStatus>> => {
	const { consentDasUrl } = getAppConfig();
	try {
		const { data } = await axiosClient.get(urlJoin(consentDasUrl, 'clinician-invites', inviteId));

		const invite = ConsentClinicianInviteResponse.safeParse(data); // converts all nulls to undefined

		if (!invite.success) {
			logger.error('Received invalid data in get invite response', invite.error.issues);
			return failure('SYSTEM_ERROR', invite.error.message);
		}

		return success(invite.data);
	} catch (error) {
		if (error instanceof AxiosError && error.response) {
			const { data, status } = error.response;

			if (status === 400) {
				logger.error('Invalid request while retrieving invite', data);
				return failure('INVALID_REQUEST', data.message);
			}

			if (status === 404) {
				logger.error('Invite does not exist', data);
				return failure('INVITE_DOES_NOT_EXIST', data.message);
			}

			logger.error('AxiosError handling get invite request', data);
			return failure('SYSTEM_ERROR', data.message);
		}
		logger.error('Unexpected error handling get invite request', error);
		return failure('SYSTEM_ERROR', 'An unexpected error occurred.');
	}
};

/**
 * Makes request to Consent DAS to create a Clinician Invite
 * @param inviteRequest Clinician Invite data
 * @returns {ConsentClinicianInviteResponse} ClinicianInvite object from Consent DB
 */
export const createInviteConsentData = async (
	inviteRequest: ConsentClinicianInviteRequest,
): Promise<Result<ConsentClinicianInviteResponse, CreateInviteFailureStatus>> => {
	const { consentDasUrl } = getAppConfig();
	try {
		const { data } = await axiosClient.post(
			urlJoin(consentDasUrl, 'clinician-invites'),
			inviteRequest,
		);

		const invite = ConsentClinicianInviteResponse.safeParse(data); // converts all nulls to undefined

		if (!invite.success) {
			logger.error('Received invalid data in create invite response', invite.error.issues);
			return failure('SYSTEM_ERROR', invite.error.message);
		}

		return success(invite.data);
	} catch (error) {
		if (error instanceof AxiosError && error.response) {
			const { data, status } = error.response;
			logger.error('AxiosError handling create invite request', data);

			if (status === 409) {
				return failure('INVITE_EXISTS', data.message);
			}

			return failure('SYSTEM_ERROR', data.message);
		}
		logger.error('Unexpected error handling create invite request', error);
		return failure('SYSTEM_ERROR', 'An unexpected error occurred.');
	}
};

/**
 * Fetches all consent questions under the specified category
 * @param category Consent category i.e. step name in Consent Wizard
 * @returns {ConsentQuestionArray} Consent questions for the category
 */
export const getConsentQuestionsByCategory = async (
	category: ConsentCategory,
): Promise<Result<ConsentQuestionArray, GetResponsesFailureStatus>> => {
	try {
		const { consentDasUrl } = getAppConfig();
		const consentQuestionsUrl = new URL(urlJoin(consentDasUrl, 'consent-questions'));
		consentQuestionsUrl.searchParams.append('category', category);

		const { data } = await axiosClient.get(consentQuestionsUrl.toString());

		const consentQuestions = ConsentQuestionArray.safeParse(data);

		if (!consentQuestions.success) {
			logger.error(
				'Received invalid data fetching consent questions',
				consentQuestions.error.issues,
			);
			return failure('SYSTEM_ERROR', consentQuestions.error.message);
		}

		return success(consentQuestions.data);
	} catch (error) {
		if (error instanceof AxiosError && error.response) {
			const { data, status } = error.response;

			if (status === 400) {
				logger.error('Invalid request while retrieving consent questions', data);
				return failure('INVALID_REQUEST', data.message);
			}

			logger.error('AxiosError retrieving consent questions', data);

			return failure('SYSTEM_ERROR', data.message);
		}
		logger.error('Unexpected error retrieving consent questions', error);
		return failure('SYSTEM_ERROR', 'An unexpected error occurred.');
	}
};

/**
 * Fetches all participant responses for a given consent question
 * sorted in order of most to least recent
 * @param consentQuestionId
 * @returns {ParticipantResponseArray} Array of all responses sorted by most to least recent
 */
export const getParticipantResponsesByQuestionId = async ({
	participantId,
	consentQuestionId,
}: {
	participantId: string;
	consentQuestionId: ConsentQuestionId;
}): Promise<Result<ParticipantResponseArray, GetResponsesFailureStatus>> => {
	try {
		const { consentDasUrl } = getAppConfig();
		const { data } = await axiosClient.get(
			urlJoin(consentDasUrl, 'participant-responses', participantId, consentQuestionId),
		);

		const participantResponses = ParticipantResponseArray.safeParse(data);

		if (!participantResponses.success) {
			logger.error(
				'Received invalid data fetching participant responses',
				participantResponses.error.issues,
			);
			return failure('SYSTEM_ERROR', participantResponses.error.message);
		}

		return success(participantResponses.data);
	} catch (error) {
		if (error instanceof AxiosError && error.response) {
			const { data, status } = error.response;

			if (status === 400) {
				logger.error('Invalid request while retrieving participant responses', data);
				return failure('INVALID_REQUEST', data.message);
			}

			if (status === 404) {
				logger.error('Participant does not exist', data);
				return failure('PARTICIPANT_DOES_NOT_EXIST', data.message);
			}

			logger.error('AxiosError retrieving participant responses', data);

			return failure('SYSTEM_ERROR', data.message);
		}
		logger.error('Unexpected error retrieving participant responses', error);
		return failure('SYSTEM_ERROR', 'An unexpected error occurred.');
	}
};
