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
	RegisterFormStep2Fields,
	RegisterRequestGuardianFields,
} from '../../services/consentUi/requests/Register.js';
import { isEmptyOrUndefined } from '../../common/index.js';

import { addZodIssue } from './common.js';
/**
 * Checks if a Participant schema object contains the required Guardian contact fields needed for the user's guardian status.
 * Use with superRefine because it supports validating and adding errors to multiple fields.
 *
 * guardianName, guardianPhoneNumber, guardianRelationship must be defined if isGuardian was selected
 * @param props guardianName, guardianPhoneNumber, guardianRelationship, isGuardian
 * @param ctx Zod refinement context
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
				addZodIssue(ctx, key, 'guardianInfoMissing');
			}
		});
	}
};

/**
 * Checks if a Participant schema object contains the required email address for the user's consent group.
 * Guardians must have guardianEmailAddress and can't have a participantEmailAddress.
 * Participants must have participantEmailAddress and can't have guardianEmailAddress.
 * Use with superRefine because it supports validating and adding errors to multiple fields.
 * @param props isGuardian, guardianEmailAddress, participantEmailAddress
 * @param ctx Zod refinement context
 * @returns {boolean} returns true if appropriate fields are present
 */
export const hasRequiredEmailForConsentGroupForRegistration = (
	props: RegisterFormStep2Fields,
	ctx: z.RefinementCtx,
) => {
	const { isGuardian, guardianEmailAddress, participantEmailAddress } = props;

	if (isGuardian) {
		if (isEmptyOrUndefined(guardianEmailAddress)) {
			addZodIssue(ctx, 'guardianEmailAddress', 'guardianEmailMissing');
		}
		if (!isEmptyOrUndefined(participantEmailAddress)) {
			addZodIssue(ctx, 'participantEmailAddress', 'guardianHasParticipantEmail');
		}
	} else {
		if (isEmptyOrUndefined(participantEmailAddress)) {
			addZodIssue(ctx, 'participantEmailAddress', 'participantEmailMissing');
		}
		if (!isEmptyOrUndefined(guardianEmailAddress)) {
			addZodIssue(ctx, 'guardianEmailAddress', 'participantHasGuardianEmail');
		}
	}
};
