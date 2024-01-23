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
	return (
		consentGroup === GUARDIAN_CONSENT_OF_MINOR ||
		consentGroup === GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT ||
		consentGroup === ADULT_CONSENT_SUBSTITUTE_DECISION_MAKER
	);
};

const requiresParticipantContactInfo = (consentGroup: ConsentGroup) => {
	return consentGroup === ADULT_CONSENT || consentGroup === YOUNG_ADULT_CONSENT;
};

const isUndefined = (arg: any): arg is undefined => arg === undefined;

// TODO: decide if participant contact fields will be excluded in a guardian is present
// TBD in https://github.com/OHCRN/platform/issues/388
export const hasRequiredParticipantContactInfo = (
	props: {
		consentGroup: ConsentGroup;
	} & ParticipantContactFields,
) => {
	const { consentGroup, participantEmailAddress, participantPhoneNumber } = props;
	return requiresParticipantContactInfo(consentGroup)
		? [participantEmailAddress, participantPhoneNumber].every((field) => !isUndefined(field))
		: true;
};

export const hasRequiredGuardianInformation = (
	props: {
		consentGroup: ConsentGroup;
	} & GuardianBaseFields,
) => {
	// guardianName, guardianPhoneNumber, guardianEmailAddress, guardianRelationship must be defined if
	// GUARDIAN_CONSENT_OF_MINOR, GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT or ADULT_CONSENT_SUBSTITUTE_DECISION_MAKER was selected

	const {
		consentGroup,
		guardianName,
		guardianPhoneNumber,
		guardianEmailAddress,
		guardianRelationship,
	} = props;

	return requiresGuardianInformation(consentGroup)
		? [guardianName, guardianPhoneNumber, guardianEmailAddress, guardianRelationship].every(
				(field) => !isUndefined(field),
			)
		: true;
};
