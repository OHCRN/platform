import prisma, { Participant, Province } from '../prismaClient.js';

export const updateParticipant = async ({
	participantId,
	inviteId,
	dateOfBirth,
	participantEmailAddress,
	participantOhipFirstName,
	participantOhipLastName,
	participantOhipMiddleName,
	participantPhoneNumber,
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
	participantId: string;
	inviteId?: string;
	dateOfBirth?: Date;
	participantEmailAddress?: string;
	participantOhipFirstName?: string;
	participantOhipLastName?: string;
	participantOhipMiddleName?: string;
	participantPhoneNumber?: string;
	participantPreferredName?: string;
	guardianName?: string;
	guardianPhoneNumber?: string;
	guardianEmailAddress?: string;
	guardianRelationship?: string;
	mailingAddressStreet?: string;
	mailingAddressCity?: string;
	mailingAddressProvince?: Province;
	mailingAddressPostalCode?: string;
	residentialPostalCode?: string;
}): Promise<Participant> => {
	// TODO: add error handling
	const result = await prisma.participant.update({
		where: {
			id: participantId,
		},
		data: {
			inviteId,
			dateOfBirth,
			participantEmailAddress,
			participantOhipFirstName,
			participantOhipLastName,
			participantOhipMiddleName,
			participantPhoneNumber,
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
