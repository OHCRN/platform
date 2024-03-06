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

import { GeneratePdfParams } from './types';

// MOCK DATA
// properties starting with mock = unknown property name
export const mockDataGuardian: GeneratePdfParams = {
	consentGroup: 'GUARDIAN_CONSENT_OF_MINOR',
	currentLifecycleState: 'CONSENTED',
	guardianName: 'Marge Simpson',
	isGuardian: true,
	mockDate: new Date(),
	mockSignatureImage: 'testing',
	participantFirstName: 'Lisa',
	participantLastName: 'Simpson',
	RECONTACT__FUTURE_RESEARCH: false,
	RECONTACT__SECONDARY_CONTACT: false,
	RESEARCH_PARTICIPATION__CONTACT_INFORMATION: false,
	RESEARCH_PARTICIPATION__FUTURE_RESEARCH: false,
};

export const mockDataParticipant: GeneratePdfParams = {
	consentGroup: 'ADULT_CONSENT',
	currentLifecycleState: 'CONSENTED',
	guardianName: undefined,
	isGuardian: false,
	mockDate: new Date(),
	mockSignatureImage: 'testing',
	participantFirstName: 'Homer',
	participantLastName: 'Simpson',
	RECONTACT__FUTURE_RESEARCH: true,
	RECONTACT__SECONDARY_CONTACT: true,
	RESEARCH_PARTICIPATION__CONTACT_INFORMATION: true,
	RESEARCH_PARTICIPATION__FUTURE_RESEARCH: true,
};

export const mockDataSubstitute: GeneratePdfParams = {
	consentGroup: 'ADULT_CONSENT_SUBSTITUTE_DECISION_MAKER',
	currentLifecycleState: 'CONSENTED',
	guardianName: 'Homer Simpson',
	isGuardian: true,
	mockDate: new Date(),
	mockSignatureImage: 'testing',
	participantFirstName: 'Abraham',
	participantLastName: 'Simpson',
	RECONTACT__FUTURE_RESEARCH: false,
	RECONTACT__SECONDARY_CONTACT: false,
	RESEARCH_PARTICIPATION__CONTACT_INFORMATION: false,
	RESEARCH_PARTICIPATION__FUTURE_RESEARCH: false,
};
