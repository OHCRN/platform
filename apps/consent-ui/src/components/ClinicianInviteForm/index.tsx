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
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { FormsDictionary } from 'src/i18n/locales/en/forms';
import ReactSelect, { SingleValue } from 'react-select';

import TextFieldSet from '../Form/TextFieldSet';
import RequiredAsterisk from '../Form/RequiredAsterisk';
import FieldSet from '../Form/FieldSet';

import {
	ClinicianInviteFormTextDictionary,
	ConsentGroupOption,
	TempFieldNames,
	TempValidationSchema,
	tempValidationSchema,
} from './types';

const ClinicianInviteFormEl = ({
	consentGroupOptions,
	fieldsDict,
	textDict,
}: {
	consentGroupOptions: ConsentGroupOption[];
	fieldsDict: Partial<FormsDictionary>;
	textDict: ClinicianInviteFormTextDictionary;
}) => {
	const {
		control,
		formState: { errors },
		handleSubmit,
		register,
	} = useForm<TempValidationSchema>({
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
				<RequiredAsterisk /> {textDict['indicates-required-field']}
			</p>
			<TextFieldSet
				error={errors.participantFirstName?.type}
				label={fieldsDict['first-name-label'] || ''}
				name={TempFieldNames.enum.participantFirstName}
				register={register}
				required
			/>
			<TextFieldSet
				error={errors.participantLastName?.type}
				label={fieldsDict['last-name-label'] || ''}
				name={TempFieldNames.enum.participantLastName}
				register={register}
				required
			/>
			<TextFieldSet
				error={errors.participantPreferredName?.type}
				label={fieldsDict['preferred-name-label'] || ''}
				name={TempFieldNames.enum.participantPreferredName}
				register={register}
			/>

			<Controller
				name={TempFieldNames.enum.consentGroup}
				control={control}
				render={({ field: { onChange, value } }) => (
					<FieldSet
						error={errors.participantPhoneNumber?.type}
						label={fieldsDict['consent-group-label'] || ''}
						name={TempFieldNames.enum.consentGroup}
						required
					>
						<ReactSelect
							instanceId={TempFieldNames.enum.consentGroup}
							onChange={(val: SingleValue<string | ConsentGroupOption>) =>
								onChange(typeof val === 'string' ? val : val?.value || null)
							}
							options={consentGroupOptions}
							placeholder={textDict['select-placeholder']}
							required
							value={consentGroupOptions.find((option) => option.value === value) || ''}
						/>
					</FieldSet>
				)}
				rules={{ required: true }}
			/>

			<TextFieldSet
				error={errors.participantPhoneNumber?.type}
				label={fieldsDict['phone-label'] || ''}
				name={TempFieldNames.enum.participantPhoneNumber}
				register={register}
				required
				type="tel"
			/>
			<TextFieldSet
				error={errors.participantEmailAddress?.type}
				label={fieldsDict['email-label'] || ''}
				name={TempFieldNames.enum.participantEmailAddress}
				register={register}
				required
				type="email"
			/>

			<button type="submit" onClick={handleSubmit(onSubmit)}>
				Submit
			</button>
		</form>
	);
};

export default ClinicianInviteFormEl;
