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

import { ConsentGroup, LifecycleState } from 'types/entities';

import { ValidLanguage } from 'src/i18n';

import { GeneratePdfParams } from './types';
import { fieldPropsByLang } from './fieldProps';

// TEMP not final list
export const PDF_CONSENT_GROUPS_WITH_GUARDIAN: ConsentGroup[] = [
	ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR,
	ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT,
	ConsentGroup.enum.YOUNG_ADULT_CONSENT,
];

// TEMP not final list
export const PDF_CONSENT_GROUPS_WITH_SUBSTITUTE: ConsentGroup[] = [
	ConsentGroup.enum.ADULT_CONSENT_SUBSTITUTE_DECISION_MAKER,
];

// TEMP not final list
export const PDF_ALLOWED_LIFECYCLE_STATES: LifecycleState[] = [LifecycleState.enum.CONSENTED];

const generatePdf = async ({
	consentGroup,
	currentLang,
	currentLifecycleState,
	guardianName,
	isGuardian,
	mockDate,
	mockSignatureImage,
	participantFirstName,
	participantLastName,
	RECONTACT__FUTURE_RESEARCH,
	RECONTACT__SECONDARY_CONTACT,
	RESEARCH_PARTICIPATION__CONTACT_INFORMATION,
	RESEARCH_PARTICIPATION__FUTURE_RESEARCH,
}: GeneratePdfParams & { currentLang: ValidLanguage }): Promise<void> => {
	if (!PDF_ALLOWED_LIFECYCLE_STATES.includes(currentLifecycleState)) {
		return;
	}

	const fieldProps = fieldPropsByLang[currentLang];

	// get pdf from URL (use next API for now)
	// put pdf placeholder URL in a dictionary

	// modify PDF

	// serve PDF
};

export default generatePdf;
