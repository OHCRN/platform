import { describe, expect, it } from 'vitest';

import { ConsentGroup, ClinicianInvite } from '../../src/entities/index.js';

// function sum(a: number, b: number) {
// 	return a + b;
// }

// expect(sum(1, 2)).toEqual(3);
// expect(sum(3, 2)).toEqual(5);
// expect(sum(1, 2)).toEqual(5);

describe('ClinicianInvite', () => {
	it('Must define conditionally required fields on condition', () => {
		// first expect is evaluating to false
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
		).to.equal(true);
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
		).to.equal(false);
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
		).to.equal(false);
	});
});
