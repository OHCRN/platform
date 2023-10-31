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

import { ConsentGroup, ClinicianInvite } from '../../src/entities/index.js';

describe('ClinicianInvite', () => {
	it('Must define conditionally required fields on condition', () => {
		expect(
			ClinicianInvite.safeParse({
				clinicianFirstName: 'Homer',
				clinicianInstitutionalEmailAddress: 'homer.simpson@example.com',
				clinicianLastName: 'Simpson',
				clinicianTitleOrRole: 'Doctor',
				consentGroup: ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR,
				consentToBeContacted: true,
				guardianEmailAddress: 'marge.simpson@example.com',
				guardianName: 'Marge Simpson',
				guardianPhoneNumber: '1234567890',
				guardianRelationship: 'Wife',
				id: 'Y5xPZvn1bvew59ViRWIf2',
				inviteAccepted: false,
				inviteAcceptedDate: undefined,
				inviteSentDate: new Date(),
				participantEmailAddress: 'bart.simpson@example.com',
				participantFirstName: 'Bart',
				participantLastName: 'Simpson',
				participantPhoneNumber: '6471234567',
				participantPreferredName: undefined,
			}).success,
		).true;
		expect(
			ClinicianInvite.safeParse({
				clinicianFirstName: 'Homer',
				clinicianInstitutionalEmailAddress: 'homer.simpson@example.com',
				clinicianLastName: 'Simpson',
				clinicianTitleOrRole: 'Doctor',
				consentGroup: ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR,
				consentToBeContacted: true,
				guardianEmailAddress: undefined,
				guardianName: 'Marge Simpson',
				guardianPhoneNumber: undefined,
				guardianRelationship: 'Wife', // missing guardianEmailAddress and guardianPhoneNumber
				id: 'juspgnAQOm0Z1e7v75gh0',
				inviteSentDate: new Date(),
				participantEmailAddress: 'bart.simpson@example.com',
				participantFirstName: 'Bart',
				participantLastName: 'Simpson',
				participantPhoneNumber: '6471234567',
				participantPreferredName: undefined,
			}).success,
		).to.equal(false);
		expect(
			ClinicianInvite.safeParse({
				clinicianFirstName: 'Homer',
				clinicianInstitutionalEmailAddress: 'homer.simpson@example.com',
				clinicianLastName: 'Simpson',
				clinicianTitleOrRole: 'Doctor',
				consentGroup: ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT, // missing all guardian contact fields
				consentToBeContacted: true,
				guardianEmailAddress: undefined,
				guardianName: undefined,
				guardianPhoneNumber: undefined,
				guardianRelationship: undefined,
				id: 'uj9Lms7wSlfTZWcjET5Cz',
				inviteAccepted: false,
				inviteAcceptedDate: undefined,
				inviteSentDate: new Date(),
				participantEmailAddress: 'bart.simpson@example.com',
				participantFirstName: 'Bart',
				participantLastName: 'Simpson',
				participantPhoneNumber: '6471234567',
				participantPreferredName: undefined,
			}).success,
		).false;
	});
});
