import { Result, failure, success } from 'types/httpResponses';
import { PIClinicianInviteRequest } from 'types/piDas';

import { PrismaClientKnownRequestError } from '../generated/client/runtime/library.js';
import serviceLogger from '../logger.js';
import prisma, { ClinicianInvite, Participant, Province } from '../prismaClient.js';

const logger = serviceLogger.forModule('PrismaClient');

export const createParticipant = async ({
	inviteId,
	dateOfBirth,
	emailAddress,
	participantOhipFirstName,
	participantOhipLastName,
	participantOhipMiddleName,
	phoneNumber,
	participantPreferredName,
	guardianName,
	guardianPhoneNumber,
	guardianEmailAddress,
	guardianRelationship,
	mailingAddressStreet,
	mailingAddressCity,
	mailingAddressProvince,
	mailingAddressPostalCode,
	residentialPostalCode,
	participantId,
}: {
	inviteId?: string;
	dateOfBirth: Date;
	emailAddress: string;
	participantOhipFirstName: string;
	participantOhipLastName: string;
	participantOhipMiddleName?: string;
	phoneNumber: string;
	participantPreferredName?: string;
	guardianName?: string;
	guardianPhoneNumber?: string;
	guardianEmailAddress?: string;
	guardianRelationship?: string;
	mailingAddressStreet?: string;
	mailingAddressCity?: string;
	mailingAddressProvince?: Province;
	mailingAddressPostalCode?: string;
	residentialPostalCode: string;
	participantId?: string;
}): Promise<Participant> => {
	// TODO: add error handling
	const result = await prisma.participant.create({
		data: {
			inviteId,
			dateOfBirth,
			emailAddress,
			participantOhipFirstName,
			participantOhipLastName,
			participantOhipMiddleName,
			phoneNumber,
			participantPreferredName,
			guardianName,
			guardianPhoneNumber,
			guardianEmailAddress,
			guardianRelationship,
			mailingAddressStreet,
			mailingAddressCity,
			mailingAddressProvince,
			mailingAddressPostalCode,
			residentialPostalCode,
			id: participantId,
		},
	});
	return result;
};

type CreateInviteFailureStatus = 'SYSTEM_ERROR' | 'INVITE_EXISTS';
/**
 * Creates a ClinicianInvite entry in the PI DB
 * @param inviteRequest Clinician Invite data
 * @returns ClinicianInvite object from PI DB
 */
export const createClinicianInvite = async (
	inviteRequest: PIClinicianInviteRequest,
): Promise<Result<ClinicianInvite, CreateInviteFailureStatus>> => {
	return prisma.clinicianInvite
		.create({
			data: inviteRequest,
		})
		.then((invite) => success(invite))
		.catch((error) => {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
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
