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

import { Name, PhoneNumber, checkParticipantIsAdult } from 'types/entities';
import { z } from 'zod';

// TODO hookup backend #368
// create a better zod schema with conditional validation,
// and optional name fields

// STEP 1

const RegisterFormStep1Fields = z.object({
	guardianName: Name,
	guardianPhoneNumber: PhoneNumber,
	guardianRelationship: Name,
	participantFirstName: Name,
	participantLastName: Name,
	participantPhoneNumber: PhoneNumber,
	participantPreferredName: Name,
	// isGuardian: z.boolean(), TODO #366
	// commenting this out because the form won't work
	// with unused fields in the Zod schema
});

const DateOfBirthField = z
	.object({
		dateOfBirth: z.coerce.date(),
	})
	.refine(checkParticipantIsAdult, { message: 'participantIsMinor', path: ['dateOfBirth'] });

export const RegisterFormStep1 = z.intersection(DateOfBirthField, RegisterFormStep1Fields);
export type RegisterFormStep1 = z.infer<typeof RegisterFormStep1>;

// STEP 2

const RegisterFormStep2Fields = z.object({
	consentToBeContacted: z.literal(true),
	participantEmailAddress: z.string().email(),
});

export const PasswordFields = z
	.object({
		confirmPassword: z.string().min(1), // TEMP #368
		password: z.string().min(1), // TEMP #368
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'passwordMismatch',
		path: ['confirmPassword'],
	});
export type PasswordFields = z.infer<typeof PasswordFields>;

export const RegisterFormStep2 = z.intersection(PasswordFields, RegisterFormStep2Fields);
export type RegisterFormStep2 = z.infer<typeof RegisterFormStep2>;

export const RegisterRequest = z.intersection(RegisterFormStep1, RegisterFormStep2);
export type RegisterRequest = z.infer<typeof RegisterRequest>;
