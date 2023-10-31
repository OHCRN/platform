import prisma, { Participant, Province, ClinicianInvite } from '../prismaClient.js';

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

export const createClinicianInvite = async ({
	participantFirstName,
	participantLastName,
	participantEmailAddress,
	participantPhoneNumber,
	participantPreferredName,
	guardianName,
	guardianPhoneNumber,
	guardianEmailAddress,
	guardianRelationship,
	clinicianInviteId,
}: {
	participantFirstName: string;
	participantLastName: string;
	participantEmailAddress: string;
	participantPhoneNumber: string;
	participantPreferredName?: string;
	guardianName?: string;
	guardianPhoneNumber?: string;
	guardianEmailAddress?: string;
	guardianRelationship?: string;
	clinicianInviteId?: string;
}): Promise<ClinicianInvite> => {
	const result = await prisma.clinicianInvite.create({
		data: {
			participantFirstName,
			participantLastName,
			participantEmailAddress,
			participantPhoneNumber,
			participantPreferredName,
			guardianName,
			guardianPhoneNumber,
			guardianEmailAddress,
			guardianRelationship,
			id: clinicianInviteId,
		},
	});
	return result;
};
