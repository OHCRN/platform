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

import { ConsentGroup } from '../ConsentGroup.js';
import { Name } from '../Name.js';
import { PhoneNumber } from '../PhoneNumber.js';
import { NanoId } from '../NanoId.js';
import { hasRequiredGuardianInformation } from '../ParticipantIdentification.js';

export const ClinicianInviteBase = z.object({
	id: NanoId,
	inviteSentDate: z.coerce.date(),
	inviteAcceptedDate: z.coerce.date().optional(),
	inviteAccepted: z.boolean().default(false),
	clinicianFirstName: Name,
	clinicianLastName: Name,
	clinicianInstitutionalEmailAddress: z.string().email(),
	clinicianTitleOrRole: z.string(),
	participantFirstName: Name,
	participantLastName: Name,
	participantEmailAddress: z.string().email(),
	participantPhoneNumber: PhoneNumber,
	participantPreferredName: Name.optional(),
	consentGroup: ConsentGroup,
	guardianName: Name.optional(),
	guardianPhoneNumber: PhoneNumber.optional(),
	guardianEmailAddress: z.string().email().optional(),
	guardianRelationship: Name.optional(),
	consentToBeContacted: z.literal(true),
});

export const ClinicianInviteRequest = ClinicianInviteBase.pick({
	clinicianFirstName: true,
	clinicianLastName: true,
	clinicianInstitutionalEmailAddress: true,
	clinicianTitleOrRole: true,
	participantFirstName: true,
	participantLastName: true,
	participantEmailAddress: true,
	participantPhoneNumber: true,
	participantPreferredName: true,
	consentGroup: true,
	guardianName: true,
	guardianPhoneNumber: true,
	guardianEmailAddress: true,
	guardianRelationship: true,
	consentToBeContacted: true,
}).refine((input) => {
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

export type ClinicianInviteRequest = z.infer<typeof ClinicianInviteRequest>;
export const ClinicianInviteRequestSchema: SchemaObject = generateSchema(ClinicianInviteRequest);

export const ClinicianInviteResponse = ClinicianInviteBase.refine((input) => {
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

export type ClinicianInviteResponse = z.infer<typeof ClinicianInviteResponse>;
export const ClinicianInviteResponseSchema: SchemaObject = generateSchema(ClinicianInviteResponse);
