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
import { SchemaObject } from 'openapi3-ts/oas31';

import { asOptionalField } from '../../utils.js';
import { hasRequiredGuardianInformation } from '../ParticipantIdentification.js';
import { Name } from '../Name.js';
import { PhoneNumber } from '../PhoneNumber.js';
import { ConsentGroup } from '../ConsentGroup.js';

// this is specifically for validating the Clinician Invite form in consent UI
// using the zod resolver in react-hook-form.
// keep it separate from API schemas.

export const ClinicianInviteFormValidation = z
	.object({
		clinicianFirstName: Name,
		clinicianInstitutionalEmailAddress: z.string().email(),
		clinicianLastName: Name,
		clinicianTitleOrRole: z.string().trim().nonempty(),
		consentGroup: ConsentGroup,
		consentToBeContacted: z.literal(true),
		guardianEmailAddress: z.string().email().optional(),
		guardianName: asOptionalField(Name),
		guardianPhoneNumber: asOptionalField(PhoneNumber),
		guardianRelationship: asOptionalField(Name),
		participantEmailAddress: z.string().email(),
		participantFirstName: Name,
		participantLastName: Name,
		participantPhoneNumber: PhoneNumber,
		participantPreferredName: asOptionalField(Name),
	})
	.refine((input) => {
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

export type ClinicianInviteFormValidation = z.infer<typeof ClinicianInviteFormValidation>;
export const ClinicianInviteFormValidationSchema: SchemaObject = generateSchema(
	ClinicianInviteFormValidation,
);
