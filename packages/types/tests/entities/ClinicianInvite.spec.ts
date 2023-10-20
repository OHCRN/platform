import { expect } from 'chai';

import { ConsentGroup, ClinicianInvite } from '../../src/entities/index.js';

describe('ClinicianInvite', () => {
	it('Must define conditionally required fields on condition', () => {
		expect(
			ClinicianInvite.safeParse({
				id: 'CVCFbeKH2Njl1G41vCQm',
				inviteSentDate: new Date(),
				clinicianFirstName: 'Homer',
				clinicianLastName: 'Simpson',
				clinicianInstitutionalEmailAddress: 'homer.simpson@example.com',
				clinicianTitleOrRole: 'Doctor',
				participantFirstName: 'Bart',
				participantLastName: 'Simpson',
				participantEmailAddress: 'bart.simpson@example.com',
				participantPhoneNumber: '6471234567',
				consentGroup: ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR,
				guardianName: 'Marge Simpson',
				guardianPhoneNumber: '1234567890',
				guardianEmailAddress: 'marge.simpson@example.com',
				guardianRelationship: 'Wife',
			}).success,
		).true;
		expect(
			ClinicianInvite.safeParse({
				id: 'CVCFbeKH2Njl1G41vCQm',
				inviteSentDate: new Date(),
				clinicianFirstName: 'Homer',
				clinicianLastName: 'Simpson',
				clinicianInstitutionalEmailAddress: 'homer.simpson@example.com',
				clinicianTitleOrRole: 'Doctor',
				participantFirstName: 'Bart',
				participantLastName: 'Simpson',
				participantEmailAddress: 'bart.simpson@example.com',
				participantPhoneNumber: '6471234567',
				consentGroup: ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR,
				guardianName: 'Marge Simpson',
				guardianRelationship: 'Wife', // missing guardianEmailAddress and guardianPhoneNumber
			}).success,
		).false;
		expect(
			ClinicianInvite.safeParse({
				id: 'CVCFbeKH2Njl1G41vCQm',
				inviteSentDate: new Date(),
				clinicianFirstName: 'Homer',
				clinicianLastName: 'Simpson',
				clinicianInstitutionalEmailAddress: 'homer.simpson@example.com',
				clinicianTitleOrRole: 'Doctor',
				participantFirstName: 'Bart',
				participantLastName: 'Simpson',
				participantEmailAddress: 'bart.simpson@example.com',
				participantPhoneNumber: '6471234567',
				consentGroup: ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT, // missing all guardian contact fields
			}).success,
		).false;
	});
});
