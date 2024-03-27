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

import { z } from 'zod';

import { NonEmptyString } from '../../../common/index.js';
import {
	ConsentToBeContacted,
	DateOfBirthField,
	RegisterRequestEmailAddressFields,
	RegisterRequestGuardianFields,
	RegisterRequestParticipantNameFields,
	RegisterRequestParticipantPhoneNumberField,
	hasMatchingPasswords,
} from '../../../entities/index.js';
import {
	hasRequiredGuardianInfoForRegistration,
	hasRequiredRegistrationEmailForGuardianStatus,
	hasRequiredRegistrationPhoneNumberForGuardianStatus,
} from '../utils/index.js';

export const RegisterRequestParticipantPhoneNumberFieldRefined =
	RegisterRequestParticipantPhoneNumberField.superRefine(
		hasRequiredRegistrationPhoneNumberForGuardianStatus,
	);

export const RegisterRequestGuardianFieldsRefined = RegisterRequestGuardianFields.superRefine(
	hasRequiredGuardianInfoForRegistration,
);

export const RegisterFormStep1 = RegisterRequestParticipantNameFields.and(
	RegisterRequestGuardianFieldsRefined,
)
	.and(RegisterRequestParticipantPhoneNumberFieldRefined)
	.and(DateOfBirthField);
export type RegisterFormStep1 = z.infer<typeof RegisterFormStep1>;

const RegisterEmailAddressFieldsRefined = RegisterRequestEmailAddressFields.superRefine(
	hasRequiredRegistrationEmailForGuardianStatus,
);

const PasswordFields = z
	.object({
		confirmPassword: NonEmptyString,
		password: NonEmptyString,
	})
	.refine(hasMatchingPasswords, {
		message: 'passwordMismatch',
		path: ['confirmPassword'],
	});

export const RegisterFormStep2 =
	RegisterEmailAddressFieldsRefined.and(ConsentToBeContacted).and(PasswordFields);
export type RegisterFormStep2 = z.infer<typeof RegisterFormStep2>;

// COMBINE STEPS

export const ParticipantRegistrationRequest = z.intersection(RegisterFormStep1, RegisterFormStep2);
export type ParticipantRegistrationRequest = z.infer<typeof ParticipantRegistrationRequest>;
