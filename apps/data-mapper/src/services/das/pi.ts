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
import { Result, failure, success, SystemError } from 'types/httpResponses';
import {
	PIClinicianInviteRequest,
	PIClinicianInviteResponse,
	PICreateParticipantRequest,
	PICreateParticipantResponse,
} from 'types/dataMapper';
import urlJoin from 'url-join';

import { getAppConfig } from '../../config.js';
import serviceLogger from '../../logger.js';
import axiosClient from '../axiosClient.js';
import { CreateInviteFailureStatus } from '../create.js';
import { GetInviteFailureStatus } from '../search.js';

const logger = serviceLogger.forModule('PIClient');

/**
 * Makes request to PI DAS to fetch a Clinician Invite
 * @param inviteId
 * @returns {PIClinicianInviteResponse} ClinicianInvite object from PI DB
 */
export const getInvitePiData = async (
	inviteId: string,
): Promise<Result<PIClinicianInviteResponse, GetInviteFailureStatus>> => {
	const { piDasUrl } = getAppConfig();
	try {
		const { data } = await axiosClient.get(urlJoin(piDasUrl, 'clinician-invites', inviteId));

		const invite = PIClinicianInviteResponse.safeParse(data); // converts all nulls to undefined

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
 * Makes request to PI DAS to create a Clinician Invite
 * @param inviteRequest Clinician Invite data
 * @returns {PIClinicianInviteResponse} ClinicianInvite object from PI DB
 */
export const createInvitePiData = async (
	inviteRequest: PIClinicianInviteRequest,
): Promise<Result<PIClinicianInviteResponse, CreateInviteFailureStatus>> => {
	const { piDasUrl } = getAppConfig();
	try {
		const { data } = await axiosClient.post(urlJoin(piDasUrl, 'clinician-invites'), inviteRequest);

		const invite = PIClinicianInviteResponse.safeParse(data); // converts all nulls to undefined

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

type DeleteInviteFailureStatus = SystemError | 'INVITE_DOES_NOT_EXIST';
/**
 * Makes request to PI DAS to delete a Clinician Invite
 * @param inviteId ID of invite to be deleted
 * @returns
 */
export const deleteInvitePiData = async (
	inviteId: string,
): Promise<Result<null, DeleteInviteFailureStatus>> => {
	const { piDasUrl } = getAppConfig();
	try {
		await axiosClient.delete(urlJoin(piDasUrl, 'clinician-invites', inviteId));
		return success(null);
	} catch (error) {
		if (error instanceof AxiosError && error.response) {
			const { data, status } = error.response;
			logger.error('AxiosError handling delete invite request', data);

			if (status === 404) {
				return failure('INVITE_DOES_NOT_EXIST', data.message);
			}

			return failure('SYSTEM_ERROR', data.message);
		}
		logger.error('Unexpected error handling delete invite request', error);
		return failure('SYSTEM_ERROR', 'An unexpected error occurred.');
	}
};

type CreatePIParticipantFailureStatus = SystemError | 'PARTICIPANT_EXISTS';
/**
 * Makes request to PI DAS to create a Participant
 * Deletes Participant if response parsing fails
 * @param PICreateParticipantRequest PI create participant data
 * @returns {PICreateParticipantResponse} Participant object from PI DAS
 */
export const createParticipantPiData = async (
	req: PICreateParticipantRequest,
): Promise<Result<PICreateParticipantResponse, CreatePIParticipantFailureStatus>> => {
	const { piDasUrl } = getAppConfig();
	try {
		const { data } = await axiosClient.post(urlJoin(piDasUrl, 'participants'), req);

		const participant = PICreateParticipantResponse.safeParse(data.participant);
		if (!participant.success) {
			const participantIdInfo = data.participant.id
				? `for participantId: ${data.participant.id}`
				: '';
			logger.error(
				'Received invalid data from create participant response',
				participantIdInfo,
				participant.error.issues,
			);
			return failure('SYSTEM_ERROR', participant.error.message);
		}
		return success(participant.data);
	} catch (error) {
		if (error instanceof AxiosError && error.response) {
			const { data, status } = error.response;
			logger.error('AxiosError handling create participant request', data);

			if (status === 409) {
				return failure('PARTICIPANT_EXISTS', data.message);
			}

			return failure('SYSTEM_ERROR', data.message);
		}
		logger.error('Unexpected error handling create participant request', error);
		return failure('SYSTEM_ERROR', 'An unexpected error occurred.');
	}
};

type DeleteParticipantFailureStatus = SystemError | 'PARTICIPANT_DOES_NOT_EXIST';
/**
 * Makes request to PI DAS to delete a Participant
 * @param participantId ID of participant to be deleted
 */
export const deletePIParticipant = async (
	participantId: string,
): Promise<Result<null, DeleteParticipantFailureStatus>> => {
	const { piDasUrl } = getAppConfig();
	try {
		await axiosClient.delete(urlJoin(piDasUrl, 'participants', participantId));
		return success(null);
	} catch (error) {
		if (error instanceof AxiosError && error.response) {
			const { data, status } = error.response;
			logger.error('AxiosError handling delete participant request', data);

			if (status === 404) {
				return failure('PARTICIPANT_DOES_NOT_EXIST', data.message);
			}

			return failure('SYSTEM_ERROR', data.message);
		}
		logger.error('Unexpected error handling delete participant request', error);
		return failure('SYSTEM_ERROR', 'An unexpected error occurred.');
	}
};
