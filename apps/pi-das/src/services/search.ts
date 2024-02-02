import { Result, failure, success, SystemError } from 'types/httpResponses';

import prisma, { Participant, ClinicianInvite } from '../prismaClient.js';
import { PrismaClientKnownRequestError } from '../generated/client/runtime/library.js';
import serviceLogger from '../logger.js';

const logger = serviceLogger.forModule('PrismaClient');

export const getParticipant = async (participantId: string): Promise<Participant> => {
	// TODO: add error handling
	const result = await prisma.participant.findUniqueOrThrow({
		where: {
			id: participantId,
		},
	});
	return result;
};

export const getParticipants = async (): Promise<Participant[]> => {
	// TODO: add error handling
	const result = await prisma.participant.findMany();
	return result;
};

type GetInviteFailureStatus = SystemError | 'INVITE_DOES_NOT_EXIST';

export const getClinicianInviteById = async (
	inviteId: string,
): Promise<Result<ClinicianInvite, GetInviteFailureStatus>> => {
	return prisma.clinicianInvite
		.findUniqueOrThrow({
			where: {
				id: inviteId,
			},
		})
		.then((data) => success(data))
		.catch((error) => {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2025') {
					const errorMessage = `Invite with id '${inviteId}' does not exist.`;
					logger.error(errorMessage, error.message);
					return failure('INVITE_DOES_NOT_EXIST', errorMessage);
				}
				logger.error(error.code, error.message);
				return failure(
					'SYSTEM_ERROR',
					`An unexpected error occurred in the PrismaClient - ${error.code}`,
				);
			}
			logger.error('Unexpected error handling get invite request.', error.message);
			return failure('SYSTEM_ERROR', 'An unexpected error occurred.');
		});
};

export const getClinicianInvites = async (): Promise<ClinicianInvite[]> => {
	// TODO: add error handling
	const result = await prisma.clinicianInvite.findMany();
	return result;
};
