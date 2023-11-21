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
import { generateSchema } from '@anatine/zod-openapi';
import type { SchemaObject } from 'openapi3-ts/oas31';

import { ConsentGroup } from './ConsentGroup.js';
import { Name } from './Name.js';
import { PhoneNumber } from './PhoneNumber.js';
import { NanoId } from './NanoId.js';
import { hasRequiredGuardianInformation } from './ParticipantIdentification.js';
import { ConsentToBeContacted } from './ConsentToBeContacted.js';

export const ClinicianInviteBase = z.object({
	clinicianFirstName: Name,
	clinicianInstitutionalEmailAddress: z.string().email(),
	clinicianLastName: Name,
	clinicianTitleOrRole: Name,
	consentGroup: ConsentGroup,
	consentToBeContacted: ConsentToBeContacted,
	guardianEmailAddress: z.string().email().optional().or(z.literal('')),
	guardianName: Name.optional().or(z.literal('')),
	guardianPhoneNumber: PhoneNumber.optional().or(z.literal('')),
	guardianRelationship: Name.optional().or(z.literal('')),
	participantEmailAddress: z.string().email(),
	participantFirstName: Name,
	participantLastName: Name,
	participantPhoneNumber: PhoneNumber,
	participantPreferredName: Name.optional().or(z.literal('')),
});

export const refineClinicianInvite = <T extends z.ZodTypeAny>(schema: T) =>
	schema.refine((input) => {
		const {
			consentGroup,
			guardianName,
			guardianPhoneNumber,
			guardianEmailAddress,
			guardianRelationship,
		} = input;
		return hasRequiredGuardianInformation(
			consentGroup,
			guardianName,
			guardianPhoneNumber,
			guardianEmailAddress,
			guardianRelationship,
		);
	});

export const ClinicianInvite = refineClinicianInvite(
	ClinicianInviteBase.and(
		z.object({
			id: NanoId,
			inviteSentDate: z.coerce.date(),
			inviteAcceptedDate: z.coerce.date().optional(),
			inviteAccepted: z.boolean().default(false),
		}),
	),
);

export type ClinicianInvite = z.infer<typeof ClinicianInvite>;
export const ClinicianInviteSchema: SchemaObject = generateSchema(ClinicianInvite);
