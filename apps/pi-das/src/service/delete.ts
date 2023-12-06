import { DeleteClinicianInviteRequest } from 'types/entities';
import { Result, failure, success } from 'types/httpResponses';

import prisma from '../prismaClient.js';
import { PrismaClientKnownRequestError } from '../generated/client/runtime/library.js';
import serviceLogger from '../logger.js';

const logger = serviceLogger.forModule('PrismaClient');

type DeleteInviteFailureStatus = 'SYSTEM_ERROR' | 'INVITE_DOES_NOT_EXIST';
const DeleteInviteSuccess = { message: 'success' };
/**
 * Deletes a ClinicianInvite entry in the PI DB by invite ID
 * @param id Clinician Invite ID
 * @returns
 */
export const deleteClinicianInvite = async ({
	id,
}: DeleteClinicianInviteRequest): Promise<
	Result<typeof DeleteInviteSuccess, DeleteInviteFailureStatus>
> => {
	return await prisma.clinicianInvite
		.delete({
			where: { id },
		})
		.then(() => success(DeleteInviteSuccess))
		.catch((error) => {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2025') {
					// Prisma error code P2025 indicates the record does not exist
					// See docs: https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
					const errorMessage = `Invite with id '${id}' does not exist.`;
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
