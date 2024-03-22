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

import { generateSchema } from '@anatine/zod-openapi';
import { SchemaObject } from 'openapi3-ts/oas31';
import { z } from 'zod';

import { GuardianNullableResponseFields } from '../../../entities/Guardian.js';
import {
	InviteGuardianFields,
	InviteParticipantFields,
} from '../../../entities/ClinicianInvite.js';
import { Name, NanoId, PhoneNumber } from '../../../entities/fields/index.js';

export const PIClinicianInvite = InviteParticipantFields.merge(InviteGuardianFields);

export const PIClinicianInviteResponse = PIClinicianInvite.extend({ id: NanoId })
	.extend({
		assentFormIdentifier: z
			.string()
			.nullable()
			.transform((input) => input ?? undefined),
		participantPreferredName: Name.nullable().transform((input) => input ?? undefined),
		participantEmailAddress: z
			.string()
			.email()
			.nullable()
			.transform((input) => input ?? undefined),
		participantPhoneNumber: PhoneNumber.nullable().transform((input) => input ?? undefined),
	})
	.extend(GuardianNullableResponseFields);

export type PIClinicianInviteResponse = z.infer<typeof PIClinicianInviteResponse>;
export const PIClinicianInviteResponseSchema: SchemaObject =
	generateSchema(PIClinicianInviteResponse);
