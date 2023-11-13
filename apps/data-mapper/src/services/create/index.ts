import { dataMapperClinicianInvite, ClinicianInviteRequest, ClinicianInvite } from 'types/entities';

import logger from '../../logger.js';

import { createInvitePiData, createParticipantPiData } from './piDas.js';
import { createInviteConsentData, createParticipantConsentData } from './consentDas.js';
import { saveParticipantOhipNumber } from './phiDas.js';
import { createParticipantOhipKey } from './keysDas.js';

export const createParticipant = async ({
	name,
	email,
	ohipNumber,
	emailVerified,
}: {
	name: string;
	email: string;
	ohipNumber: string;
	emailVerified: boolean;
}): Promise<any> => {
	// TODO: add Type instead of any
	const participantPiData = await createParticipantPiData({ name, email });
	const participantId = participantPiData.id;
	const participantOhipKey = await createParticipantOhipKey(participantId);
	const ohipPrivateKey = participantOhipKey.ohipPrivateKey;
	const participantOhipNumber = await saveParticipantOhipNumber({
		ohipPrivateKey,
		ohipNumber,
	});
	const participantConsentData = await createParticipantConsentData({
		participantId,
		emailVerified,
	});

	return {
		...participantPiData,
		ohipNumber: participantOhipNumber,
		emailVerified: participantConsentData.emailVerified,
	};
};

export const createInvite = async ({
	participantFirstName,
	participantLastName,
	participantEmailAddress,
	participantPhoneNumber,
	participantPreferredName,
	guardianName,
	guardianPhoneNumber,
	guardianEmailAddress,
	guardianRelationship,
	inviteAcceptedDate,
	inviteAccepted,
	clinicianFirstName,
	clinicianLastName,
	clinicianInstitutionalEmailAddress,
	clinicianTitleOrRole,
	consentGroup,
	consentToBeContacted,
}: ClinicianInviteRequest): Promise<ClinicianInvite> => {
	try {
		const invitePiData = await createInvitePiData({
			participantFirstName,
			participantLastName,
			participantEmailAddress,
			participantPhoneNumber,
			participantPreferredName,
			guardianName,
			guardianPhoneNumber,
			guardianEmailAddress,
			guardianRelationship,
		});
		const inviteConsentData = await createInviteConsentData({
			id: invitePiData.id,
			inviteAcceptedDate,
			inviteAccepted,
			clinicianFirstName,
			clinicianLastName,
			clinicianInstitutionalEmailAddress,
			clinicianTitleOrRole,
			consentGroup,
			consentToBeContacted,
		});

		return dataMapperClinicianInvite.parse({
			...invitePiData,
			...inviteConsentData,
		});
	} catch (error) {
		logger.error(error);
		// TODO: rollback/delete invites already created
		throw error; // TODO: remove and send custom error schema
	}
};
