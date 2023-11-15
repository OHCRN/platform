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

import axios from 'axios';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useReactHookForm, SubmitHandler } from 'react-hook-form';
import { FormErrorsDictionary } from 'src/i18n/locales/en/form-errors';

import TextFieldSet from '../Form/TextFieldSet';
import {
	TextFormFieldsDictionary,
	// CheckboxRadioFormFieldsDictionary,
	// SelectFormFieldsDictionary,
} from '../Form/types';
import RequiredAsterisk from '../Form/RequiredAsterisk';

import { ClinicianInviteFormTextDictionary } from './types';

// TEMP submit doesn't work if there's fields missing
const tempValidationSchema = z.object({
	participantFirstName: z.string(),
	participantLastName: z.string(),
	participantPreferredName: z.string(),
	participantPhoneNumber: z.string(),
	participantEmailAddress: z.string(),
});

type TempValidationSchema = z.infer<typeof tempValidationSchema>;

const ClinicianInviteFormEl = ({
	textDict,
	textFieldsDict,
}: {
	errorDict: Partial<FormErrorsDictionary>;
	textDict: ClinicianInviteFormTextDictionary;
	textFieldsDict: TextFormFieldsDictionary<any>;
	// TODO: fix any. not sure how to get a partial type of keys in ClinicianInviteForm
}) => {
	const {
		formState: { errors },
		handleSubmit,
		register,
	} = useReactHookForm<TempValidationSchema>({
		resolver: zodResolver(tempValidationSchema),
	});

	const onSubmit: SubmitHandler<TempValidationSchema> = (data: any) => {
		console.log('SUBMIT DATA', data);
		try {
			axios.post('http://localhost:8080/invites', { body: data });
		} catch (e) {
			console.log(e);
		}
	};

	// NOTE doesn't work. uncomment to see TS error
	// const translateError: string = (error?: any) => {
	// 	const errorKey = Object.keys(error)[0];
	// 	(error && errorDict[errorKey]) || '';
	// };

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h2>{textDict['patient-information']}</h2>
			<p>
				<RequiredAsterisk required /> {textDict['indicates-required-field']}
			</p>
			<TextFieldSet
				error={errors.participantFirstName?.type}
				register={register}
				{...textFieldsDict.participantFirstName}
			/>
			<TextFieldSet
				error={errors.participantLastName?.type}
				register={register}
				{...textFieldsDict.participantLastName}
			/>
			<TextFieldSet
				error={errors.participantPreferredName?.type}
				register={register}
				{...textFieldsDict.participantPreferredName}
			/>

			{/* mimicking structure of FormField
			TODO move select to FormField */}
			{/* <div>
				<div>
					<label htmlFor="consentGroupSelect">{fieldDict.consentGroup.label}</label>
				</div>
				<div>
					<Controller
						control={control}
						name="consentGroup"
						render={({ field: { onChange, value } }) => (
							<Select
								instanceId="consentGroupSelect"
								onChange={(val: SingleValue<string | { label: string; value: string }>) =>
									onChange(typeof val === 'string' ? val : val?.value || null)
								}
								options={consentGroupOptions}
								placeholder={textDict['select-placeholder']}
								value={consentGroupOptions.find((option) => option.value === value) || ''}
							/>
						)}
						rules={{ required: true }}
					/>
				</div>
			</div> */}

			<TextFieldSet
				error={errors.participantPhoneNumber?.type}
				register={register}
				{...textFieldsDict.participantPhoneNumber}
			/>
			<TextFieldSet
				error={errors.participantEmailAddress?.type}
				register={register}
				{...textFieldsDict.participantEmailAddress}
			/>
			<button type="submit" onClick={handleSubmit(onSubmit)}>
				Submit
			</button>
		</form>
	);
};

export default ClinicianInviteFormEl;
