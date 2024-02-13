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

import formTooltips from './formTooltips';

const {
	participantFirstNameTooltip,
	participantLastNameTooltip,
	participantMiddleNameTooltip,
	participantPreferredNameTooltip,
	residentialPostalCodeTooltip,
	clinicianTitleOrRoleTooltip,
} = formTooltips;

const dictionary = {
	releaseAndUpdateData:
		'I agree to the release and update of clinical and genetic data obtained from applicable institutions and provided by the patient, to be stored within OHCRN.',
	deIdentifiedResearch:
		'I agree to the use my registry data in de-identified research (including display of aggregate data on OHCRN website and research facilitated by longitudinal linkage to administrative health databases.) ',
	deIdentifiedResearchLink: 'Learn more about privacy and de-identified information.',
	sectionDescription: 'To make this possible, we will need the following information from you:',
	participantFirstNameTooltip,
	participantLastNameTooltip,
	participantMiddleNameTooltip,
	participantPreferredNameTooltip,
	ohipTooltip:
		'Enter the first 10 digits of your green health card. We require this in order to access your lab reports.',
	ohipCheckboxText: 'I do not have an Ontario health card.',
	dateOfBirthTooltip: 'We require this to request your clinical information.',
	sexAssignedAtBirthTooltip:
		'Sex assigned at birth can help improve our understanding of cancer causes and risks.',
	primaryCancerDiagnosisTooltip: 'You may select multiple cancers you have been diagnosed with.',
	familyHistoryOfCancerTooltip:
		'Select yes only if the family member is: parent, sibling, child, aunt/uncle, or grandparents.',
	residentialPostalCodeTooltip,
	sectionDescription2:
		'OHCRN is open to participants who have had genetic testing. Please tell us about where your testing was completed:',
	clinicianTitleOrRoleTooltip,
	molecularLabNameTooltip:
		'Please provide the name of the lab that did your genetic testing, if you know this.',
} satisfies Record<string, string>;

export type ConsentReleaseDataTextDictionary = Record<keyof typeof dictionary, string>;

export default dictionary;
