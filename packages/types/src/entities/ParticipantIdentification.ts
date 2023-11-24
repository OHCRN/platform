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

import { ConsentGroup } from './ConsentGroup.js';
import { Province } from './Province.js';
import { PhoneNumber } from './PhoneNumber.js';
import { PostalCode } from './PostalCode.js';
import { Name } from './Name.js';
import { OhipNumber } from './OhipNumber.js';
import { NanoId } from './NanoId.js';
import { LifecycleState } from './LifecycleState.js';

export const hasRequiredGuardianInformation = (
	consentGroup: ConsentGroup,
	guardianName?: Name,
	guardianPhoneNumber?: PhoneNumber,
	guardianEmailAddress?: string,
	guardianRelationship?: Name,
) => {
	// guardianName, guardianPhoneNumber, guardianEmailAddress, guardianRelationship must be defined if
	// ConsentGroup.GUARDIAN_CONSENT_OF_MINOR or ConsentGroup.GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT was selected
	const requiresGuardianInformation =
		consentGroup === ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR ||
		consentGroup === ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT;
	return requiresGuardianInformation
		? z
				.object({
					guardianEmailAddress: z.string().email(),
					guardianName: Name,
					guardianPhoneNumber: PhoneNumber,
					guardianRelationship: Name,
				})
				.safeParse({
					guardianEmailAddress,
					guardianName,
					guardianPhoneNumber,
					guardianRelationship,
				}).success
		: true;
};

export const ParticipantIdentification = z
	.object({
		id: NanoId,
		inviteId: NanoId.optional(),
		currentLifecycleState: LifecycleState,
		previousLifecycleState: LifecycleState.optional(),
		ohipNumber: OhipNumber,
		participantPreferredName: Name.optional(),
		participantOhipFirstName: Name,
		participantOhipLastName: Name,
		participantOhipMiddleName: Name.optional(),
		dateOfBirth: z.date(),
		phoneNumber: PhoneNumber,
		mailingAddressStreet: z.string().optional(),
		mailingAddressCity: z.string().optional(),
		mailingAddressProvince: Province.optional(),
		mailingAddressPostalCode: PostalCode.optional(),
		residentialPostalCode: PostalCode,
		emailAddress: z.string().email(),
		consentGroup: ConsentGroup,
		guardianName: Name.optional(),
		guardianPhoneNumber: PhoneNumber.optional(),
		guardianEmailAddress: z.string().email().optional(),
		guardianRelationship: Name.optional(),
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

export type ParticipantIdentification = z.infer<typeof ParticipantIdentification>;
