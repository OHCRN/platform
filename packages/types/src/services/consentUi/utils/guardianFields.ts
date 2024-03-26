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
	RegisterRequestParticipantPhoneNumberField,
	RegisterRequestEmailAddressFields,
	RegisterRequestGuardianFields,
} from '../requests/Register.js';
import { hasValue, isEmptyOrUndefined } from '../../../common/index.js';
import { addZodCustomError } from './index.js';

/**
 * Checks if a Participant schema object contains the required Guardian contact fields needed for the user's guardian status.
 * Use with superRefine because it supports validating and adding errors to multiple fields.
 *
 * guardianName, guardianPhoneNumber, guardianRelationship must be defined if isGuardian was selected.
 * These fields must be undefined if isGuardian is not selected.
 * @param props guardianName, guardianPhoneNumber, guardianRelationship, isGuardian
 * @param ctx Zod refinement context
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
				addZodCustomError(ctx, key, 'guardianInfoMissing');
			}
		});
	} else {
		Object.entries(fields).forEach(([key, value]) => {
			if (hasValue(value)) {
				addZodCustomError(ctx, key, 'participantHasGuardianInfo');
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
 */
export const hasRequiredRegistrationEmailForGuardianStatus = (
	props: RegisterRequestEmailAddressFields,
	ctx: z.RefinementCtx,
) => {
	const { isGuardian, guardianEmailAddress, participantEmailAddress } = props;

	if (isGuardian) {
		if (isEmptyOrUndefined(guardianEmailAddress)) {
			addZodCustomError(ctx, 'guardianEmailAddress', 'guardianEmailMissing');
		}
		if (hasValue(participantEmailAddress)) {
			addZodCustomError(ctx, 'participantEmailAddress', 'guardianHasParticipantEmail');
		}
	} else {
		if (isEmptyOrUndefined(participantEmailAddress)) {
			addZodCustomError(ctx, 'participantEmailAddress', 'participantEmailMissing');
		}
		if (hasValue(guardianEmailAddress)) {
			addZodCustomError(ctx, 'guardianEmailAddress', 'participantHasGuardianEmail');
		}
	}
};

/**
 * Checks if a Participant schema object contains a participantPhoneNumber.
 * This field is required for participants and not allowed for guardians.
 * Use with superRefine because it supports validating and adding errors to multiple fields.
 * @param props isGuardian, participantPhoneNumber
 * @param ctx Zod refinement context
 */
export const hasRequiredRegistrationPhoneNumberForGuardianStatus = (
	props: RegisterRequestParticipantPhoneNumberField,
	ctx: z.RefinementCtx,
) => {
	const { isGuardian, participantPhoneNumber } = props;
	if (isGuardian) {
		if (hasValue(participantPhoneNumber)) {
			addZodCustomError(ctx, 'participantPhoneNumber', 'guardianHasParticipantPhoneNumber');
		}
	} else {
		if (isEmptyOrUndefined(participantPhoneNumber)) {
			addZodCustomError(ctx, 'participantPhoneNumber', 'participantMissingPhoneNumber');
		}
	}
};
