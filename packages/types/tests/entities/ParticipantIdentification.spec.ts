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

import { describe, expect, it } from 'vitest';

import { ParticipantIdentification } from '../../src/entities/index.js';
import { ConsentGroup, LifecycleState } from '../../src/entities/fields/index.js';

describe('ParticipantIdentification', () => {
	it('Must define conditionally required fields on condition', () => {
		expect(
			ParticipantIdentification.safeParse({
				id: 'CVCFbeKH2Njl1G41vCQme',
				currentLifecycleState: LifecycleState.enum.REGISTERED,
				ohipNumber: '1234567890',
				participantPreferredName: 'Homer',
				participantOhipFirstName: 'Homer',
				participantOhipLastName: 'Simson',
				dateOfBirth: new Date(),
				phoneNumber: '6471234567',
				residentialPostalCode: 'T4B0V7',
				emailAddress: 'homer.simpson@example.com',
				consentGroup: ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR,
				guardianName: 'Marge Simpson',
				guardianPhoneNumber: '1234567890',
				guardianEmailAddress: 'marge.simpson@example.com',
				guardianRelationship: 'Wife',
			}).success,
		).true;
		expect(
			ParticipantIdentification.safeParse({
				id: 'CVCFbeKH2Njl1G41vCQme',
				ohipNumber: '1234567890',
				currentLifecycleState: LifecycleState.enum.REGISTERED,
				participantPreferredName: 'Homer',
				participantOhipFirstName: 'Homer',
				participantOhipLastName: 'Simson',
				dateOfBirth: new Date(),
				phoneNumber: '6471234567',
				residentialPostalCode: 'T4B0V7',
				emailAddress: 'homer.simpson@example.com',
				consentGroup: ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR, // missing all guardian contact fields
			}).success,
		).false;
		expect(
			ParticipantIdentification.safeParse({
				id: 'CVCFbeKH2Njl1G41vCQme',
				ohipNumber: '1234567890',
				currentLifecycleState: LifecycleState.enum.REGISTERED,
				participantPreferredName: 'Homer',
				participantOhipFirstName: 'Homer',
				participantOhipLastName: 'Simson',
				dateOfBirth: new Date(),
				phoneNumber: '6471234567',
				residentialPostalCode: 'T4B0V7',
				emailAddress: 'homer.simpson@example.com',
				consentGroup: ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR,
				guardianName: 'Marge Simpson',
				guardianPhoneNumber: '1234567890',
				guardianRelationship: 'Wife', // missing guardianEmailAddress
			}).success,
		).false;
		expect(
			ParticipantIdentification.safeParse({
				id: 'CVCFbeKH2Njl1G41vCQme',
				ohipNumber: '1234567890',
				currentLifecycleState: LifecycleState.enum.REGISTERED,
				participantPreferredName: 'Homer',
				participantOhipFirstName: 'Homer',
				participantOhipLastName: 'Simson',
				dateOfBirth: new Date(),
				phoneNumber: '6471234567',
				residentialPostalCode: 'T4B0V7',
				emailAddress: 'homer.simpson@example.com',
				consentGroup: ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT,
				guardianName: 'Marge Simpson',
				guardianRelationship: 'Wife', // missing guardianPhoneNumber and guardianEmailAddress
			}).success,
		).false;
	});
});
