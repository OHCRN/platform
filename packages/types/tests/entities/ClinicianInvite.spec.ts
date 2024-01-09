/*
 * Copyright (c) 2023 The Ontario Institute for Cancer Research. All rights reserved
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

import {
	ClinicianInviteResponse,
	ConsentClinicianInviteResponse,
	PIClinicianInviteResponse,
} from '../../src/entities/index.js';
import { ConsentGroup } from '../../src/entities/fields/index.js';

describe('ClinicianInviteResponse', () => {
	it('Parses correctly when consentGroup is GUARDIAN_CONSENT_OF_MINOR and all guardian contact fields are provided', () => {
		expect(
			ClinicianInviteResponse.safeParse({
				id: 'CVCFbeKH2Njl1G41vCQme',
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
				consentToBeContacted: true,
			}).success,
		).true;
	});
	it('Parses correctly when consentGroup is GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT and all guardian contact fields are provided', () => {
		expect(
			ClinicianInviteResponse.safeParse({
				id: 'CVCFbeKH2Njl1G41vCQme',
				inviteSentDate: new Date(),
				clinicianFirstName: 'Homer',
				clinicianLastName: 'Simpson',
				clinicianInstitutionalEmailAddress: 'homer.simpson@example.com',
				clinicianTitleOrRole: 'Doctor',
				participantFirstName: 'Bart',
				participantLastName: 'Simpson',
				participantEmailAddress: 'bart.simpson@example.com',
				participantPhoneNumber: '6471234567',
				consentGroup: ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT,
				guardianName: 'Marge Simpson',
				guardianPhoneNumber: '1234567890',
				guardianEmailAddress: 'marge.simpson@example.com',
				guardianRelationship: 'Wife',
				consentToBeContacted: true,
			}).success,
		).true;
	});
	it('Fails when consentGroup is GUARDIAN_CONSENT_OF_MINOR and some guardian contact fields are NOT provided', () => {
		expect(
			ClinicianInviteResponse.safeParse({
				id: 'CVCFbeKH2Njl1G41vCQme',
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
				consentToBeContacted: true,
			}).success,
		).false;
	});
	it('Fails when consentGroup is GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT and all guardian contact fields are NOT provided', () => {
		expect(
			ClinicianInviteResponse.safeParse({
				id: 'CVCFbeKH2Njl1G41vCQme',
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
				consentToBeContacted: true,
			}).success,
		).false;
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
			participantFirstName: 'John',
			participantLastName: 'Green',
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
			participantFirstName: 'John',
			participantLastName: 'Green',
			participantEmailAddress: 'john.green@example.com',
			participantPhoneNumber: '4155551234',
			participantPreferredName: 'John',
			guardianName: 'Jane Green',
			guardianPhoneNumber: '4155551212',
			guardianEmailAddress: 'jane.green@example.com',
			guardianRelationship: 'Mother',
		});
		expect(parsed.success).true;
		expect(parsed.success && parsed.data.participantFirstName).to.equal('John');
		expect(parsed.success && parsed.data.guardianName).to.equal('Jane Green');
		expect(parsed.success && parsed.data.guardianPhoneNumber).to.equal('4155551212');
		expect(parsed.success && parsed.data.guardianEmailAddress).to.equal('jane.green@example.com');
		expect(parsed.success && parsed.data.guardianRelationship).to.equal('Mother');
	});
});
