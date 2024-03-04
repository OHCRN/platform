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

import { describe, expect, it } from 'vitest';

import {
	hasRequiredGuardianInformation,
	hasRequiredParticipantContactInfo,
} from '../../src/common/index.js';
import { ConsentGroup } from '../../src/entities/index.js';

const mockCompleteGuardianFields = {
	guardianEmailAddress: 'gina_g@example.com',
	guardianName: 'Gina Guardian',
	guardianPhoneNumber: '0123456789',
	guardianRelationship: 'Mother',
};

const mockCompleteParticipantContactFields = {
	participantEmailAddress: 'patti@example.com',
	participantPhoneNumber: '1112223334',
};

describe('Conditional fields utility functions', () => {
	const {
		GUARDIAN_CONSENT_OF_MINOR, // guardian group
		GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT, // guardian group
		ADULT_CONSENT_SUBSTITUTE_DECISION_MAKER, // guardian group
		ADULT_CONSENT, // non-guardian group
		YOUNG_ADULT_CONSENT, // non-guardian group
	} = ConsentGroup.enum;
	describe('hasRequiredGuardianInformation', () => {
		it('returns TRUE for a guardian consentGroup (GUARDIAN_CONSENT_OF_MINOR) and all required guardian fields are provided', () => {
			const testSchemaObj = {
				...mockCompleteGuardianFields,
				consentGroup: GUARDIAN_CONSENT_OF_MINOR,
			};
			const result = hasRequiredGuardianInformation(testSchemaObj);
			expect(result).true;
		});

		it('returns TRUE for a guardian consentGroup (GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT) and all required guardian fields are provided', () => {
			const testSchemaObj = {
				...mockCompleteGuardianFields,
				consentGroup: GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT,
			};
			const result = hasRequiredGuardianInformation(testSchemaObj);
			expect(result).true;
		});

		it('returns TRUE for a guardian consentGroup (ADULT_CONSENT_SUBSTITUTE_DECISION_MAKER) and all required guardian fields are provided', () => {
			const testSchemaObj = {
				...mockCompleteGuardianFields,
				consentGroup: ADULT_CONSENT_SUBSTITUTE_DECISION_MAKER,
			};
			const result = hasRequiredGuardianInformation(testSchemaObj);
			expect(result).true;
		});

		it('returns FALSE for a guardian consentGroup and one required guardian field is NOT provided', () => {
			const guardianFields = {
				guardianName: 'Gina Guardian',
				guardianEmailAddress: 'gina_g@example.com',
				guardianPhoneNumber: '0123456789',
			};
			const testSchemaObj = {
				...guardianFields,
				consentGroup: GUARDIAN_CONSENT_OF_MINOR,
			};
			const result = hasRequiredGuardianInformation(testSchemaObj);
			expect(result).false;
		});

		it('returns FALSE for a guardian consentGroup and several required guardian fields are NOT provided', () => {
			const guardianFields = {
				guardianName: 'Gina Guardian',
			};
			const testSchemaObj = {
				...guardianFields,
				consentGroup: GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT,
			};
			const result = hasRequiredGuardianInformation(testSchemaObj);
			expect(result).false;
		});

		it('returns FALSE for a guardian consentGroup and NO required guardian fields are provided', () => {
			const testSchemaObj = {
				consentGroup: ADULT_CONSENT_SUBSTITUTE_DECISION_MAKER,
			};
			const result = hasRequiredGuardianInformation(testSchemaObj);
			expect(result).false;
		});

		it('returns TRUE for a non-guardian consentGroup and no guardian fields are provided', () => {
			const testSchemaObj = {
				consentGroup: ADULT_CONSENT,
			};
			const result = hasRequiredGuardianInformation(testSchemaObj);
			expect(result).true;
		});
	});

	describe('hasRequiredParticipantContactInfo', () => {
		it('returns TRUE for a non-guardian consentGroup (ADULT_CONSENT) and participant contact fields are provided', () => {
			const testSchemaObj = {
				...mockCompleteParticipantContactFields,
				consentGroup: ADULT_CONSENT,
			};
			const result = hasRequiredParticipantContactInfo(testSchemaObj);
			expect(result).true;
		});

		it('returns TRUE for a non-guardian (YOUNG_ADULT_CONSENT) and participant contact fields are provided', () => {
			const testSchemaObj = {
				...mockCompleteParticipantContactFields,
				consentGroup: YOUNG_ADULT_CONSENT,
			};
			const result = hasRequiredParticipantContactInfo(testSchemaObj);
			expect(result).true;
		});

		it('returns FALSE for a non-guardian consentGroup and one participant contact field is NOT provided', () => {
			const participantContactFields = {
				participantEmailAddress: 'patti@example.com',
			};
			const testSchemaObj = {
				...participantContactFields,
				consentGroup: ADULT_CONSENT,
			};
			const result = hasRequiredParticipantContactInfo(testSchemaObj);
			expect(result).false;
		});

		it('returns FALSE for a non-guardian consentGroup and all participant contact fields are NOT provided', () => {
			const testSchemaObj = {
				consentGroup: YOUNG_ADULT_CONSENT,
			};
			const result = hasRequiredParticipantContactInfo(testSchemaObj);
			expect(result).false;
		});

		it('returns TRUE for a guardian consentGroup and participant contact fields are NOT provided', () => {
			const testSchemaObj = {
				consentGroup: GUARDIAN_CONSENT_OF_MINOR,
			};
			const result = hasRequiredParticipantContactInfo(testSchemaObj);
			expect(result).true;
		});

		it('returns TRUE for a guardian consentGroup and participant contact fields are provided', () => {
			const testSchemaObj = {
				...mockCompleteParticipantContactFields,
				consentGroup: GUARDIAN_CONSENT_OF_MINOR,
			};
			const result = hasRequiredParticipantContactInfo(testSchemaObj);
			expect(result).true;
		});
	});
});
