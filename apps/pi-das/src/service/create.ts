import prisma, { Participant } from '../prismaClient.js';

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
}: {
	inviteId?: string;
	dateOfBirth: Date;
	emailAddress: string;
	participantOhipFirstName: string;
	participantOhipLastName: string;
	participantOhipMiddleName?: string;
	phoneNumber: string;
	participantPreferredName: string;
	guardianName?: string;
	guardianPhoneNumber?: string;
	guardianEmailAddress?: string;
	guardianRelationship?: string;
	mailingAddressStreet?: string;
	mailingAddressCity?: string;
	mailingAddressProvince?: string;
	mailingAddressPostalCode?: string;
	residentialPostalCode: string;
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
		},
	});
	return result;
};
