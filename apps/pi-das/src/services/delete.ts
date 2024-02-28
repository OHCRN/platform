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

import { Result, SystemError, failure, success } from 'types/httpResponses';

import prisma from '../prismaClient.js';
import { PrismaClientKnownRequestError } from '../generated/client/runtime/library.js';
import serviceLogger from '../logger.js';

const logger = serviceLogger.forModule('DeleteService');

type DeleteInviteFailureStatus = SystemError | 'INVITE_DOES_NOT_EXIST';
const DeleteInviteSuccess = { message: 'success' };
/**
 * Deletes a ClinicianInvite entry in the PI DB by invite ID
 * @param id Clinician Invite ID
 * @returns
 */
export const deleteClinicianInvite = async (
	inviteId: string,
): Promise<Result<typeof DeleteInviteSuccess, DeleteInviteFailureStatus>> => {
	return prisma.clinicianInvite
		.delete({
			where: { id: inviteId },
		})
		.then(() => success(DeleteInviteSuccess))
		.catch((error) => {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2025') {
					const errorMessage = `Invite with id '${inviteId}' does not exist.`;
					logger.error('DELETE /invites', errorMessage, error.message);
					return failure('INVITE_DOES_NOT_EXIST', errorMessage);
				}
				logger.error('DELETE /invites', error.code, error.message);
				return failure(
					'SYSTEM_ERROR',
					`An unexpected error occurred in the PrismaClient - ${error.code}`,
				);
			}
			logger.error(
				'DELETE /invites',
				'Unexpected error handling delete invite request.',
				error.message,
			);
			return failure('SYSTEM_ERROR', 'An unexpected error occurred.');
		});
};

type DeleteParticipantFailureStatus = SystemError | 'PARTICIPANT_DOES_NOT_EXIST';
const DeleteParticipantSuccess = { message: 'success' };
/**
 * Deletes a Participant entry in the PI DB by participant ID
 * @param id  ID
 */
export const deleteParticipant = async (
	participantId: string,
): Promise<Result<typeof DeleteParticipantSuccess, DeleteParticipantFailureStatus>> => {
	return prisma.participant
		.delete({
			where: { id: participantId },
		})
		.then(() => success(DeleteParticipantSuccess))
		.catch((error) => {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2025') {
					const errorMessage = `Participant with id '${participantId}' does not exist.`;
					logger.error('DELETE /participants', errorMessage, error.message);
					return failure('PARTICIPANT_DOES_NOT_EXIST', errorMessage);
				}
				logger.error('DELETE /participants', error.code, error.message);
				return failure(
					'SYSTEM_ERROR',
					`An unexpected error occurred in the PrismaClient - ${error.code}`,
				);
			}
			logger.error(
				'DELETE /participants',
				'Unexpected error handling delete participant request.',
				error.message,
			);
			return failure('SYSTEM_ERROR', 'An unexpected error occurred.');
		});
};
