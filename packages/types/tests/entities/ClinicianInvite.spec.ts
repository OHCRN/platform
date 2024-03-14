/*
 * Copyright (c) 2024 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { describe, expect, it } from 'vitest';

import { ConsentGroup } from '../../src/entities/fields/index.js';
import { ConsentClinicianInviteResponse } from '../../src/services/consentDas/index.js';
import { PIClinicianInviteResponse } from '../../src/services/piDas/index.js';
import { ClinicianInviteRequest } from '../../src/services/consentApi/requests/ClinicianInvite.js';

const MockInviteRequestData = {
	id: 'CVCFbeKH2Njl1G41vCQme',
	inviteSentDate: new Date(),
	clinicianFirstName: 'Homer',
	clinicianLastName: 'Simpson',
	clinicianInstitutionalEmailAddress: 'homer.simpson@example.com',
	clinicianTitleOrRole: 'Doctor',
	participantOhipFirstName: 'Bart',
	participantOhipLastName: 'Simpson',
	consentToBeContacted: true,
};

const MockGuardianInviteRequestData = {
	...MockInviteRequestData,
	guardianName: 'Marge Simpson',
	guardianPhoneNumber: '1234567890',
	guardianEmailAddress: 'marge.simpson@example.com',
	guardianRelationship: 'Wife',
};

const MockParticipantInviteRequestData = {
	...MockInviteRequestData,
	participantEmailAddress: 'homer@example.com',
	participantPhoneNumber: '3824787481',
};

describe('ClinicianInviteRequest', () => {
	describe('Invite a guardian', () => {
		it('Parses correctly when consentGroup is GUARDIAN_CONSENT_OF_MINOR, all guardian contact fields are provided, and participant contact fields are undefined', () => {
			const result = ClinicianInviteRequest.safeParse({
				...MockGuardianInviteRequestData,
				consentGroup: ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR,
			});
			expect(result.success).true;
		});
		it('Parses correctly when consentGroup is GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT, all guardian contact fields are provided, and participant contact fields are undefined', () => {
			const result = ClinicianInviteRequest.safeParse({
				...MockGuardianInviteRequestData,
				consentGroup: ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT,
			});
			expect(result.success).true;
		});
		it('Fails when consentGroup is GUARDIAN_CONSENT_OF_MINOR and some guardian contact fields are NOT provided', () => {
			const result = ClinicianInviteRequest.safeParse({
				...MockInviteRequestData,
				consentGroup: ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR,
				guardianName: 'Marge Simpson',
				guardianRelationship: 'Wife', // missing guardianEmailAddress and guardianPhoneNumber
			});
			expect(result.success).false;
		});
		it('Fails when consentGroup is GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT and all guardian contact fields are NOT provided', () => {
			const result = ClinicianInviteRequest.safeParse({
				...MockInviteRequestData,
				consentGroup: ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT, // missing all guardian contact fields
			});
			expect(result.success).false;
		});
		it('Fails when consentGroup is GUARDIAN_CONSENT_OF_MINOR and one participant contact field is provided', () => {
			const result = ClinicianInviteRequest.safeParse({
				...MockGuardianInviteRequestData,
				participantEmailAddress: 'homer@example.com',
			});
			expect(result.success).false;
		});
		it('Fails when consentGroup is GUARDIAN_CONSENT_OF_MINOR and all participant contact fields are provided', () => {
			const result = ClinicianInviteRequest.safeParse({
				...MockGuardianInviteRequestData,
				...MockParticipantInviteRequestData,
			});
			expect(result.success).false;
		});
	});

	describe('Invite a participant', () => {
		it('Parses correctly when consentGroup is ADULT_CONSENT, all participant contact fields are provided, and guardian contact fields are undefined', () => {
			const result = ClinicianInviteRequest.safeParse({
				...MockParticipantInviteRequestData,
				consentGroup: ConsentGroup.enum.ADULT_CONSENT,
			});
			expect(result.success).true;
		});
		it('Parses correctly when consentGroup is YOUNG_ADULT_CONSENT, all participant contact fields are provided, and guardian contact fields are undefined', () => {
			const result = ClinicianInviteRequest.safeParse({
				...MockParticipantInviteRequestData,
				consentGroup: ConsentGroup.enum.YOUNG_ADULT_CONSENT,
			});
			expect(result.success).true;
		});
		it('Fails when consentGroup is ADULT_CONSENT and some participant contact fields are NOT provided', () => {
			const result = ClinicianInviteRequest.safeParse({
				...MockInviteRequestData,
				consentGroup: ConsentGroup.enum.ADULT_CONSENT,
				participantEmailAddress: 'homer@example.com',
			});
			expect(result.success).false;
		});
		it('Fails when consentGroup is YOUNG_ADULT_CONSENT and all participant contact fields are NOT provided', () => {
			const result = ClinicianInviteRequest.safeParse({
				...MockInviteRequestData,
				consentGroup: ConsentGroup.enum.YOUNG_ADULT_CONSENT,
			});
			expect(result.success).false;
		});
		it('Fails when consentGroup is ADULT_CONSENT and one guardian field is provided', () => {
			const result = ClinicianInviteRequest.safeParse({
				...MockParticipantInviteRequestData,
				consentGroup: ConsentGroup.enum.ADULT_CONSENT,
				guardianPhoneNumber: '1234567890',
			});
			expect(result.success).false;
		});
		it('Fails when consentGroup is YOUNG_ADULT_CONSENT and all guardian fields are provided', () => {
			const result = ClinicianInviteRequest.safeParse({
				...MockParticipantInviteRequestData,
				consentGroup: ConsentGroup.enum.ADULT_CONSENT,
				guardianName: 'Marge Simpson',
				guardianPhoneNumber: '1234567890',
				guardianEmailAddress: 'marge.simpson@example.com',
				guardianRelationship: 'Wife',
			});
			expect(result.success).false;
		});
	});
});

describe('ConsentClinicianInviteResponse', () => {
	it('Correctly converts inviteAcceptedDate from null to undefined', () => {
		const parsed = ConsentClinicianInviteResponse.safeParse({
			id: 'CVCFbeKH2Njl1G41vCQme',
			inviteSentDate: new Date(),
			inviteAcceptedDate: null,
			inviteAccepted: false,
			clinicianFirstName: 'Jonah',
			clinicianLastName: 'Jameson',
			clinicianInstitutionalEmailAddress: 'jonah.jameson@example.com',
			clinicianTitleOrRole: 'Physician',
			consentGroup: ConsentGroup.enum.ADULT_CONSENT,
			consentToBeContacted: true,
		});
		expect(parsed.success).true;
		expect(parsed.success && parsed.data.inviteAcceptedDate).to.equal(undefined);
	});
	it('Accepts inviteAcceptedDate if not null', () => {
		const parsed = ConsentClinicianInviteResponse.safeParse({
			id: 'CVCFbeKH2Njl1G41vCQme',
			inviteSentDate: new Date(),
			inviteAcceptedDate: new Date('10-31-2023'),
			inviteAccepted: false,
			clinicianFirstName: 'Jonah',
			clinicianLastName: 'Jameson',
			clinicianInstitutionalEmailAddress: 'jonah.jameson@example.com',
			clinicianTitleOrRole: 'Physician',
			consentGroup: ConsentGroup.enum.ADULT_CONSENT,
			consentToBeContacted: true,
		});
		expect(parsed.success).true;
		expect(parsed.success && parsed.data.inviteAcceptedDate?.getTime()).to.equal(
			new Date('10-31-2023').getTime(),
		);
	});
});

describe('PIClinicianInviteResponse', () => {
	it('Correctly converts optional values from null to undefined', () => {
		const parsed = PIClinicianInviteResponse.safeParse({
			id: 'CVCFbeKH2Njl1G41vCQme',
			participantOhipFirstName: 'John',
			participantOhipLastName: 'Green',
			participantEmailAddress: 'john.green@example.com',
			participantPhoneNumber: '4155551234',
			participantPreferredName: null,
			guardianName: null,
			guardianPhoneNumber: null,
			guardianEmailAddress: null,
			guardianRelationship: null,
		});
		expect(parsed.success).true;
		expect(parsed.success && parsed.data.participantPreferredName).to.equal(undefined);
		expect(parsed.success && parsed.data.guardianName).to.equal(undefined);
		expect(parsed.success && parsed.data.guardianPhoneNumber).to.equal(undefined);
		expect(parsed.success && parsed.data.guardianEmailAddress).to.equal(undefined);
		expect(parsed.success && parsed.data.guardianRelationship).to.equal(undefined);
	});
	it('Accepts optional values if not null', () => {
		const parsed = PIClinicianInviteResponse.safeParse({
			id: 'CVCFbeKH2Njl1G41vCQme',
			participantOhipFirstName: 'John',
			participantOhipLastName: 'Green',
			participantEmailAddress: 'john.green@example.com',
			participantPhoneNumber: '4155551234',
			participantPreferredName: 'John',
			guardianName: 'Jane Green',
			guardianPhoneNumber: '4155551212',
			guardianEmailAddress: 'jane.green@example.com',
			guardianRelationship: 'Mother',
		});
		expect(parsed.success).true;
		expect(parsed.success && parsed.data.participantOhipFirstName).to.equal('John');
		expect(parsed.success && parsed.data.guardianName).to.equal('Jane Green');
		expect(parsed.success && parsed.data.guardianPhoneNumber).to.equal('4155551212');
		expect(parsed.success && parsed.data.guardianEmailAddress).to.equal('jane.green@example.com');
		expect(parsed.success && parsed.data.guardianRelationship).to.equal('Mother');
	});
});
