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

import { GenerateConsentPdfParams } from './types';

// properties starting with mock = unknown property name/type/schema

export const mockDataGuardian: GenerateConsentPdfParams = {
	consentGroup: 'GUARDIAN_CONSENT_OF_MINOR',
	currentLifecycleState: 'CONSENTED',
	guardianName: 'Marge Simpson',
	mockDate: new Date(),
	mockSignatureImage: 'http://localhost:3000/assets/images/placeholder-signature.png',
	participantOhipFirstName: 'Lisa',
	participantOhipLastName: 'Simpson',
	RECONTACT__FUTURE_RESEARCH: false,
	RECONTACT__SECONDARY_CONTACT: true,
	relationshipToParticipant: 'Mother',
	RESEARCH_PARTICIPATION__CONTACT_INFORMATION: false,
	RESEARCH_PARTICIPATION__FUTURE_RESEARCH: true,
};

export const mockDataParticipant: GenerateConsentPdfParams = {
	consentGroup: 'ADULT_CONSENT',
	currentLifecycleState: 'CONSENTED',
	guardianName: undefined,
	mockDate: new Date(),
	mockSignatureImage: 'http://localhost:3000/assets/images/placeholder-signature.png',
	participantOhipFirstName: 'Homer',
	participantOhipLastName: 'Simpson',
	RECONTACT__FUTURE_RESEARCH: true,
	RECONTACT__SECONDARY_CONTACT: true,
	relationshipToParticipant: undefined,
	RESEARCH_PARTICIPATION__CONTACT_INFORMATION: true,
	RESEARCH_PARTICIPATION__FUTURE_RESEARCH: true,
};

export const mockDataSubstitute: GenerateConsentPdfParams = {
	consentGroup: 'ADULT_CONSENT_SUBSTITUTE_DECISION_MAKER',
	currentLifecycleState: 'CONSENTED',
	guardianName: 'Homer Simpson',
	mockDate: new Date(),
	mockSignatureImage: 'http://localhost:3000/assets/images/placeholder-signature.png',
	participantOhipFirstName: 'Abraham',
	participantOhipLastName: 'Simpson',
	RECONTACT__FUTURE_RESEARCH: false,
	RECONTACT__SECONDARY_CONTACT: false,
	relationshipToParticipant: 'Son',
	RESEARCH_PARTICIPATION__CONTACT_INFORMATION: false,
	RESEARCH_PARTICIPATION__FUTURE_RESEARCH: false,
};
