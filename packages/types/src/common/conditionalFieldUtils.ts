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

import { ConsentGroup } from '../entities/fields/index.js';
import { GuardianBaseFields, ParticipantContactFields } from '../entities/index.js';

const {
	GUARDIAN_CONSENT_OF_MINOR,
	GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT,
	ADULT_CONSENT_SUBSTITUTE_DECISION_MAKER,
	ADULT_CONSENT,
	YOUNG_ADULT_CONSENT,
} = ConsentGroup.enum;

const requiresGuardianInformation = (consentGroup: ConsentGroup) => {
	const consentOptions: ConsentGroup[] = [
		GUARDIAN_CONSENT_OF_MINOR,
		GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT,
		ADULT_CONSENT_SUBSTITUTE_DECISION_MAKER,
	];
	return consentOptions.includes(consentGroup);
};

const requiresParticipantContactInfo = (consentGroup: ConsentGroup) => {
	const consentOptions: ConsentGroup[] = [ADULT_CONSENT, YOUNG_ADULT_CONSENT];
	return consentOptions.includes(consentGroup);
};

const isUndefined = (arg: any): arg is undefined => arg === undefined;
type EmptyString = '';
const isEmptyString = (arg: any): arg is EmptyString => arg === ''; // empty HTML text inputs contain empty strings
const hasValue = <T>(input: T | undefined): input is T =>
	!isUndefined(input) && !isEmptyString(input);

// TODO: decide if participant contact fields will be excluded in a guardian is present
// TBD in https://github.com/OHCRN/platform/issues/388
/**
 * Checks if a Participant schema object contains the required Participant contact fields needed for the ConsentGroup
 *
 * participantEmailAddress and participantPhoneNumber must be defined if ADULT_CONSENT or YOUNG_ADULT_CONSENT was selected
 * @param props consentGroup, participantEmailAddress, participantPhoneNumber
 * @returns {boolean} returns true if all required fields are present
 *
 */
export const hasRequiredParticipantContactInfo = (
	props: {
		consentGroup: ConsentGroup;
	} & ParticipantContactFields,
) => {
	const { consentGroup, participantEmailAddress, participantPhoneNumber } = props;
	return requiresParticipantContactInfo(consentGroup)
		? [participantEmailAddress, participantPhoneNumber].every(hasValue)
		: true;
};

/**
 * Checks if a Participant schema object contains the required Guardian contact fields needed for the ConsentGroup
 *
 * guardianName, guardianPhoneNumber, guardianEmailAddress, guardianRelationship must be defined if
 * GUARDIAN_CONSENT_OF_MINOR, GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT or ADULT_CONSENT_SUBSTITUTE_DECISION_MAKER was selected
 * @param props guardianName, guardianPhoneNumber, guardianEmailAddress, guardianRelationship, consentGroup
 * @returns {boolean} returns true if all required fields are present
 */
export const hasRequiredGuardianInformation = (
	props: {
		consentGroup: ConsentGroup;
	} & GuardianBaseFields,
) => {
	const {
		consentGroup,
		guardianName,
		guardianPhoneNumber,
		guardianEmailAddress,
		guardianRelationship,
	} = props;

	return requiresGuardianInformation(consentGroup)
		? [guardianName, guardianPhoneNumber, guardianEmailAddress, guardianRelationship].every(
				hasValue,
		  )
		: true;
};

/**
 * Checks if a Participant schema object contains the required Guardian contact fields needed for the user's guardian status
 *
 * guardianName, guardianPhoneNumber, guardianRelationship must be defined if isGuardian was selected
 * @param props guardianName, guardianPhoneNumber, guardianRelationship, isGuardian
 * @returns {boolean} returns true if all required fields are present
 */
export const registerHasRequiredGuardianInfo = (
	props: {
		isGuardian: boolean;
	} & Omit<GuardianBaseFields, 'guardianEmailAddress'>,
) => {
	const { guardianName, guardianPhoneNumber, guardianRelationship, isGuardian } = props;

	return isGuardian
		? [guardianName, guardianPhoneNumber, guardianRelationship].every(hasValue)
		: true;
};
