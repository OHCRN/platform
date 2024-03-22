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
import z from 'zod';

import {
	RegisterFormStep1NoDateOfBirth,
	RegisterFormStep2,
} from '../../src/services/consentUi/requests/Register.js';
import { createDateOfBirthRequestSchema } from '../../src/common/utils/dateOfBirth.js';
import { setupDateOfBirthTest } from '../utils/dateOfBirth.spec.js';

// not sure about placement or types for this
/**
 * Format Zod errors for form fields into a more easy to read format for testing.
 * @param result The object resulting from Zod SafeParse
 * @returns An array of objects: { path, message }
 */
const formatZodErrors = (
	result: z.SafeParseReturnType<any, any>,
): { path: string; message: string }[] => {
	const resultJsonParsed = JSON.parse((result as { error: Error }).error.message);
	return resultJsonParsed.map((item) => ({
		path: item.path[0],
		message: item.message,
	}));
};

describe('ParticipantRegistrationRequest', () => {
	const {
		exactlyMinimumAgeDateOfBirth,
		lessThanMinimumAgeDateOfBirth,
		mockDate,
		olderThanMinimumAgeDateOfBirth,
	} = setupDateOfBirthTest();

	// re-create ParticipantRegistrationRequest with a fixed date for judging mock users' ages
	const DateOfBirthField = createDateOfBirthRequestSchema(mockDate);
	const RegisterFormStep1 = RegisterFormStep1NoDateOfBirth.and(DateOfBirthField);
	const ParticipantRegistrationRequest = RegisterFormStep1.and(RegisterFormStep2);
	type ParticipantRegistrationRequest = z.infer<typeof ParticipantRegistrationRequest>;

	const adultConsentTestData = {
		confirmPassword: 'password',
		consentToBeContacted: true,
		dateOfBirth: olderThanMinimumAgeDateOfBirth,
		guardianName: undefined,
		guardianPhoneNumber: undefined,
		guardianRelationship: undefined,
		isGuardian: false,
		participantEmailAddress: 'bart@example.com',
		participantFirstName: 'Bartholomew',
		participantLastName: 'Simpson',
		participantPhoneNumber: '2345678901',
		participantPreferredName: 'Bart',
		password: 'password',
	};

	const guardianConsentTestData = {
		...adultConsentTestData,
		guardianEmailAddress: 'homer@example.com',
		guardianName: 'Homer Simpson',
		guardianPhoneNumber: '5492750173',
		guardianRelationship: 'Father',
		isGuardian: true,
		participantEmailAddress: undefined,
		participantPhoneNumber: undefined,
	};

	describe('Participant Phone Number Field', () => {
		describe('User is a guardian', () => {
			it('Returns true when participantPhoneNumber is undefined', () => {
				expect(ParticipantRegistrationRequest.safeParse(guardianConsentTestData).success).true;
			});

			it('Adds custom error if participantPhoneNumber is provided', () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...guardianConsentTestData,
					participantPhoneNumber: '1234567890',
				});
				expect(result.success).false;
				const fieldErrors = formatZodErrors(result);
				expect(fieldErrors[0].path).toBe('participantPhoneNumber');
				expect(fieldErrors[0].message).toBe('guardianHasParticipantPhoneNumber');
			});

			it('Adds custom error if participantPhoneNumber is an empty string', () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...guardianConsentTestData,
					participantPhoneNumber: '',
				});
				expect(result.success).false;
				const fieldErrors = formatZodErrors(result);
				expect(fieldErrors[0].path).toBe('participantPhoneNumber');
				expect(fieldErrors[0].message).toBe('guardianHasParticipantPhoneNumber');
			});
		});

		describe('User is a participant', () => {
			it('Returns true when participantPhoneNumber is provided', () => {
				expect(ParticipantRegistrationRequest.safeParse(adultConsentTestData).success).true;
			});

			it('Adds custom error if participantPhoneNumber is undefined', () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...adultConsentTestData,
					participantPhoneNumber: undefined,
				});
				expect(result.success).false;
				const fieldErrors = formatZodErrors(result);
				expect(fieldErrors[0].path).toBe('participantPhoneNumber');
				expect(fieldErrors[0].message).toBe('participantMissingPhoneNumber');
			});

			it('Adds custom error if participantPhoneNumber is an empty string', () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...adultConsentTestData,
					participantPhoneNumber: '',
				});
				expect(result.success).false;
				const fieldErrors = formatZodErrors(result);
				expect(fieldErrors[0].path).toBe('participantPhoneNumber');
				expect(fieldErrors[0].message).toBe('participantMissingPhoneNumber');
			});
		});
	});

	describe('Date of Birth Field', () => {
		it("Returns true when the user's age is equal to or greater than the minimum", () => {
			expect(
				ParticipantRegistrationRequest.safeParse({
					...adultConsentTestData,
					dateOfBirth: exactlyMinimumAgeDateOfBirth,
				}).success,
			).true;
			expect(
				ParticipantRegistrationRequest.safeParse({
					...adultConsentTestData,
					dateOfBirth: olderThanMinimumAgeDateOfBirth,
				}).success,
			).true;
		});

		it("Adds custom error to dateOfBirth when user's age is below the minimum", () => {
			const result = ParticipantRegistrationRequest.safeParse({
				...adultConsentTestData,
				dateOfBirth: lessThanMinimumAgeDateOfBirth,
			});
			expect(result.success).false;
			const fieldErrors = formatZodErrors(result);
			expect(fieldErrors[0].path).toBe('dateOfBirth');
			expect(fieldErrors[0].message).toBe('participantLessThanMinimumAge');
		});
	});

	describe('Conditional Guardian Fields', () => {
		describe('User is a guardian', () => {
			it('Returns true when all guardian fields are valid', () => {
				expect(ParticipantRegistrationRequest.safeParse(guardianConsentTestData).success).true;
			});

			it('Adds custom errors if all guardian fields are undefined', () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...guardianConsentTestData,
					guardianName: undefined,
					guardianPhoneNumber: undefined,
					guardianRelationship: undefined,
				});
				expect(result.success).false;
				const errors = formatZodErrors(result);
				expect(errors[0].path).toBe('guardianName');
				expect(errors[0].message).toBe('guardianInfoMissing');
				expect(errors[1].path).toBe('guardianPhoneNumber');
				expect(errors[1].message).toBe('guardianInfoMissing');
				expect(errors[2].path).toBe('guardianRelationship');
				expect(errors[2].message).toBe('guardianInfoMissing');
			});

			it('Adds custom error if one guardian field is undefined', () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...guardianConsentTestData,
					guardianRelationship: undefined,
				});
				expect(result.success).false;
				const fieldErrors = formatZodErrors(result);
				expect(fieldErrors[0].path).toBe('guardianRelationship');
				expect(fieldErrors[0].message).toBe('guardianInfoMissing');
			});

			it('Adds custom errors if guardian fields contain invalid values', () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...guardianConsentTestData,
					guardianName: 'Homer Simpson {}',
					guardianPhoneNumber: '1234 + abc',
					guardianRelationship: 'F4th3r///',
				});
				expect(result.success).false;
				const errors = formatZodErrors(result);
				expect(errors[0].path).toBe('guardianName');
				expect(errors[0].message).toBe('Invalid');
				expect(errors[1].path).toBe('guardianPhoneNumber');
				expect(errors[1].message).toBe('Invalid');
				expect(errors[2].path).toBe('guardianRelationship');
				expect(errors[2].message).toBe('Invalid');
			});

			it('Adds custom errors if guardian fields contain empty strings', () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...guardianConsentTestData,
					guardianName: '',
					guardianPhoneNumber: '',
					guardianRelationship: '',
				});
				expect(result.success).false;
				const errors = formatZodErrors(result);
				expect(errors[0].path).toBe('guardianName');
				expect(errors[0].message).toBe('guardianInfoMissing');
				expect(errors[1].path).toBe('guardianPhoneNumber');
				expect(errors[1].message).toBe('guardianInfoMissing');
				expect(errors[2].path).toBe('guardianRelationship');
				expect(errors[2].message).toBe('guardianInfoMissing');
			});

			it('Adds invalid and custom errors if guardian fields contain a mix of undefined and invalid values', () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...guardianConsentTestData,
					guardianName: 'Homer ]]]]]',
					guardianPhoneNumber: undefined,
					guardianRelationship: ' ',
				});
				expect(result.success).false;
				const errors = formatZodErrors(result);
				expect(errors[0].path).toBe('guardianName');
				expect(errors[0].message).toBe('Invalid');
				expect(errors[1].path).toBe('guardianPhoneNumber');
				expect(errors[1].message).toBe('guardianInfoMissing');
				expect(errors[2].path).toBe('guardianRelationship');
				expect(errors[2].message).toBe('guardianInfoMissing');
			});
		});

		describe('User is a participant', () => {
			it('Returns true when all guardian fields are undefined', () => {
				expect(ParticipantRegistrationRequest.safeParse(adultConsentTestData).success).true;
			});

			it('Adds custom error if one guardian field is provided', () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...adultConsentTestData,
					guardianPhoneNumber: '1234567890',
				});
				expect(result.success).false;
				const errors = formatZodErrors(result);
				expect(errors[0].path).toBe('guardianPhoneNumber');
				expect(errors[0].message).toBe('participantHasGuardianInfo');
			});

			it('Adds custom error if one guardian field has an empty string', () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...adultConsentTestData,
					guardianPhoneNumber: '',
				});
				expect(result.success).false;
				const errors = formatZodErrors(result);
				expect(errors[0].path).toBe('guardianPhoneNumber');
				expect(errors[0].message).toBe('participantHasGuardianInfo');
			});

			it('Adds custom errors if all guardian fields are provided', () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...adultConsentTestData,
					guardianName: 'Homer Simpson',
					guardianPhoneNumber: '5492750173',
					guardianRelationship: 'Father',
				});
				expect(result.success).false;
				const errors = formatZodErrors(result);
				expect(errors[0].path).toBe('guardianName');
				expect(errors[0].message).toBe('participantHasGuardianInfo');
				expect(errors[1].path).toBe('guardianPhoneNumber');
				expect(errors[1].message).toBe('participantHasGuardianInfo');
				expect(errors[2].path).toBe('guardianRelationship');
				expect(errors[2].message).toBe('participantHasGuardianInfo');
			});

			it('Adds custom errors if all guardian fields have an empty string value', () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...adultConsentTestData,
					guardianName: '',
					guardianPhoneNumber: '',
					guardianRelationship: '',
				});
				expect(result.success).false;
				const errors = formatZodErrors(result);
				expect(errors[0].path).toBe('guardianName');
				expect(errors[0].message).toBe('participantHasGuardianInfo');
				expect(errors[1].path).toBe('guardianPhoneNumber');
				expect(errors[1].message).toBe('participantHasGuardianInfo');
				expect(errors[2].path).toBe('guardianRelationship');
				expect(errors[2].message).toBe('participantHasGuardianInfo');
			});
		});
	});

	describe('Email Address Field', () => {
		describe('User is a guardian', () => {
			it('Returns true if the user has a guardian email, and no participant email', () => {
				expect(ParticipantRegistrationRequest.safeParse(guardianConsentTestData).success).true;
			});

			it('Throws an invalid error if the user provides an invalid guardian email address', () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...guardianConsentTestData,
					guardianEmailAddress: 'homer simpson!',
				});
				expect(result.success).false;

				const errors = formatZodErrors(result);
				expect(errors[0].path).toBe('guardianEmailAddress');
				expect(errors[0].message).toBe('Invalid email');
			});

			it('Adds a custom error if guardian email is undefined', () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...guardianConsentTestData,
					guardianEmailAddress: undefined,
				});
				expect(result.success).false;

				const errors = formatZodErrors(result);
				expect(errors[0].path).toBe('guardianEmailAddress');
				expect(errors[0].message).toBe('guardianEmailMissing');
			});

			it('Throws an invalid error if guardian email is an empty string', () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...guardianConsentTestData,
					guardianEmailAddress: '',
				});
				expect(result.success).false;

				const errors = formatZodErrors(result);
				expect(errors[0].path).toBe('guardianEmailAddress');
				expect(errors[0].message).toBe('Invalid email');
			});

			it('Adds a custom error if the user provided a participant email address', () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...guardianConsentTestData,
					participantEmailAddress: 'bart@example.com',
				});
				expect(result.success).false;

				const errors = formatZodErrors(result);
				expect(errors[0].path).toBe('participantEmailAddress');
				expect(errors[0].message).toBe('guardianHasParticipantEmail');
			});
		});

		describe('User is a participant', () => {
			it('Returns true if the user provided a participant email, and no guardian email', () => {
				expect(ParticipantRegistrationRequest.safeParse(adultConsentTestData).success).true;
			});

			it('Throws an invalid error if the user provides an invalid participant email address', () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...adultConsentTestData,
					participantEmailAddress: 'homer simpson!',
				});
				expect(result.success).false;

				const errors = formatZodErrors(result);
				expect(errors[0].path).toBe('participantEmailAddress');
				expect(errors[0].message).toBe('Invalid email');
			});

			it("Adds a custom error if the user didn't provide a participant email", () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...adultConsentTestData,
					participantEmailAddress: undefined,
				});
				expect(result.success).false;

				const errors = formatZodErrors(result);
				expect(errors[0].path).toBe('participantEmailAddress');
				expect(errors[0].message).toBe('participantEmailMissing');
			});

			it('Adds a custom error if user provided a guardian email address', () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...adultConsentTestData,
					guardianEmailAddress: 'bart@example.com',
				});
				expect(result.success).false;

				const errors = formatZodErrors(result);
				expect(errors[0].path).toBe('guardianEmailAddress');
				expect(errors[0].message).toBe('participantHasGuardianEmail');
			});
		});
	});
});
