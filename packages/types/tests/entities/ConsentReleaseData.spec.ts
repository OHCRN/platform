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
				firstName: 'Homer',
				lastName: 'Simpson',
				genderIdentity: Gender.enum.MAN,
				ohipNumber: '1234567890',
				dateOfBirth: '1956-07-12',
				birthSex: BirthSex.enum.MALE,
				ancestry: Ancestry.enum.AMERICAN,
				historyOfCancer: HistoryOfCancer.enum.NO,
				familyHistoryOfCancer: HistoryOfCancer.enum.YES,
				residentialPostalCode: 'L5V5G3',
				selfReportedClinicianTitle: 'Doctor',
				selfReportedClinicianFirstName: 'Jerry',
				selfReportedClinicianLastName: 'Seinfeld',
				selfReportedGeneticsClinic:
					GeneticsClinic.enum.CHILDRENS_HOSPITAL_OF_EASTERN_ONTARIO_OTTAWA,
				selfReportedMolecularLab: MolecularLab.enum.CHILDRENS_HOSPITAL_OF_EASTERN_ONTARIO_OTTAWA,
			}).success,
		).true;
	});
	it('Must contain a valid date of birth', () => {
		expect(
			ConsentReleaseDataBase.safeParse({
				[ConsentQuestionId.enum.RELEASE_DATA__CLINICAL_AND_GENETIC]: true,
				[ConsentQuestionId.enum.RELEASE_DATA__DE_IDENTIFIED]: false,
				firstName: 'Homer',
				lastName: 'Simpson',
				genderIdentity: Gender.enum.MAN,
				ohipNumber: '1234567890',
				dateOfBirth: 'Invalid date', // not a date
				birthSex: BirthSex.enum.MALE,
				ancestry: Ancestry.enum.AMERICAN,
				historyOfCancer: HistoryOfCancer.enum.NO,
				familyHistoryOfCancer: HistoryOfCancer.enum.YES,
				residentialPostalCode: 'L5V5G3',
			}).success,
		).false;
	});
});
