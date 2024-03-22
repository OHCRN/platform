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

import { ConsentToBeContacted, ParticipantNameFields } from '../../../entities/Participant.js';
import {
	NonEmptyString,
	createDateOfBirthRequestSchema,
	hasParticipantPhoneNumberForRegistration,
	hasRequiredEmailForConsentGroupForRegistration,
	hasRequiredGuardianInfoForRegistration,
} from '../../../common/index.js';
import {
	EmptyOrOptionalName,
	EmptyOrOptionalPhoneNumber,
	hasMatchingPasswords,
} from '../../../entities/fields/index.js';

const isGuardianField = z.object({
	isGuardian: z.boolean(),
});

// STEP 1

const RegisterRequestParticipantNameFields = ParticipantNameFields.and(
	z.object({
		participantPreferredName: EmptyOrOptionalName,
	}),
);

const RegisterRequestParticipantPhoneNumberField = isGuardianField.and(
	z.object({
		participantPhoneNumber: EmptyOrOptionalPhoneNumber,
	}),
);
export type RegisterRequestParticipantPhoneNumberField = z.infer<
	typeof RegisterRequestParticipantPhoneNumberField
>;
const RegisterRequestParticipantPhoneNumberFieldRefined =
	RegisterRequestParticipantPhoneNumberField.superRefine(hasParticipantPhoneNumberForRegistration);

const DateOfBirthField = createDateOfBirthRequestSchema();

const RegisterRequestGuardianFields = isGuardianField.and(
	z.object({
		guardianName: EmptyOrOptionalName,
		guardianPhoneNumber: EmptyOrOptionalPhoneNumber,
		guardianRelationship: EmptyOrOptionalName,
	}),
);
export type RegisterRequestGuardianFields = z.infer<typeof RegisterRequestGuardianFields>;
const RegisterRequestGuardianFieldsRefined = RegisterRequestGuardianFields.superRefine(
	hasRequiredGuardianInfoForRegistration,
);

export const RegisterFormStep1NoDateOfBirth = RegisterRequestParticipantNameFields.and(
	RegisterRequestGuardianFieldsRefined,
).and(RegisterRequestParticipantPhoneNumberFieldRefined);

export const RegisterFormStep1 = RegisterFormStep1NoDateOfBirth.and(DateOfBirthField);
export type RegisterFormStep1 = z.infer<typeof RegisterFormStep1>;

// STEP 2

const RegisterRequestEmailAddressFields = isGuardianField.and(
	z.object({
		guardianEmailAddress: z.string().email().optional(),
		participantEmailAddress: z.string().email().optional(),
	}),
);
export type RegisterRequestEmailAddressFields = z.infer<typeof RegisterRequestEmailAddressFields>;
const RegisterEmailAddressFieldsRefined = RegisterRequestEmailAddressFields.superRefine(
	hasRequiredEmailForConsentGroupForRegistration,
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
