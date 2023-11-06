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

import { expect } from 'chai';

import {
	Ancestry,
	BirthSex,
	ConsentQuestionId,
	ConsentReleaseDataFieldName,
	ConsentReleaseDataBase,
	Gender,
	HistoryOfCancer,
	GeneticsClinic,
	MolecularLab,
} from '../../src/entities/index.js';

describe('ConsentReleaseDataBase', () => {
	it('Must provide valid instances of each field', () => {
		expect(
			ConsentReleaseDataBase.safeParse({
				[ConsentQuestionId.enum.RELEASE_DATA__CLINICAL_AND_GENETIC]: true,
				[ConsentQuestionId.enum.RELEASE_DATA__DE_IDENTIFIED]: false,
				[ConsentReleaseDataFieldName.enum.RELEASE_DATA__FIRST_NAME]: 'Homer',
				[ConsentReleaseDataFieldName.enum.RELEASE_DATA__LAST_NAME]: 'Simpson',
				[ConsentReleaseDataFieldName.enum.RELEASE_DATA__GENDER_IDENTITY]: Gender.enum.MAN,
				[ConsentReleaseDataFieldName.enum.RELEASE_DATA__OHIP_NUMBER]: '1234567890',
				[ConsentReleaseDataFieldName.enum.RELEASE_DATA__DATE_OF_BIRTH]: '1956-07-12',
				[ConsentReleaseDataFieldName.enum.RELEASE_DATA__BIRTH_SEX]: BirthSex.enum.MALE,
				[ConsentReleaseDataFieldName.enum.RELEASE_DATA__ANCESTRY]: Ancestry.enum.AMERICAN,
				[ConsentReleaseDataFieldName.enum.RELEASE_DATA__HISTORY_OF_CANCER]: HistoryOfCancer.enum.NO,
				[ConsentReleaseDataFieldName.enum.RELEASE_DATA__FAMILY_HISTORY_OF_CANCER]:
					HistoryOfCancer.enum.YES,
				[ConsentReleaseDataFieldName.enum.RELEASE_DATA__RESIDENTIAL_POSTAL_CODE]: 'L5V5G3',
				[ConsentReleaseDataFieldName.enum.RELEASE_DATA__SELF_REPORTED_CLINICIAN_TITLE]: 'Doctor',
				[ConsentReleaseDataFieldName.enum.RELEASE_DATA__SELF_REPORTED_CLINICIAN_FIRST_NAME]:
					'Jerry',
				[ConsentReleaseDataFieldName.enum.RELEASE_DATA__SELF_REPORTED_CLINICIAN_LAST_NAME]:
					'Seinfeld',
				[ConsentReleaseDataFieldName.enum.RELEASE_DATA__SELF_REPORTED_GENETICS_CLINIC]:
					GeneticsClinic.enum.CHILDRENS_HOSPITAL_OF_EASTERN_ONTARIO_OTTAWA,
				[ConsentReleaseDataFieldName.enum.RELEASE_DATA__SELF_REPORTED_MOLECULAR_LAB]:
					MolecularLab.enum.CHILDRENS_HOSPITAL_OF_EASTERN_ONTARIO_OTTAWA,
			}).success,
		).true;
	});
	it('Must contain a valid date of birth', () => {
		expect(
			ConsentReleaseDataBase.safeParse({
				[ConsentQuestionId.enum.RELEASE_DATA__CLINICAL_AND_GENETIC]: true,
				[ConsentQuestionId.enum.RELEASE_DATA__DE_IDENTIFIED]: false,
				[ConsentReleaseDataFieldName.enum.RELEASE_DATA__FIRST_NAME]: 'Homer',
				[ConsentReleaseDataFieldName.enum.RELEASE_DATA__LAST_NAME]: 'Simpson',
				[ConsentReleaseDataFieldName.enum.RELEASE_DATA__GENDER_IDENTITY]: Gender.enum.MAN,
				[ConsentReleaseDataFieldName.enum.RELEASE_DATA__OHIP_NUMBER]: '1234567890',
				[ConsentReleaseDataFieldName.enum.RELEASE_DATA__DATE_OF_BIRTH]: 'Invalid date', // not a date
				[ConsentReleaseDataFieldName.enum.RELEASE_DATA__BIRTH_SEX]: BirthSex.enum.MALE,
				[ConsentReleaseDataFieldName.enum.RELEASE_DATA__ANCESTRY]: Ancestry.enum.AMERICAN,
				[ConsentReleaseDataFieldName.enum.RELEASE_DATA__HISTORY_OF_CANCER]: HistoryOfCancer.enum.NO,
				[ConsentReleaseDataFieldName.enum.RELEASE_DATA__FAMILY_HISTORY_OF_CANCER]:
					HistoryOfCancer.enum.YES,
				[ConsentReleaseDataFieldName.enum.RELEASE_DATA__RESIDENTIAL_POSTAL_CODE]: 'L5V5G3',
			}).success,
		).false;
	});
});
