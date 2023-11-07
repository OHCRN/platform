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

import { z } from 'zod';
import { generateSchema } from '@anatine/zod-openapi';
import type { SchemaObject } from 'openapi3-ts/oas31';

import { ConsentQuestionId } from './ConsentQuestion.js';
import { Name } from './Name.js';
import { Gender } from './Gender.js';
import { BirthSex } from './BirthSex.js';
import { Ancestry } from './Ancestry.js';
import { HistoryOfCancer } from './HistoryOfCancer.js';
import { PostalCode } from './PostalCode.js';
import { GeneticsClinic } from './GeneticsClinic.js';
import { MolecularLab } from './MolecularLab.js';
import { OhipNumber } from './OhipNumber.js';

export const ConsentReleaseDataBase = z.object({
	[ConsentQuestionId.enum.RELEASE_DATA__CLINICAL_AND_GENETIC]: z.boolean(),
	[ConsentQuestionId.enum.RELEASE_DATA__DE_IDENTIFIED]: z.boolean(),
	firstName: Name,
	lastName: Name,
	preferredName: Name.optional(),
	genderIdentity: Gender,
	ohipNumber: OhipNumber.optional(),
	dateOfBirth: z.coerce.date(),
	birthSex: BirthSex,
	ancestry: Ancestry,
	historyOfCancer: HistoryOfCancer,
	familyHistoryOfCancer: HistoryOfCancer,
	residentialPostalCode: PostalCode,
	selfReportedClinicianTitle: z.string().optional(),
	selfReportedClinicianFirstName: Name.optional(),
	selfReportedClinicianLastName: Name.optional(),
	selfReportedGeneticsClinic: GeneticsClinic.optional(),
	selfReportedMolecularLab: MolecularLab.optional(),
});

export const ConsentReleaseDataRequest = ConsentReleaseDataBase;
export type ConsentReleaseDataRequest = z.infer<typeof ConsentReleaseDataRequest>;
export const ConsentReleaseDataRequestSchema: SchemaObject =
	generateSchema(ConsentReleaseDataRequest);

export const ConsentReleaseDataResponse = ConsentReleaseDataBase;
export type ConsentReleaseDataResponse = z.infer<typeof ConsentReleaseDataResponse>;
export const ConsentReleaseDataResponseSchema: SchemaObject = generateSchema(
	ConsentReleaseDataResponse,
);
