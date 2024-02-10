/*
 * Copyright (c) 2024 The Ontario Institute for Cancer Research. All rights reserved
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

import { ConsentClinicianInviteRequest, ConsentCreateParticipantRequest } from 'types/consentDas';
import { Result, failure, success, SystemError } from 'types/httpResponses';

import { PrismaClientKnownRequestError } from '../generated/client/runtime/library.js';
import serviceLogger from '../logger.js';
import prisma, {
	ClinicianInvite,
	ConsentCategory,
	ConsentQuestion,
	ConsentQuestionId,
	Participant,
	ParticipantResponse,
} from '../prismaClient.js';

const logger = serviceLogger.forModule('CreateService');

type CreateParticipantFailureStatus = SystemError | 'PARTICIPANT_EXISTS';
export const createParticipant = async (
	participantRequest: ConsentCreateParticipantRequest,
): Promise<Result<Participant, CreateParticipantFailureStatus>> => {
	return await prisma.participant
		.create({
			data: participantRequest,
		})
		.then((participant) => success(participant))
		.catch((error) => {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					const errorMessage = `A participant already exists with that '${
						error.meta?.target ?? 'data'
					}'`;
					logger.error('POST /participants', errorMessage, error.message);
					return failure('PARTICIPANT_EXISTS', errorMessage);
				}
				logger.error('POST /participants', error.code, error.message);
				return failure(
					'SYSTEM_ERROR',
					`An unexpected error occurred in the PrismaClient - ${error.code}`,
				);
			}
			logger.error(
				'POST /participants',
				'Unexpected error handling create participant request.',
				error.message,
			);
			return failure('SYSTEM_ERROR', 'An unexpected error occurred.');
		});
};

export const createConsentQuestion = async ({
	consentQuestionId,
	isActive,
	category,
}: {
	consentQuestionId: ConsentQuestionId;
	isActive: boolean;
	category: ConsentCategory;
}): Promise<ConsentQuestion> => {
	// TODO: add error handling
	const result = await prisma.consentQuestion.create({
		data: {
			id: consentQuestionId,
			isActive,
			category,
		},
	});
	return result;
};

export const createParticipantResponse = async ({
	participantId,
	consentQuestionId,
	response,
}: {
	participantId: string;
	consentQuestionId: ConsentQuestionId;
	response: boolean;
}): Promise<ParticipantResponse> => {
	// TODO: add error handling
	const result = await prisma.participantResponse.create({
		data: {
			participantId,
			consentQuestionId,
			response,
		},
	});
	return result;
};

type CreateInviteFailureStatus = SystemError | 'INVITE_EXISTS';
/**
 * Creates a ClinicianInvite entry in the Consent DB
 * @param inviteRequest Clinician Invite data
 * @returns ClinicianInvite object from Consent DB
 */
export const createClinicianInvite = async (
	inviteRequest: ConsentClinicianInviteRequest,
): Promise<Result<ClinicianInvite, CreateInviteFailureStatus>> => {
	return await prisma.clinicianInvite
		.create({
			data: inviteRequest,
		})
		.then((invite) => success(invite))
		.catch((error) => {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					// Prisma error code P2002 indicates "Unique constraint failed"
					// See docs: https://www.prisma.io/docs/reference/api-reference/error-reference#p2002
					const errorMessage = `An invite already exists with that '${
						error.meta?.target ?? 'data'
					}'`;
					logger.error('POST /invites', errorMessage, error.message);
					return failure('INVITE_EXISTS', errorMessage);
				}
				logger.error('POST /invites', error.code, error.message);
				return failure(
					'SYSTEM_ERROR',
					`An unexpected error occurred in the PrismaClient - ${error.code}`,
				);
			}
			logger.error(
				'POST /invites',
				'Unexpected error handling create invite request.',
				error.message,
			);
			return failure('SYSTEM_ERROR', 'An unexpected error occurred.');
		});
};
