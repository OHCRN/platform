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
	ConsentGroup,
	LifecycleState,
	Name,
	NanoId,
	PhoneNumber,
	PostalCode,
	Province,
} from './fields/index.js';
import { GuardianBaseFields } from './Guardian.js';

export const ParticipantNameFields = z.object({
	participantFirstName: Name,
	participantLastName: Name,
});

export type ParticipantNameFields = z.infer<typeof ParticipantNameFields>;

export const ParticipantBaseOhipNameFields = z.object({
	participantOhipFirstName: Name,
	participantOhipLastName: Name,
});
export type ParticipantBaseOhipNameFields = z.infer<typeof ParticipantBaseOhipNameFields>;

// participant contact info is optional to allow for excluding based on presence of guardian
export const ParticipantContactFields = z.object({
	participantEmailAddress: z.string().email().optional(),
	participantPhoneNumber: PhoneNumber.optional(),
});
export type ParticipantContactFields = z.infer<typeof ParticipantContactFields>;

export const ConsentToBeContacted = z.object({ consentToBeContacted: z.literal(true) });
export type ConsentToBeContacted = z.infer<typeof ConsentToBeContacted>;

export const ParticipantIdentityBase = ParticipantBaseOhipNameFields.merge(ParticipantContactFields)
	.merge(GuardianBaseFields)
	.merge(
		z.object({
			dateOfBirth: z.coerce.date(),
			participantPreferredName: Name.optional(),
		}),
	);

export type ParticipantIdentityBase = z.infer<typeof ParticipantIdentityBase>;

export const PIParticipantBase = ParticipantIdentityBase.merge(
	z.object({
		mailingAddressStreet: z.string().optional(),
		mailingAddressCity: z.string().optional(),
		mailingAddressProvince: Province.optional(),
		mailingAddressPostalCode: PostalCode.optional(),
		residentialPostalCode: PostalCode,
		inviteId: NanoId.optional(),
		participantOhipMiddleName: Name.optional(),
	}),
);
export type PIParticipantBase = z.infer<typeof PIParticipantBase>;

export const ConsentParticipantBase = z
	.object({
		currentLifecycleState: LifecycleState,
		previousLifecycleState: LifecycleState.optional(),
		consentGroup: ConsentGroup,
		emailVerified: z.boolean(),
		isGuardian: z.boolean(),
	})
	.merge(ConsentToBeContacted);
export type ConsentParticipantBase = z.infer<typeof ConsentParticipantBase>;
