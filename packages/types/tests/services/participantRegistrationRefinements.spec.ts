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
	RegisterFormStep1Fields,
	RegisterFormStep2,
} from '../../src/services/consentUi/requests/Register.js';
import { createDateOfBirthRequestSchema } from '../../src/common/utils/dateOfBirth.js';
import { makeDateOfBirthTestSetup } from '../utils/dateOfBirth.spec.js';

describe('ParticipantRegistrationRequest', () => {
	const {
		exactlyMinimumAgeDateOfBirth,
		lessThanMinimumAgeDateOfBirth,
		mockDate,
		olderThanMinimumAgeDateOfBirth,
	} = makeDateOfBirthTestSetup();

	// re-create ParticipantRegistrationRequest with a fixed date for judging mock users' ages
	const DateOfBirthField = createDateOfBirthRequestSchema(mockDate);
	const RegisterFormStep1 = z.intersection(DateOfBirthField, RegisterFormStep1Fields);
	const ParticipantRegistrationRequest = z.intersection(RegisterFormStep1, RegisterFormStep2);

	const testData = {
		confirmPassword: 'password',
		consentToBeContacted: true,
		dateOfBirth: olderThanMinimumAgeDateOfBirth,
		guardianName: 'Homer Simpson',
		guardianPhoneNumber: '1234567890',
		guardianRelationship: 'Father',
		participantEmailAddress: 'bart@example.com',
		participantFirstName: 'Bartholomew',
		participantLastName: 'Simpson',
		participantPhoneNumber: '2345678901',
		participantPreferredName: 'Bart',
		password: 'password',
	};

	it("Adds an error to the dateOfBirth field when user's age is below the minimum", () => {
		const result = ParticipantRegistrationRequest.safeParse({
			...testData,
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
				...testData,
				dateOfBirth: exactlyMinimumAgeDateOfBirth,
			}).success,
		).true;
		expect(
			ParticipantRegistrationRequest.safeParse({
				...testData,
				dateOfBirth: olderThanMinimumAgeDateOfBirth,
			}).success,
		).true;
	});
});
