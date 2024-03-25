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
	InviteGuardianFields,
	ConsentGroup,
	ParticipantContactFields,
} from '../../entities/index.js';
import { RegisterRequestGuardianFields } from '../../services/consentUi/requests/Register.js';
import { addZodCustomError, hasValue, isEmptyOrUndefined } from '../../common/index.js';

const consentGroupsRequiringGuardian: ConsentGroup[] = [
	ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR,
	ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT,
	ConsentGroup.enum.ADULT_CONSENT_SUBSTITUTE_DECISION_MAKER,
];

/**
 * Checks an invite schema object.
 * If the consent group requires a guardian, then the guardian fields must be defined,
 * while participant contact fields must be undefined.
 * If the consent group does not require a guardian, then the guardian fields must be undefined,
 * while participant contact fields must be defined.
 * Use with superRefine because it supports validating and adding errors to multiple fields.
 * @param props guardianName, guardianPhoneNumber, guardianRelationship, isGuardian
 * @returns {boolean} returns true if all required fields are present
 */
export const hasRequiredGuardianAndParticipantInfoForInvite = (
	props: InviteGuardianFields & ParticipantContactFields & { consentGroup: ConsentGroup },
	ctx: z.RefinementCtx,
) => {
	const {
		guardianName,
		guardianPhoneNumber,
		guardianEmailAddress,
		guardianRelationship,
		participantEmailAddress,
		participantPhoneNumber,
		consentGroup,
	} = props;

	const guardianFields = {
		guardianName,
		guardianPhoneNumber,
		guardianEmailAddress,
		guardianRelationship,
	};
	const partipantContactFields = { participantEmailAddress, participantPhoneNumber };

	const guardianRequired = consentGroupsRequiringGuardian.includes(consentGroup);
	if (guardianRequired) {
		Object.entries(guardianFields).forEach(([key, value]) => {
			if (isEmptyOrUndefined(value?.trim())) {
				addZodCustomError(ctx, key, 'guardianInfoMissing');
			}
		});

		Object.entries(partipantContactFields).forEach(([key, value]) => {
			if (hasValue(value)) {
				addZodCustomError(ctx, key, 'hasParticipantInfo');
			}
		});
	} else {
		Object.entries(guardianFields).forEach(([key, value]) => {
			if (hasValue(value)) {
				addZodCustomError(ctx, key, 'hasGuardianInfo');
			}
		});

		Object.entries(partipantContactFields).forEach(([key, value]) => {
			if (isEmptyOrUndefined(value?.trim())) {
				addZodCustomError(ctx, key, 'participantInfoMissing');
			}
		});
	}
};

/**
 * Checks if a Participant schema object contains the required Guardian contact fields needed for the user's guardian status.
 * Use with superRefine because it supports validating and adding errors to multiple fields.
 *
 * guardianName, guardianPhoneNumber, guardianRelationship must be defined if isGuardian was selected
 * @param props guardianName, guardianPhoneNumber, guardianRelationship, isGuardian
 * @returns {boolean} returns true if all required fields are present
 */
export const hasRequiredGuardianInfoForRegistration = (
	props: RegisterRequestGuardianFields,
	ctx: z.RefinementCtx,
) => {
	const { guardianName, guardianPhoneNumber, guardianRelationship, isGuardian } = props;

	const fields = { guardianName, guardianPhoneNumber, guardianRelationship };

	if (isGuardian) {
		Object.entries(fields).forEach(([key, value]) => {
			if (isEmptyOrUndefined(value?.trim())) {
				ctx.addIssue({
					code: 'custom',
					message: 'guardianInfoMissing',
					path: [key],
				});
			}
		});
	}
};
