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

import {
	hasRequiredAssentFormIdentifier,
	NonEmptyString,
	OptionalString,
} from '../common/index.js';

import { ConsentGroup, Name, NanoId, OptionalName } from './fields/index.js';
import { GuardianBaseFields } from './Guardian.js';
import {
	ConsentToBeContacted,
	ParticipantContactFields,
	ParticipantBaseOhipNameFields,
} from './Participant.js';

export const InviteClinicianFields = z
	.object({
		clinicianFirstName: Name,
		clinicianInstitutionalEmailAddress: z.string().email(),
		clinicianLastName: Name,
		clinicianTitleOrRole: NonEmptyString,
	})
	.merge(ConsentToBeContacted)
	.merge(
		z.object({
			consentGroup: ConsentGroup,
		}),
	);

export type InviteClinicianFields = z.infer<typeof InviteClinicianFields>;

export const InviteGuardianFields = GuardianBaseFields;
export type InviteGuardianFields = z.infer<typeof InviteGuardianFields>;

export const InviteParticipantFields = ParticipantBaseOhipNameFields.merge(
	z.object({ participantPreferredName: OptionalName, assentFormIdentifier: OptionalString }),
).merge(ParticipantContactFields);
export type InviteParticipantFields = z.infer<typeof InviteParticipantFields>;

export const InviteEntity = z.object({
	id: NanoId,
	inviteSentDate: z.coerce.date(),
	inviteAcceptedDate: z.coerce.date().optional(),
	inviteAccepted: z.boolean().default(false),
});

export const ClinicianInviteBase =
	InviteClinicianFields.merge(InviteGuardianFields).merge(InviteParticipantFields);

export type ClinicianInviteBase = z.infer<typeof ClinicianInviteBase>;
