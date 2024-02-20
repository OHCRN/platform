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

import { z } from 'zod';

import { OptionalString } from '../common/String.js';

import { ConsentQuestionId } from './ConsentQuestion.js';
import {
	Ancestry,
	BirthSex,
	Gender,
	GeneticsClinic,
	HistoryOfCancer,
	MolecularLab,
	Name,
	OhipNumber,
	OptionalName,
	PostalCode,
} from './fields/index.js';

const { RELEASE_DATA__CLINICAL_AND_GENETIC, RELEASE_DATA__DE_IDENTIFIED } = ConsentQuestionId.enum;

export const ConsentReleaseDataBase = z.object({
	[RELEASE_DATA__CLINICAL_AND_GENETIC]: z.boolean(),
	[RELEASE_DATA__DE_IDENTIFIED]: z.boolean(),
	firstName: Name,
	middleName: OptionalName,
	lastName: Name,
	preferredName: OptionalName,
	genderIdentity: Gender,
	ohipNumber: OhipNumber.optional(),
	dateOfBirth: z.coerce.date(),
	birthSex: BirthSex,
	ancestry: Ancestry,
	historyOfCancer: HistoryOfCancer,
	familyHistoryOfCancer: HistoryOfCancer,
	residentialPostalCode: PostalCode,
	selfReportedClinicianTitle: OptionalString,
	selfReportedClinicianFirstName: OptionalName,
	selfReportedClinicianLastName: OptionalName,
	selfReportedGeneticsClinic: GeneticsClinic.optional(),
	selfReportedMolecularLab: MolecularLab.optional(),
});
