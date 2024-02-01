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

import { Name, PhoneNumber } from 'types/entities';
import { z } from 'zod';

// TODO hookup backend #368
// create a better zod schema with conditional validation,
// and optional name fields

export const RegisterFormStep1 = z.object({
	dateOfBirth: z.string().min(1), // TEMP #366
	guardianName: Name,
	guardianPhoneNumber: PhoneNumber,
	guardianRelationship: Name,
	participantFirstName: Name,
	participantLastName: Name,
	participantPhoneNumber: PhoneNumber,
	participantPreferredName: Name,
	// registeringOnBehalfOfSomeoneElse: z.boolean(), TODO #366
	// commenting this out because the form won't work
	// with unused fields in the Zod schema
});
export type RegisterFormStep1 = z.infer<typeof RegisterFormStep1>;

export const RegisterFormStep2Fields = z.object({
	confirmPassword: z.string().min(1), // TEMP #368
	consentToBeContacted: z.literal(true),
	participantEmailAddress: z.string().email(),
	password: z.string().min(1), // TEMP #368
});

// TODO this validation doesn't work onBlur https://github.com/OHCRN/platform/issues/398
export const RegisterFormStep2 = RegisterFormStep2Fields.refine(
	(data) => data.password === data.confirmPassword,
	{
		path: ['confirmPassword'],
		message: 'passwordMismatch',
	},
);
export type RegisterFormStep2 = z.infer<typeof RegisterFormStep2>;

export const RegisterRequest = RegisterFormStep1.merge(RegisterFormStep2Fields).refine(
	(data) => data.password === data.confirmPassword,
	{
		path: ['confirmPassword'],
		message: 'passwordMismatch',
	},
);
export type RegisterRequest = z.infer<typeof RegisterRequest>;
