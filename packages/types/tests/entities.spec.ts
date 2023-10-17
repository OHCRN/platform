import { expect } from 'chai';

import { OhipNumber } from '../src/entities/OhipNumber.js';
import { PhoneNumber } from '../src/entities/PhoneNumber.js';
import { PostalCode } from '../src/entities/PostalCode.js';
import { Name } from '../src/entities/Name.js';
import { ParticipantIdentification } from '../src/entities/ParticipantIdentification.js';
import { ConsentGroup } from '../src/entities/ConsentGroup.js';

describe('OhipNumber', () => {
	it('Must be 10 digits long', () => {
		expect(OhipNumber.safeParse('1234567890').success).true;
		expect(OhipNumber.safeParse('1').success).false;
		expect(OhipNumber.safeParse('12345678901').success).false;
	});
	it('Can only contain numbers', () => {
		expect(OhipNumber.safeParse('123-456-78').success).false;
		expect(OhipNumber.safeParse('123 456 78').success).false;
		expect(OhipNumber.safeParse('#123456789').success).false;
		expect(OhipNumber.safeParse('123456789.').success).false;
	});
});

describe('PhoneNumber', () => {
	it('Must be 10 digits long', () => {
		expect(PhoneNumber.safeParse('1234567890').success).true;
		expect(PhoneNumber.safeParse('1').success).false;
		expect(PhoneNumber.safeParse('12345678901').success).false;
	});
	it('Can only contain numbers', () => {
		expect(PhoneNumber.safeParse('123-456-78').success).false;
		expect(PhoneNumber.safeParse('+123456789').success).false;
		expect(PhoneNumber.safeParse('123 456 78').success).false;
		expect(PhoneNumber.safeParse('+1 (234) 5').success).false;
		expect(PhoneNumber.safeParse('123456789.').success).false;
	});
});

describe('PostalCode', () => {
	it('Must be 6 characters long', () => {
		expect(PostalCode.safeParse('T4B0V7').success).true;
		expect(PostalCode.safeParse('T4B0V7A').success).false;
		expect(PostalCode.safeParse('T4B0V').success).false;
	});
	it('Can only contain letters and numbers', () => {
		expect(PostalCode.safeParse('T4B 0V').success).false;
		expect(PostalCode.safeParse('T4B-0V').success).false;
	});
	it('Can contain lowercase letters', () => {
		// these are parsed into uppercase, so should not cause an error
		expect(PostalCode.safeParse('t4b0v7').success).true;
		expect(PostalCode.safeParse('T4B0v7').success).true;
	});
	it('Must contain characters in the correct order', () => {
		expect(PostalCode.safeParse('T4B07V').success).false;
		expect(PostalCode.safeParse('4B7O7V').success).false;
		expect(PostalCode.safeParse('ABC123').success).false;
	});
});

describe('Name', () => {
	it('Can only contain letters and whitespace', () => {
		expect(Name.safeParse('Homer Simpson').success).true;
		expect(Name.safeParse('homer simpson').success).true;
		expect(Name.safeParse('Homer Simpon!').success).false;
		expect(Name.safeParse("D'oh").success).false;
		expect(Name.safeParse('Homer_Simpson').success).false;
		expect(Name.safeParse('-Homer Simpson').success).false;
	});
});

describe('ParticipantIdentification', () => {
	it('Must define conditionally required fields on condition', () => {
		expect(
			ParticipantIdentification.safeParse({
				id: 'CVCFbeKH2Njl1G41-vCQm',
				ohipNumber: '1234567890',
				participantPreferredName: 'Homer',
				participantOhipFirstName: 'Homer',
				participantOhipLastName: 'Simson',
				dateOfBirth: new Date(),
				phoneNumber: '6471234567',
				residentialPostalCode: 'T4B0V7',
				emailAddress: 'homer.simpson@example.com',
				consentGroup: ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR,
				guardianName: 'Marge Simpson',
				guardianPhoneNumber: '1234567890',
				guardianEmailAddress: 'marge.simpson@example.com',
				guardianRelationship: 'Wife',
			}).success,
		).true;
		expect(
			ParticipantIdentification.safeParse({
				id: 'CVCFbeKH2Njl1G41-vCQm',
				ohipNumber: '1234567890',
				participantPreferredName: 'Homer',
				participantOhipFirstName: 'Homer',
				participantOhipLastName: 'Simson',
				dateOfBirth: new Date(),
				phoneNumber: '6471234567',
				residentialPostalCode: 'T4B0V7',
				emailAddress: 'homer.simpson@example.com',
				consentGroup: ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR, // missing all guardian contact fields
			}).success,
		).false;
		expect(
			ParticipantIdentification.safeParse({
				id: 'CVCFbeKH2Njl1G41-vCQm',
				ohipNumber: '1234567890',
				participantPreferredName: 'Homer',
				participantOhipFirstName: 'Homer',
				participantOhipLastName: 'Simson',
				dateOfBirth: new Date(),
				phoneNumber: '6471234567',
				residentialPostalCode: 'T4B0V7',
				emailAddress: 'homer.simpson@example.com',
				consentGroup: ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR,
				guardianName: 'Marge Simpson',
				guardianPhoneNumber: '1234567890',
				guardianRelationship: 'Wife', // missing guardianEmailAddress
			}).success,
		).false;
		expect(
			ParticipantIdentification.safeParse({
				id: 'CVCFbeKH2Njl1G41-vCQm',
				ohipNumber: '1234567890',
				participantPreferredName: 'Homer',
				participantOhipFirstName: 'Homer',
				participantOhipLastName: 'Simson',
				dateOfBirth: new Date(),
				phoneNumber: '6471234567',
				residentialPostalCode: 'T4B0V7',
				emailAddress: 'homer.simpson@example.com',
				consentGroup: ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT,
				guardianName: 'Marge Simpson',
				guardianRelationship: 'Wife', // missing guardianPhoneNumber and guardianEmailAddress
			}).success,
		).false;
	});
});
