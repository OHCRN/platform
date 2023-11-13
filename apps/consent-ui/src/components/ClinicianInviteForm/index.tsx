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

// import { ReactNode } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
// import Select, { SingleValue } from 'react-select';
import {
	useForm as useReactHookForm,
	SubmitHandler,
	// Controller
} from 'react-hook-form';
// import { PhoneNumber } from 'types/entities';
import { ClinicianInviteBase, ClinicianInviteForm } from 'types/entities';

import TextFieldSet from '../Form/TextFieldSet';
import {
	TextFormFieldsDictionary,
	// CheckboxRadioFormFieldsDictionary,
	// SelectFormFieldsDictionary,
} from '../Form/types';
import RequiredAsterisk from '../Form/RequiredAsterisk';

import { ClinicianInviteFormTextDictionary, ClinicianInviteFormErrorDictionary } from './types';

const ClinicianInviteFormEl = ({
	// checkboxRadioFieldsDict,
	errorDict,
	// selectFieldsDict,
	textDict,
	textFieldsDict,
}: {
	// checkboxRadioFieldsDict: CheckboxRadioFormFieldsDictionary;
	errorDict: ClinicianInviteFormErrorDictionary;
	// selectFieldsDict: SelectFormFieldsDictionary;
	textDict: ClinicianInviteFormTextDictionary;
	textFieldsDict: TextFormFieldsDictionary;
}) => {
	const {
		// control,
		formState: { errors },
		handleSubmit,
		register,
	} = useReactHookForm<ClinicianInviteForm>({
		resolver: zodResolver(ClinicianInviteBase),
	});

	const onSubmit: SubmitHandler<ClinicianInviteForm> = (data: any) => console.log('data', data);

	// doesn't work. uncomment to see TS error
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
				{...textFieldsDict.firstName}
			/>
			<TextFieldSet
				error={errors.participantLastName?.type}
				register={register}
				{...textFieldsDict.lastName}
			/>
			<TextFieldSet
				error={errors.participantPreferredName?.type}
				register={register}
				{...textFieldsDict.preferredName}
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

			<input type="submit" />
		</form>
	);
};

export default ClinicianInviteFormEl;
