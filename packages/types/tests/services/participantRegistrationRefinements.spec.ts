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

// not sure where to put this
// i can't figure out the result type
/**
 * Checks Zod result for specific error messages on the provided fields.
 * @param result Result from expect statement.
 * @param errors Object with the path and error message for each field being tested
 */
export const expectErrorsByField = (result: any, errors: { path: string; message: string }[]) => {
	const resultJsonParsed = JSON.parse(result.error.message);
	errors.forEach(({ path, message }, i) => {
		const resultParsed = resultJsonParsed[i];
		const resultMessage = resultParsed.message;
		const resultPath = resultParsed.path[0];
		expect(resultPath).toBe(path);
		expect(resultMessage).toBe(message);
	});
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
			it('Returns true when participantPhoneNumber is not provided', () => {
				const result = ParticipantRegistrationRequest.safeParse(guardianConsentTestData);
				expect(result.success).true;
			});

			it('Adds a custom error to participantPhoneNumber if a value is provided', () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...guardianConsentTestData,
					participantPhoneNumber: '1234567890',
				});
				expectErrorsByField(result, [
					{ path: 'participantPhoneNumber', message: 'guardianHasParticipantPhoneNumber' },
				]);
			});
		});

		describe('User is a participant', () => {
			it('Returns true when participantPhoneNumber is provided', () => {
				const result = ParticipantRegistrationRequest.safeParse(adultConsentTestData);
				expect(result.success).true;
			});

			it('Adds a custom error to participantPhoneNumber if a value is not provided', () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...adultConsentTestData,
					participantPhoneNumber: undefined,
				});
				expectErrorsByField(result, [
					{ path: 'participantPhoneNumber', message: 'participantMissingPhoneNumber' },
				]);
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

		it("Adds a custom error to dateOfBirth when user's age is below the minimum", () => {
			const result = ParticipantRegistrationRequest.safeParse({
				...adultConsentTestData,
				dateOfBirth: lessThanMinimumAgeDateOfBirth,
			});
			expectErrorsByField(result, [
				{ path: 'dateOfBirth', message: 'participantLessThanMinimumAge' },
			]);
		});
	});

	describe('Conditional Guardian Fields', () => {
		describe('User is a guardian', () => {
			it('Returns true when all guardian fields are valid', () => {
				expect(ParticipantRegistrationRequest.safeParse(guardianConsentTestData).success).true;
			});

			it('Adds an error to specific fields if all guardian fields are undefined', () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...adultConsentTestData,
					guardianRelationship: '',
					isGuardian: true,
				});
				expect(result.success).false;

				expectErrorsByField(result, [
					{ path: 'guardianName', message: 'guardianInfoMissing' },
					{ path: 'guardianPhoneNumber', message: 'guardianInfoMissing' },
					{ path: 'guardianRelationship', message: 'guardianInfoMissing' },
				]);
			});

			it('Adds an error to specific field if one guardian field is undefined', () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...adultConsentTestData,
					guardianName: 'Homer Simpson',
					guardianPhoneNumber: '1234567890',
					isGuardian: true,
				});
				expect(result.success).false;

				expectErrorsByField(result, [
					{ path: 'guardianRelationship', message: 'guardianInfoMissing' },
				]);
			});

			it('Adds invalid field errors when the user has entered invalid values in guardian fields', () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...adultConsentTestData,
					guardianName: 'Homer Simpson {}',
					guardianPhoneNumber: '1234 + abc',
					guardianRelationship: 'F4th3r///',
					isGuardian: true,
				});
				expect(result.success).false;

				expectErrorsByField(result, [
					{ path: 'guardianName', message: 'Invalid' },
					{ path: 'guardianPhoneNumber', message: 'Invalid' },
					{ path: 'guardianRelationship', message: 'Invalid' },
				]);
			});

			it('Adds invalid and custom field errors when the user has a mix of invalid and missing values in guardian fields', () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...guardianConsentTestData,
					guardianName: 'Homer ]]]]]',
					guardianPhoneNumber: undefined,
					guardianRelationship: ' ',
					isGuardian: true,
				});
				expect(result.success).false;

				expectErrorsByField(result, [
					{ path: 'guardianName', message: 'Invalid' },
					{ path: 'guardianPhoneNumber', message: 'guardianInfoMissing' },
					{ path: 'guardianRelationship', message: 'guardianInfoMissing' },
				]);
			});
		});

		describe('User is a participant', () => {
			it('Parses correctly when all guardian fields are undefined', () => {
				expect(ParticipantRegistrationRequest.safeParse(adultConsentTestData).success).true;
			});

			it('Adds a custom error to guardianPhoneNumber if a value is provided', () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...adultConsentTestData,
					guardianPhoneNumber: '1234567890',
				});
				expect(result.success).false;

				expectErrorsByField(result, [
					{ path: 'guardianPhoneNumber', message: 'participantHasGuardianInfo' },
				]);
			});

			it('Adds a custom error to guardianPhoneNumber is added to the page and not filled out', () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...adultConsentTestData,
					guardianPhoneNumber: '',
				});
				expect(result.success).false;

				expectErrorsByField(result, [
					{ path: 'guardianPhoneNumber', message: 'participantHasGuardianInfo' },
				]);
			});

			it('Adds custom errors if multiple guardian fields are provided', () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...adultConsentTestData,
					guardianName: 'Homer Simpson',
					guardianPhoneNumber: '5492750173',
					guardianRelationship: 'Father',
				});
				expect(result.success).false;

				expectErrorsByField(result, [
					{ path: 'guardianName', message: 'participantHasGuardianInfo' },
					{ path: 'guardianPhoneNumber', message: 'participantHasGuardianInfo' },
					{ path: 'guardianRelationship', message: 'participantHasGuardianInfo' },
				]);
			});

			it('Adds custom errors if multiple guardian fields are added to the page and not filled out', () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...adultConsentTestData,
					guardianName: '',
					guardianPhoneNumber: '',
					guardianRelationship: '',
				});
				expect(result.success).false;

				expectErrorsByField(result, [
					{ path: 'guardianName', message: 'participantHasGuardianInfo' },
					{ path: 'guardianPhoneNumber', message: 'participantHasGuardianInfo' },
					{ path: 'guardianRelationship', message: 'participantHasGuardianInfo' },
				]);
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

				expectErrorsByField(result, [{ path: 'guardianEmailAddress', message: 'Invalid email' }]);
			});

			it('Adds a custom error to guardianEmailAddress if the field is missing from form state', () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...guardianConsentTestData,
					guardianEmailAddress: undefined,
				});
				expect(result.success).false;

				expectErrorsByField(result, [
					{ path: 'guardianEmailAddress', message: 'guardianEmailMissing' },
				]);
			});

			it("Throws an invalid error if the user didn't provide a guardian email", () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...guardianConsentTestData,
					guardianEmailAddress: '',
				});
				expect(result.success).false;

				expectErrorsByField(result, [{ path: 'guardianEmailAddress', message: 'Invalid email' }]);
			});

			it('Adds a custom error to participantEmailAddress if user provided a participant email address', () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...guardianConsentTestData,
					participantEmailAddress: 'bart@example.com',
				});
				expect(result.success).false;

				expectErrorsByField(result, [
					{ path: 'participantEmailAddress', message: 'guardianHasParticipantEmail' },
				]);
			});
		});

		describe('User is a participant', () => {
			it('Returns true if the user has a participant email, and no guardian email', () => {
				expect(ParticipantRegistrationRequest.safeParse(adultConsentTestData).success).true;
			});

			it('Throws an invalid error if the user provides an invalid guardian email address', () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...adultConsentTestData,
					participantEmailAddress: 'homer simpson!',
				});
				expect(result.success).false;

				expectErrorsByField(result, [
					{ path: 'participantEmailAddress', message: 'Invalid email' },
				]);
			});

			it("Adds a custom error to participantEmailAddress if the user didn't provide a participant email", () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...adultConsentTestData,
					participantEmailAddress: undefined,
				});
				expect(result.success).false;

				expectErrorsByField(result, [
					{ path: 'participantEmailAddress', message: 'participantEmailMissing' },
				]);
			});

			it('Adds a custom error to guardianEmailAddress if user provided a guardian email address', () => {
				const result = ParticipantRegistrationRequest.safeParse({
					...adultConsentTestData,
					guardianEmailAddress: 'bart@example.com',
				});
				expect(result.success).false;

				expectErrorsByField(result, [
					{ path: 'guardianEmailAddress', message: 'participantHasGuardianEmail' },
				]);
			});
		});
	});
});
