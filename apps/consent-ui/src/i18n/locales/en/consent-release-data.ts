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

import { ConsentReleaseDataQuestion } from 'types/entities';

const dictionary = {
	[ConsentReleaseDataQuestion.enum.RELEASE_DATA__FIRST_NAME]: 'First Name',
	[ConsentReleaseDataQuestion.enum.RELEASE_DATA__LAST_NAME]: 'Last Name',
	[ConsentReleaseDataQuestion.enum.RELEASE_DATA__GENDER_IDENTITY]: 'Gender Identity',
	[ConsentReleaseDataQuestion.enum.RELEASE_DATA__OHIP_NUMBER]: 'OHIP #',
	[ConsentReleaseDataQuestion.enum.RELEASE_DATA__DATE_OF_BIRTH]: 'Date of Birth',
	[ConsentReleaseDataQuestion.enum.RELEASE_DATA__BIRTH_SEX]: 'Sex Assigned at Birth',
	[ConsentReleaseDataQuestion.enum.RELEASE_DATA__ANCESTRY]: 'Ancestry',
	[ConsentReleaseDataQuestion.enum.RELEASE_DATA__HISTORY_OF_CANCER]: 'Personal History of Cancer?',
	[ConsentReleaseDataQuestion.enum.RELEASE_DATA__PRIMARY_CANCER_DIAGNOSIS]: 'Primary Cancer Diagnosis',
	[ConsentReleaseDataQuestion.enum.RELEASE_DATA__FAMILY_HISTORY_OF_CANCER]: 'Family History of Cancer?',
	[ConsentReleaseDataQuestion.enum.RELEASE_DATA__RESIDENTIAL_POSTAL_CODE]: 'Postal Code',
	[ConsentReleaseDataQuestion.enum.RELEASE_DATA__SELF_REPORTED_CLINICIAN_TITLE]: 'Clinician Title',
	[ConsentReleaseDataQuestion.enum.RELEASE_DATA__SELF_REPORTED_CLINICIAN_FIRST_NAME]:
		'Clinician First Name',
	[ConsentReleaseDataQuestion.enum.RELEASE_DATA__SELF_REPORTED_CLINICIAN_LAST_NAME]: 'Clinician Last Name',
	[ConsentReleaseDataQuestion.enum.RELEASE_DATA__SELF_REPORTED_GENETICS_CLINIC]: 'Genetics Clinic',
	[ConsentReleaseDataQuestion.enum.RELEASE_DATA__SELF_REPORTED_MOLECULAR_LAB]: 'Molecular Lab',
} satisfies Record<string, string>;

export type ConsentReleaseDataDictionary = Record<keyof typeof dictionary, string>;

export default dictionary;
