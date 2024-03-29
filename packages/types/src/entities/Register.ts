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

import { createDateOfBirthRequestSchema } from '../common/index.js';

import { ParticipantNameFields } from './Participant.js';
import { EmptyOrOptionalName, EmptyOrOptionalPhoneNumber } from './fields/index.js';

export const isGuardianField = z.object({
	isGuardian: z.boolean(),
});

// STEP 1

export const RegisterRequestParticipantNameFields = ParticipantNameFields.and(
	z.object({
		participantPreferredName: EmptyOrOptionalName,
	}),
);

// participant phone number - required for participants, not allowed for guardians
export const RegisterRequestParticipantPhoneNumberField = isGuardianField.and(
	z.object({
		participantPhoneNumber: EmptyOrOptionalPhoneNumber,
	}),
);
export type RegisterRequestParticipantPhoneNumberField = z.infer<
	typeof RegisterRequestParticipantPhoneNumberField
>;

export const DateOfBirthField = createDateOfBirthRequestSchema();

// guardian fields - required for guardians, not allowed for participants
export const RegisterRequestGuardianFields = isGuardianField.and(
	z.object({
		guardianName: EmptyOrOptionalName,
		guardianPhoneNumber: EmptyOrOptionalPhoneNumber,
		guardianRelationship: EmptyOrOptionalName,
	}),
);
export type RegisterRequestGuardianFields = z.infer<typeof RegisterRequestGuardianFields>;

// STEP 2

export const RegisterRequestEmailAddressFields = isGuardianField.and(
	z.object({
		guardianEmailAddress: z.string().email().optional(),
		participantEmailAddress: z.string().email().optional(),
	}),
);
export type RegisterRequestEmailAddressFields = z.infer<typeof RegisterRequestEmailAddressFields>;
