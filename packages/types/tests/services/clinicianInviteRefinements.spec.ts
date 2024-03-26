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

import { describe, it, expect } from 'vitest';
import { formatZodFieldErrorsForTesting } from '../utils/zodUtils.js';

import {
	InviteGuardianFields,
	ConsentGroup,
	ParticipantContactFields,
} from '../../src/entities/index.js';
import { ClinicianInviteRequest } from '../../src/services/consentUi';

describe('Clinician Invite Refinement', () => {
	describe('hasRequiredGuardianAndParticipantInfoForInvite', () => {
		const inviteTestData: Omit<
			ClinicianInviteRequest,
			keyof (InviteGuardianFields & ParticipantContactFields & { consentGroup: ConsentGroup })
		> = {
			clinicianFirstName: 'alex',
			clinicianInstitutionalEmailAddress: 'alex@gmail.com',
			clinicianLastName: 'pi',
			clinicianTitleOrRole: 'Doctor',
			consentToBeContacted: true,
			participantOhipFirstName: 'Ben',
			participantOhipLastName: 'Parker',
			participantPreferredName: 'Ben',
		};

		const inviteGuardianFields: InviteGuardianFields = {
			guardianName: 'John Doe',
			guardianPhoneNumber: '1234567890',
			guardianEmailAddress: 'andrew@gmail.com',
			guardianRelationship: 'Father',
		};

		const inviteParticipantFields: ParticipantContactFields = {
			participantEmailAddress: 'lol@gmail.com',
			participantPhoneNumber: '1123123123',
		};

		describe('Consent group requires guardian', () => {
			it('Parses correctly when all guardian fields are defined', () => {
				const consentGroup = ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR;
				const testObj = { ...inviteTestData, ...inviteGuardianFields, consentGroup };

				console.log(ClinicianInviteRequest.parse(testObj));

				expect(ClinicianInviteRequest.safeParse(testObj).success).toBe(true);
			});

			it('Fails when guardian name is not defined', () => {
				const testObj = {
					...inviteTestData,
					...inviteGuardianFields,
					consentGroup: ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR,
					guardianName: undefined,
				};

				const result = ClinicianInviteRequest.safeParse(testObj);
				expect(result.success).toBe(false);
				const fieldErrors = formatZodFieldErrorsForTesting(result);

				expect(fieldErrors[0].path).toBe('guardianName');
				expect(fieldErrors[0].message).toBe('guardianInfoMissing');
			});

			it('Fails when guardian phone number is not defined', () => {
				const testObj = {
					...inviteTestData,
					...inviteGuardianFields,
					consentGroup: ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR,
					guardianPhoneNumber: undefined,
				};

				const result = ClinicianInviteRequest.safeParse(testObj);
				expect(result.success).toBe(false);
				const fieldErrors = formatZodFieldErrorsForTesting(result);

				expect(fieldErrors[0].path).toBe('guardianPhoneNumber');
				expect(fieldErrors[0].message).toBe('guardianInfoMissing');
			});

			it('Fails when guardian email address is not defined', () => {
				const testObj = {
					...inviteTestData,
					...inviteGuardianFields,
					consentGroup: ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR,
					guardianEmailAddress: undefined,
				};

				const result = ClinicianInviteRequest.safeParse(testObj);
				expect(result.success).toBe(false);
				const fieldErrors = formatZodFieldErrorsForTesting(result);

				expect(fieldErrors[0].path).toBe('guardianEmailAddress');
				expect(fieldErrors[0].message).toBe('guardianInfoMissing');
			});

			it('Fails when guardian relationship is not defined', () => {
				const testObj = {
					...inviteTestData,
					...inviteGuardianFields,
					consentGroup: ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR,
					guardianRelationship: undefined,
				};

				const result = ClinicianInviteRequest.safeParse(testObj);
				expect(result.success).toBe(false);
				const fieldErrors = formatZodFieldErrorsForTesting(result);

				expect(fieldErrors[0].path).toBe('guardianRelationship');
				expect(fieldErrors[0].message).toBe('guardianInfoMissing');
			});

			it('Fails when participant email address is defined', () => {
				const testObj = {
					...inviteTestData,
					...inviteGuardianFields,
					consentGroup: ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR,
					participantEmailAddress: 'hello@gmail.com',
				};

				const result = ClinicianInviteRequest.safeParse(testObj);
				expect(result.success).toBe(false);
				const fieldErrors = formatZodFieldErrorsForTesting(result);

				expect(fieldErrors[0].path).toBe('participantEmailAddress');
				expect(fieldErrors[0].message).toBe('hasParticipantInfo');
			});

			it('Fails when participant phone number is defined', () => {
				const testObj = {
					...inviteTestData,
					...inviteGuardianFields,
					consentGroup: ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR,
					participantPhoneNumber: '1231231231',
				};

				const result = ClinicianInviteRequest.safeParse(testObj);
				expect(result.success).toBe(false);
				const fieldErrors = formatZodFieldErrorsForTesting(result);

				expect(fieldErrors[0].path).toBe('participantPhoneNumber');
				expect(fieldErrors[0].message).toBe('hasParticipantInfo');
			});
		});

		describe('Consent group does not require guardian', () => {
			it('Parses correctly when all participant fields are defined', () => {
				const testObj = {
					...inviteTestData,
					...inviteParticipantFields,
					consentGroup: ConsentGroup.enum.ADULT_CONSENT,
				};

				expect(ClinicianInviteRequest.safeParse(testObj).success).toBe(true);
			});

			it('Fails when guardian name is defined', () => {
				const testObj = {
					...inviteTestData,
					...inviteParticipantFields,
					consentGroup: ConsentGroup.enum.ADULT_CONSENT,
					guardianName: 'John Doe',
				};

				const result = ClinicianInviteRequest.safeParse(testObj);
				expect(result.success).toBe(false);
				const fieldErrors = formatZodFieldErrorsForTesting(result);

				expect(fieldErrors[0].path).toBe('guardianName');
				expect(fieldErrors[0].message).toBe('hasGuardianInfo');
			});

			it('Fails when guardian phone number is defined', () => {
				const testObj = {
					...inviteTestData,
					...inviteParticipantFields,
					consentGroup: ConsentGroup.enum.ADULT_CONSENT,
					guardianPhoneNumber: '1231231231',
				};

				const result = ClinicianInviteRequest.safeParse(testObj);
				expect(result.success).toBe(false);
				const fieldErrors = formatZodFieldErrorsForTesting(result);

				expect(fieldErrors[0].path).toBe('guardianPhoneNumber');
				expect(fieldErrors[0].message).toBe('hasGuardianInfo');
			});

			it('Fails when guardian email address is defined', () => {
				const testObj = {
					...inviteTestData,
					...inviteParticipantFields,
					consentGroup: ConsentGroup.enum.ADULT_CONSENT,
					guardianEmailAddress: 'hi@gmail.com',
				};

				const result = ClinicianInviteRequest.safeParse(testObj);
				expect(result.success).toBe(false);
				const fieldErrors = formatZodFieldErrorsForTesting(result);

				expect(fieldErrors[0].path).toBe('guardianEmailAddress');
				expect(fieldErrors[0].message).toBe('hasGuardianInfo');
			});

			it('Fails when guardian relationship is defined', () => {
				const testObj = {
					...inviteTestData,
					...inviteParticipantFields,
					consentGroup: ConsentGroup.enum.ADULT_CONSENT,
					guardianRelationship: 'Father',
				};

				const result = ClinicianInviteRequest.safeParse(testObj);
				expect(result.success).toBe(false);
				const fieldErrors = formatZodFieldErrorsForTesting(result);

				expect(fieldErrors[0].path).toBe('guardianRelationship');
				expect(fieldErrors[0].message).toBe('hasGuardianInfo');
			});

			it('Fails when participant email address is not defined', () => {
				const testObj = {
					...inviteTestData,
					...inviteParticipantFields,
					consentGroup: ConsentGroup.enum.ADULT_CONSENT,
					participantEmailAddress: undefined,
				};

				const result = ClinicianInviteRequest.safeParse(testObj);
				expect(result.success).toBe(false);
				const fieldErrors = formatZodFieldErrorsForTesting(result);

				expect(fieldErrors[0].path).toBe('participantEmailAddress');
				expect(fieldErrors[0].message).toBe('participantInfoMissing');
			});

			it('Fails when participant phone number is not defined', () => {
				const testObj = {
					...inviteTestData,
					...inviteParticipantFields,
					consentGroup: ConsentGroup.enum.ADULT_CONSENT,
					participantPhoneNumber: undefined,
				};

				const result = ClinicianInviteRequest.safeParse(testObj);
				expect(result.success).toBe(false);
				const fieldErrors = formatZodFieldErrorsForTesting(result);

				expect(fieldErrors[0].path).toBe('participantPhoneNumber');
				expect(fieldErrors[0].message).toBe('participantInfoMissing');
			});
		});
	});
});
