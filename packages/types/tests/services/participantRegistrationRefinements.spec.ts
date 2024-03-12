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
import { z } from 'zod';

import {
	RegisterRequestGuardianFieldsRefined,
	RegisterFormStep1Fields,
	RegisterFormStep2,
} from '../../src/services/consentUi/requests/Register.js';
import { createDateOfBirthRequestSchema } from '../../src/common/utils/dateOfBirth.js';
import { setupDateOfBirthTest } from '../utils/dateOfBirth.spec.js';

describe('ParticipantRegistrationRequest', () => {
	const {
		exactlyMinimumAgeDateOfBirth,
		lessThanMinimumAgeDateOfBirth,
		mockDate,
		olderThanMinimumAgeDateOfBirth,
	} = setupDateOfBirthTest();

	// re-create ParticipantRegistrationRequest with a fixed date for judging mock users' ages
	const DateOfBirthField = createDateOfBirthRequestSchema(mockDate);
	const RegisterFormStep1 = RegisterFormStep1Fields.and(DateOfBirthField).and(
		RegisterRequestGuardianFieldsRefined,
	);
	const ParticipantRegistrationRequest = z.intersection(RegisterFormStep1, RegisterFormStep2);

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

	describe('Date of Birth Field', () => {
		it("Adds an error to the dateOfBirth field when user's age is below the minimum", () => {
			const result = ParticipantRegistrationRequest.safeParse({
				...adultConsentTestData,
				dateOfBirth: lessThanMinimumAgeDateOfBirth,
			});
			const resultParsed = JSON.parse((result as { error: Error }).error.message)[0];
			const resultMessage = resultParsed.message;
			const resultPath = resultParsed.path[0];
			expect(result.success).false;
			expect(resultMessage).toBe('participantLessThanMinimumAge');
			expect(resultPath).toBe('dateOfBirth');
		});

		it("Parses correctly when the user's age is equal to or greater than the minimum", () => {
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
	});

	describe('Conditional Guardian Fields', () => {
		it('Adds an error to specific fields if the user is a guardian and missing all guardian fields', () => {
			const result = ParticipantRegistrationRequest.safeParse({
				...adultConsentTestData,
				guardianRelationship: '',
				isGuardian: true,
			});
			expect(result.success).false;
			const resultJsonParsed = JSON.parse((result as { error: Error }).error.message);

			const resultParsed1 = resultJsonParsed[0];
			const resultMessage1 = resultParsed1.message;
			const resultPath1 = resultParsed1.path[0];
			expect(resultMessage1).toBe('guardianInfoMissing');
			expect(resultPath1).toBe('guardianName');

			const resultParsed2 = resultJsonParsed[1];
			const resultMessage2 = resultParsed2.message;
			const resultPath2 = resultParsed2.path[0];
			expect(resultMessage2).toBe('guardianInfoMissing');
			expect(resultPath2).toBe('guardianPhoneNumber');

			const resultParsed3 = resultJsonParsed[2];
			const resultMessage3 = resultParsed3.message;
			const resultPath3 = resultParsed3.path[0];
			expect(resultMessage3).toBe('guardianInfoMissing');
			expect(resultPath3).toBe('guardianRelationship');
		});

		it('Adds an error to specific field if the user is a guardian and missing one guardian field', () => {
			const result = ParticipantRegistrationRequest.safeParse({
				...adultConsentTestData,
				guardianName: 'Homer Simpson',
				guardianPhoneNumber: '1234567890',
				isGuardian: true,
			});
			expect(result.success).false;
			const resultJsonParsed = JSON.parse((result as { error: Error }).error.message);

			const resultParsed = resultJsonParsed[0];
			const resultMessage = resultParsed.message;
			const resultPath = resultParsed.path[0];
			expect(resultMessage).toBe('guardianInfoMissing');
			expect(resultPath).toBe('guardianRelationship');
		});

		it('Adds invalid field errors when the user is a guardian and has entered invalid values in guardian fields', () => {
			const result = ParticipantRegistrationRequest.safeParse({
				...adultConsentTestData,
				guardianName: 'Homer Simpson {}',
				guardianPhoneNumber: '1234 + abc',
				guardianRelationship: 'F4th3r///',
				isGuardian: true,
			});
			expect(result.success).false;
			const resultJsonParsed = JSON.parse((result as { error: Error }).error.message);

			const resultParsed1 = resultJsonParsed[0];
			const resultMessage1 = resultParsed1.message;
			const resultPath1 = resultParsed1.path[0];
			expect(resultMessage1).toBe('Invalid');
			expect(resultPath1).toBe('guardianName');

			const resultParsed2 = resultJsonParsed[1];
			const resultMessage2 = resultParsed2.message;
			const resultPath2 = resultParsed2.path[0];
			expect(resultMessage2).toBe('Invalid');
			expect(resultPath2).toBe('guardianPhoneNumber');

			const resultParsed3 = resultJsonParsed[2];
			const resultMessage3 = resultParsed3.message;
			const resultPath3 = resultParsed3.path[0];
			expect(resultMessage3).toBe('Invalid');
			expect(resultPath3).toBe('guardianRelationship');
		});

		it('Adds invalid and missing field errors when the user is a guardian and has a mix of invalid and missing values in guardian fields', () => {
			const result = ParticipantRegistrationRequest.safeParse({
				...adultConsentTestData,
				guardianName: 'Homer ]]]]]',
				guardianRelationship: ' ',
				isGuardian: true,
			});
			expect(result.success).false;
			const resultJsonParsed = JSON.parse((result as { error: Error }).error.message);

			const resultParsed1 = resultJsonParsed[0];
			const resultMessage1 = resultParsed1.message;
			const resultPath1 = resultParsed1.path[0];
			expect(resultMessage1).toBe('Invalid');
			expect(resultPath1).toBe('guardianName');

			const resultParsed2 = resultJsonParsed[1];
			const resultMessage2 = resultParsed2.message;
			const resultPath2 = resultParsed2.path[0];
			expect(resultMessage2).toBe('guardianInfoMissing');
			expect(resultPath2).toBe('guardianPhoneNumber');

			const resultParsed3 = resultJsonParsed[2];
			const resultMessage3 = resultParsed3.message;
			const resultPath3 = resultParsed3.path[0];
			expect(resultMessage3).toBe('guardianInfoMissing');
			expect(resultPath3).toBe('guardianRelationship');
		});

		it('Parses correctly when the user is a guardian and all guardian fields are valid', () => {
			expect(
				ParticipantRegistrationRequest.safeParse({
					...adultConsentTestData,
					guardianName: 'Homer Simpson',
					guardianPhoneNumber: '1234567890',
					guardianRelationship: 'Father',
					isGuardian: true,
				}).success,
			).true;
		});

		it('Parses correctly when the user is not a guardian and all guardian fields are undefined', () => {
			expect(ParticipantRegistrationRequest.safeParse(adultConsentTestData).success).true;
		});
	});
});
