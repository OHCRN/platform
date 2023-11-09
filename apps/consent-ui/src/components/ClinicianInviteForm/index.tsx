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

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm as useReactHookForm, SubmitHandler } from 'react-hook-form';
import { FormErrorsDictionary } from 'src/i18n/locales/en/form-errors';
import { ClinicianInviteFormDictionary } from 'src/i18n/locales/en/clinician-invite-form';
import { FormsDictionary } from 'src/i18n/locales/en/forms';

import FormField, { FormFieldTypes } from '../Form/FormField';

export type ClinicianInviteFormFieldsDictionary = Record<
	keyof ClinicianInviteFormSchema,
	{ label: string; required: boolean; type: FormFieldTypes }
>;

// TODO ClinicianInviteFormDictionary shouldn't be partial in final version
export type ClinicianInviteFormTextDictionary = Partial<
	ClinicianInviteFormDictionary & FormsDictionary & FormErrorsDictionary
>;

export const clinicianInviteFormSchema = z.object({
	firstName: z.string().min(1),
});

export type ClinicianInviteFormSchema = z.infer<typeof clinicianInviteFormSchema>;

const ClinicianInviteForm = ({
	fieldDict,
	textDict,
}: {
	fieldDict: ClinicianInviteFormFieldsDictionary;
	textDict: ClinicianInviteFormTextDictionary;
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useReactHookForm<ClinicianInviteFormSchema>({
		resolver: zodResolver(clinicianInviteFormSchema),
	});

	const onSubmit: SubmitHandler<ClinicianInviteFormSchema> = (data) => console.log('data', data);

	return (
		<form>
			<h2>{textDict['patient-information']}</h2>
			<p>
				<span style={{ color: 'red' }}>*</span> {textDict['indicates-required-field']}
			</p>
			<FormField
				register={register}
				error={errors.firstName?.type}
				fieldName="firstName"
				label={fieldDict.firstName.label}
				type={fieldDict.firstName.type}
				required={fieldDict.firstName.required}
			/>

			<input type="submit" onClick={handleSubmit(onSubmit)} />
		</form>
	);
};

export default ClinicianInviteForm;
