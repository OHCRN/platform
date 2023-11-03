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

const CONSENT_RELEASE_DATA_FIELD_NAMES = [
	'RELEASE_DATA__FIRST_NAME',
	'RELEASE_DATA__LAST_NAME',
	'RELEASE_DATA__PREFERRED_NAME',
	'RELEASE_DATA__GENDER_IDENTITY',
	'RELEASE_DATA__OHIP_NUMBER',
	'RELEASE_DATA__DATE_OF_BIRTH',
	'RELEASE_DATA__BIRTH_SEX',
	'RELEASE_DATA__ANCESTRY',
	'RELEASE_DATA__HISTORY_OF_CANCER',
	'RELEASE_DATA__FAMILY_HISTORY_OF_CANCER',
	'RELEASE_DATA__RESIDENTIAL_POSTAL_CODE',
	'RELEASE_DATA__SELF_REPORTED_CLINICIAN_TITLE',
	'RELEASE_DATA__SELF_REPORTED_CLINICIAN_FIRST_NAME',
	'RELEASE_DATA__SELF_REPORTED_CLINICIAN_LAST_NAME',
	'RELEASE_DATA__SELF_REPORTED_GENETICS_CLINIC',
	'RELEASE_DATA__SELF_REPORTED_MOLECULAR_LAB',
] as const;

export const ConsentReleaseDataFieldName = z.enum(CONSENT_RELEASE_DATA_FIELD_NAMES);

export const ConsentReleaseDataBase = z.object({
	[ConsentQuestionId.enum.RELEASE_DATA__CLINICAL_AND_GENETIC]: z.boolean(),
	[ConsentQuestionId.enum.RELEASE_DATA__DE_IDENTIFIED]: z.boolean(),
	[ConsentReleaseDataFieldName.enum.RELEASE_DATA__FIRST_NAME]: Name,
	[ConsentReleaseDataFieldName.enum.RELEASE_DATA__LAST_NAME]: Name,
	[ConsentReleaseDataFieldName.enum.RELEASE_DATA__PREFERRED_NAME]: Name.optional(),
	[ConsentReleaseDataFieldName.enum.RELEASE_DATA__GENDER_IDENTITY]: Gender,
	[ConsentReleaseDataFieldName.enum.RELEASE_DATA__OHIP_NUMBER]: OhipNumber.optional(),
	[ConsentReleaseDataFieldName.enum.RELEASE_DATA__DATE_OF_BIRTH]: z.coerce.date(),
	[ConsentReleaseDataFieldName.enum.RELEASE_DATA__BIRTH_SEX]: BirthSex,
	[ConsentReleaseDataFieldName.enum.RELEASE_DATA__ANCESTRY]: Ancestry,
	[ConsentReleaseDataFieldName.enum.RELEASE_DATA__HISTORY_OF_CANCER]: HistoryOfCancer,
	[ConsentReleaseDataFieldName.enum.RELEASE_DATA__FAMILY_HISTORY_OF_CANCER]: HistoryOfCancer,
	[ConsentReleaseDataFieldName.enum.RELEASE_DATA__RESIDENTIAL_POSTAL_CODE]: PostalCode,
	[ConsentReleaseDataFieldName.enum.RELEASE_DATA__SELF_REPORTED_CLINICIAN_TITLE]: z.string(),
	[ConsentReleaseDataFieldName.enum.RELEASE_DATA__SELF_REPORTED_CLINICIAN_FIRST_NAME]: Name,
	[ConsentReleaseDataFieldName.enum.RELEASE_DATA__SELF_REPORTED_CLINICIAN_LAST_NAME]: Name,
	[ConsentReleaseDataFieldName.enum.RELEASE_DATA__SELF_REPORTED_GENETICS_CLINIC]: GeneticsClinic,
	[ConsentReleaseDataFieldName.enum.RELEASE_DATA__SELF_REPORTED_MOLECULAR_LAB]: MolecularLab,
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
