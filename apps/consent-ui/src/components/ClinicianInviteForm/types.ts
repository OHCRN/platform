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
// import { PhoneNumber } from 'types/entities';

// TODO ClinicianInviteFormDictionary shouldn't be partial in final version
export type ClinicianInviteFormTextDictionary = Partial<
	ClinicianInviteFormDictionary & FormsDictionary & FormErrorsDictionary
>;

// TEMP submit doesn't work if there's fields missing
const TEMP_FIELD_NAMES = [
	'participantFirstName',
	'participantLastName',
	'participantPreferredName',
	// 'participantPhoneNumber',
	// 'participantEmailAddress',
] as const;

export const TempFieldNames = z.enum(TEMP_FIELD_NAMES);

export const tempValidationSchema = z.object({
	[TempFieldNames.enum.participantFirstName]: z.string(),
	[TempFieldNames.enum.participantLastName]: z.string(),
	[TempFieldNames.enum.participantPreferredName]: z.string(),
	// [TempFieldNames.enum.participantPhoneNumber]: PhoneNumber,
	// [TempFieldNames.enum.participantEmailAddress]: z.string().email(),
});

export type TempValidationSchema = z.infer<typeof tempValidationSchema>;
