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

import { ParticipantIdentification } from '../../src/entities/index.js';
import { ConsentGroup, LifecycleState, Province } from '../../src/entities/fields/index.js';

describe('ParticipantIdentification', () => {
	it('should validate if all optional field are present for a guardian-specific ConsentGroup', () => {
		const result = ParticipantIdentification.safeParse({
			id: 'CVCFbeKH2Njl1G41vCQme',
			inviteId: 'CVCFbeKH2Njl1G41vCQre',
			currentLifecycleState: LifecycleState.enum.REGISTERED,
			previousLifecycleState: LifecycleState.enum.IN_PROCESSING,
			ohipNumber: '1234567890',
			participantPreferredName: 'Homer',
			participantOhipFirstName: 'Homer',
			participantOhipLastName: 'Simpson',
			participantOhipMiddleName: 'J',
			dateOfBirth: new Date(),
			participantPhoneNumber: '6471234567',
			mailingAddressStreet: 'Evergreen Terrace',
			mailingAddressCity: 'Springfield',
			mailingAddressProvince: Province.enum.ONTARIO,
			mailingAddressPostalCode: 'M1M3M4',
			residentialPostalCode: 'M1M3M4',
			participantEmailAddress: 'homer@example.com',
			consentGroup: ConsentGroup.enum.ADULT_CONSENT_SUBSTITUTE_DECISION_MAKER,
			guardianName: 'Marge Simpson',
			guardianPhoneNumber: '6471234567',
			guardianEmailAddress: 'marge@example.com',
			guardianRelationship: 'Wife',
			keycloakId: '7327526f-a873-40eb-9c17-13ee7e5cb0db'
		});
		expect(result.success).true;
	});
	it('Should validate if ALL guardian fields are present for a guardian-specific ConsentGroup', () => {
		const result = ParticipantIdentification.safeParse({
			id: 'CVCFbeKH2Njl1G41vCQme',
			currentLifecycleState: LifecycleState.enum.REGISTERED,
			ohipNumber: '1234567890',
			participantPreferredName: 'Homer',
			participantOhipFirstName: 'Homer',
			participantOhipLastName: 'Simpson',
			dateOfBirth: new Date(),
			participantPhoneNumber: '6471234567',
			residentialPostalCode: 'T4B0V7',
			participantEmailAddress: 'homer.simpson@example.com',
			consentGroup: ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR,
			guardianName: 'Marge Simpson',
			guardianPhoneNumber: '1234567890',
			guardianEmailAddress: 'marge.simpson@example.com',
			guardianRelationship: 'Wife',
			keycloakId: '7327526f-a873-40eb-9c17-13ee7e5cb0db'
		});
		expect(result.success).true;
	});
	it('Should fail to validate if all guardian fields are NOT present for a guardian-specific ConsentGroup', () => {
		const result = ParticipantIdentification.safeParse({
			id: 'CVCFbeKH2Njl1G41vCQme',
			ohipNumber: '1234567890',
			currentLifecycleState: LifecycleState.enum.REGISTERED,
			participantPreferredName: 'Homer',
			participantOhipFirstName: 'Homer',
			participantOhipLastName: 'Simson',
			dateOfBirth: new Date(),
			participantPhoneNumber: '6471234567',
			residentialPostalCode: 'T4B0V7',
			participantEmailAddress: 'homer.simpson@example.com',
			consentGroup: ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR, // missing all guardian contact fields
		});
		expect(result.success).false;
	});
	it('Should fail to validate if ONE guardian field is NOT present for a guardian-specific ConsentGroup', () => {
		const result = ParticipantIdentification.safeParse({
			id: 'CVCFbeKH2Njl1G41vCQme',
			ohipNumber: '1234567890',
			currentLifecycleState: LifecycleState.enum.REGISTERED,
			participantPreferredName: 'Homer',
			participantOhipFirstName: 'Homer',
			participantOhipLastName: 'Simson',
			dateOfBirth: new Date(),
			participantPhoneNumber: '6471234567',
			residentialPostalCode: 'T4B0V7',
			participantEmailAddress: 'homer.simpson@example.com',
			consentGroup: ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR,
			guardianName: 'Marge Simpson',
			guardianPhoneNumber: '1234567890',
			guardianRelationship: 'Wife', // missing guardianEmailAddress
		});
		expect(result.success).false;
	});
	it('Should fail to validate if SOME guardian fields are NOT present for a guardian-specific ConsentGroup', () => {
		const result = ParticipantIdentification.safeParse({
			id: 'CVCFbeKH2Njl1G41vCQme',
			ohipNumber: '1234567890',
			currentLifecycleState: LifecycleState.enum.REGISTERED,
			participantPreferredName: 'Homer',
			participantOhipFirstName: 'Homer',
			participantOhipLastName: 'Simson',
			dateOfBirth: new Date(),
			participantPhoneNumber: '6471234567',
			residentialPostalCode: 'T4B0V7',
			participantEmailAddress: 'homer.simpson@example.com',
			consentGroup: ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT,
			guardianName: 'Marge Simpson',
			guardianRelationship: 'Wife', // missing guardianPhoneNumber and guardianEmailAddress
		});
		expect(result.success).false;
	});
});
