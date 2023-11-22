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
	ConsentGroup,
	ConsentToBeContacted,
	ClinicianInviteForm,
} from '../../src/entities/index.js';

describe('ClinicianInviteForm', () => {
	it('Must define conditionally required fields on condition', () => {
		expect(
			ClinicianInviteForm.safeParse({
				clinicianFirstName: 'Homer',
				clinicianInstitutionalEmailAddress: 'homer.simpson@example.com',
				clinicianLastName: 'Simpson',
				clinicianTitleOrRole: 'Doctor',
				consentGroup: ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR,
				consentToBeContacted: ConsentToBeContacted.enum.CONSENTED,
				guardianEmailAddress: 'marge@email.com',
				guardianName: 'Marge Simpson',
				guardianPhoneNumber: '1234567890',
				guardianRelationship: 'Mother',
				id: 'CVCFbeKH2Njl1G41vCQme',
				inviteSentDate: new Date(),
				participantEmailAddress: 'bart.simpson@example.com',
				participantFirstName: 'Bart',
				participantLastName: 'Simpson',
				participantPhoneNumber: '6471234567',
				participantPreferredName: '',
			}).success,
		).true;
		expect(
			ClinicianInviteForm.safeParse({
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
				guardianName: '',
				guardianRelationship: 'Wife', // missing some guardian fields
				guardianEmailAddress: undefined,
				guardianPhoneNumber: '',
				consentToBeContacted: ConsentToBeContacted.enum.CONSENTED,
			}).success,
		).false;
		expect(
			ClinicianInviteForm.safeParse({
				clinicianFirstName: 'Homer',
				clinicianInstitutionalEmailAddress: 'homer.simpson@example.com',
				clinicianLastName: 'Simpson',
				clinicianTitleOrRole: 'Doctor',
				consentGroup: ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT, // missing all guardian contact fields
				consentToBeContacted: ConsentToBeContacted.enum.CONSENTED,
				guardianEmailAddress: '',
				guardianName: undefined,
				guardianPhoneNumber: '',
				guardianRelationship: '',
				id: 'CVCFbeKH2Njl1G41vCQme',
				inviteSentDate: new Date(),
				participantEmailAddress: 'bart.simpson@example.com',
				participantFirstName: 'Bart',
				participantLastName: 'Simpson',
				participantPhoneNumber: '6471234567',
			}).success,
		).false;
	});
});
