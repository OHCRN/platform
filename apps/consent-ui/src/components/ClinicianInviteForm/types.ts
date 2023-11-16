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
import { ClinicianInviteFormDictionary } from 'src/i18n/locales/en/clinician-invite-form';
import { FormErrorsDictionary } from 'src/i18n/locales/en/form-errors';
import { FormsDictionary } from 'src/i18n/locales/en/forms';
import { ConsentGroup, Name, PhoneNumber } from 'types/entities';
import { ConsentGroupDictionary } from 'src/i18n/locales/en/consent-group';

import { FormSelectOption } from '../Form/types';

// TODO ClinicianInviteFormDictionary shouldn't be partial in final version
export type ClinicianInviteFormTextDictionary = Partial<
	ClinicianInviteFormDictionary & FormsDictionary & FormErrorsDictionary
>;

export type ConsentGroupOption = FormSelectOption<keyof ConsentGroupDictionary>;

// TEMP submit doesn't work if there's fields missing
// so work with a reduced schema
const TEMP_FIELD_NAMES = [
	'clinicianInstitutionalEmailAddress',
	'clinicianFirstName',
	'clinicianLastName',
	'clinicianTitle',
	'consentGroup',
	'consentToBeContacted',
	'guardianEmailAddress',
	'guardianName',
	'guardianPhoneNumber',
	'guardianRelationship',
	'participantFirstName',
	'participantLastName',
	'participantPreferredName',
] as const;

export const TempFieldNames = z.enum(TEMP_FIELD_NAMES);
export type TempFieldNames = z.infer<typeof TempFieldNames>;

export const tempValidationSchema = z.object({
	[TempFieldNames.enum.clinicianFirstName]: Name,
	[TempFieldNames.enum.clinicianInstitutionalEmailAddress]: z.string().email(),
	[TempFieldNames.enum.clinicianLastName]: Name,
	[TempFieldNames.enum.clinicianTitle]: Name,
	[TempFieldNames.enum.consentGroup]: ConsentGroup,
	[TempFieldNames.enum.consentToBeContacted]: z.boolean(),
	[TempFieldNames.enum.guardianEmailAddress]: z.string().email().optional(),
	[TempFieldNames.enum.guardianName]: Name.optional(),
	[TempFieldNames.enum.guardianPhoneNumber]: PhoneNumber.optional(),
	[TempFieldNames.enum.guardianRelationship]: Name.optional(),
	[TempFieldNames.enum.participantFirstName]: Name,
	[TempFieldNames.enum.participantLastName]: Name,
	[TempFieldNames.enum.participantPreferredName]: Name.optional(),
});

export type TempValidationSchema = z.infer<typeof tempValidationSchema>;
