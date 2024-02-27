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

import { registerHasRequiredGuardianInfo } from 'types/common';
import { GuardianBaseFields, Name, PhoneNumber } from 'types/entities';
import { z } from 'zod';

// TODO hookup backend #368
// create a better zod schema with conditional validation,
// and optional name fields

// REGISTER STEP 1

const RegisterFormStep1Fields = z.object({
	isGuardian: z.boolean(),
	participantFirstName: Name,
	participantLastName: Name,
	participantPhoneNumber: PhoneNumber,
	participantPreferredName: Name.optional(),
});

const RegisterGuardianFields = GuardianBaseFields.omit({ guardianEmailAddress: true });

export const RegisterFormStep1 = RegisterFormStep1Fields.merge(RegisterGuardianFields).refine(
	registerHasRequiredGuardianInfo,
);
// TODO #366 add refine - make sure participant is an adult
export type RegisterFormStep1 = z.infer<typeof RegisterFormStep1>;

// REGISTER STEP 2

const RegisterFormStep2Fields = z.object({
	consentToBeContacted: z.literal(true),
	participantEmailAddress: z.string().email(),
});

const PasswordFields = z
	.object({
		confirmPassword: z.string().min(1), // TEMP #368
		password: z.string().min(1), // TEMP #368
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'passwordMismatch',
		path: ['confirmPassword'],
	});

export const RegisterFormStep2 = z.intersection(PasswordFields, RegisterFormStep2Fields);
export type RegisterFormStep2 = z.infer<typeof RegisterFormStep2>;

// REGISTER POST REQUEST
// combine both steps

export const RegisterRequest = z.intersection(RegisterFormStep1, RegisterFormStep2);
export type RegisterRequest = z.infer<typeof RegisterRequest>;
