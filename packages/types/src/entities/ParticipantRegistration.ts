/*
 * Copyright (c) 2023 The Ontario Institute for Cancer Research. All rights reserved
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
import { generateSchema, extendZodWithOpenApi } from '@anatine/zod-openapi';
import type { SchemaObject } from 'openapi3-ts/oas31';

import { NanoId } from './NanoId.js';
import { Name } from './Name.js';
import { PhoneNumber } from './PhoneNumber.js';

extendZodWithOpenApi(z);

export const ParticipantRegistration = z
	.object({
		keycloakId: z.string().uuid(),
		inviteId: NanoId.optional(),
		isGuardian: z.boolean(),
		participantPreferredName: Name,
		participantOhipFirstName: Name,
		participantOhipLastName: Name,
		dateOfBirth: z.string().datetime(),
		emailAddress: z.string().email(),
		guardianName: Name.optional(),
		guardianPhoneNumber: PhoneNumber.optional(),
		guardianEmailAddress: z.string().email().optional(),
		guardianRelationship: Name.optional(),
		consentToBeContacted: z.boolean(),
	})
	.refine((input) => {
		return input.isGuardian
			? input.guardianName !== undefined &&
					input.guardianPhoneNumber !== undefined &&
					input.guardianEmailAddress !== undefined &&
					input.guardianRelationship !== undefined
			: true;
	})
	.openapi({
		example: {
			keycloakId: '3d7d161e-da15-41f2-b863-a201fb6bb8cc',
			inviteId: 'TjvI79qhWw1fMKJsaYo497SaOZ30Fc26',
			isGuardian: true,
			participantPreferredName: 'Homer',
			participantOhipFirstName: 'Homer',
			participantOhipLastName: 'Simpson',
			dateOfBirth: '2023-10-19T19:56:06.063Z',
			emailAddress: 'homer.simpson@example.com',
			guardianName: 'Marge Simpson',
			guardianPhoneNumber: '6395506721',
			guardianEmailAddress: 'marge.simpson@example.com',
			guardianRelationship: 'Wife',
			consentToBeContacted: true,
		},
	});

export type ParticipantRegistration = z.infer<typeof ParticipantRegistration>;

export const ParticipantRegistrationRequest: SchemaObject = generateSchema(ParticipantRegistration);
