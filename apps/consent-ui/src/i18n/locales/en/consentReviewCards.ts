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

import common from './common';
import formLabels from './formLabels';

const { edit } = common;
const {
	ancestry,
	cancerDiagnosis,
	clinician,
	dateOfBirth,
	familyHistoryOfCancer,
	genderIdentity,
	geneticsClinic,
	molecularLab,
	nameOnOhip,
	ohipNumber,
	personalHistoryOfCancer,
	phone,
	postalCode,
	preferredName,
	secondaryContact,
	sexAssignedAtBirth,
} = formLabels;

const dictionary = {
	agree: 'I agree',
	ancestry,
	biobankTitle: 'Optional Decentralized Biobank',
	biobankDescription:
		'that my previously collected samples (tissue/blood/DNA samples) may be used for unknown future research studies.',
	cancerDiagnosis,
	clinician,
	dateOfBirth,
	deidentifiedParticipationTitle: 'De-Identified Research Participation',
	deidentifiedParticipationDescription:
		'to participate in de-identified research (including ethics approved research projects and research facilitated by longitudinal linkage to administrative health databases).',
	deidentifiedParticipationLink: 'Learn more about privacy and de-identified information.',
	doNotAgree: 'I do not agree',
	edit,
	familyHistoryOfCancer,
	genderIdentity,
	geneticsClinic,
	molecularLab,
	nameOnOhip,
	ohipNumber,
	personalHistoryOfCancer,
	phone,
	postalCode,
	preferredName,
	recontactTitle: 'Optional Re-Contact',
	recontactDescription:
		'that my study doctor, or someone on the study team, may contact me or my doctor via email or phone call about unknown future research studies, clinical trials and surveys.',
	releaseContactTitle: 'Optional Release of Contact Information',
	releaseContactDescription:
		'that OHCRN, may provide my contact information and genetic test results to an existing cancer registry, if applicable.',
	releaseContactLink: 'Click here to view current list of approved cancer registries.',
	releaseHealthDataTitle: 'Release of Health Data',
	releaseHealthDataDescription:
		'to the release and update of clinical and genetic data obtained from applicable institutions and provided by the patient, to be stored within OHCRN.',
	secondaryContact,
	secondaryContactTitle: 'Optional Secondary Contact',
	secondaryContactDescription:
		'that my study doctor, or someone on the study team, may contact my next of kin or secondary contact for updates to your health information if attempts to contact you have not been successful.',
	sexAssignedAtBirth,
} satisfies Record<string, string>;

export type ConsentReviewCardsDictionary = Record<keyof typeof dictionary, string>;

export default dictionary;
