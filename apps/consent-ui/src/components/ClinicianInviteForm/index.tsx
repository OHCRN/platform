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

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Select from 'react-select';
import { useForm as useReactHookForm, SubmitHandler, Controller } from 'react-hook-form';
import { PhoneNumber } from 'types/entities';

import FormField from '../Form/FormField';

import {
	ClinicianInviteFormFieldsDictionary,
	ClinicianInviteFormTextDictionary,
	ClinicianInviteFormErrorDictionary,
} from './types';

const consentGroupOptions = [
	{ label: 'beep', value: 'beepVal' },
	{ label: 'boop', value: 'boopVal' },
];

// require more characters, in order to show errors better
const DEMO_STRING_LENGTH = 5;

const ClinicianInviteForm = ({
	errorDict,
	fieldDict,
	textDict,
}: {
	errorDict: ClinicianInviteFormErrorDictionary;
	fieldDict: ClinicianInviteFormFieldsDictionary;
	textDict: ClinicianInviteFormTextDictionary;
}) => {
	const schema = z.object({
		firstName: z.string().min(DEMO_STRING_LENGTH, {
			message: errorDict.required,
		}),
		lastName: z.string().min(DEMO_STRING_LENGTH, {
			message: errorDict.required,
		}),
		preferredName: z.string().optional(),
		phoneNumber: PhoneNumber.length(10, {
			message: errorDict.required,
		}),
		email: z.string().email({
			message: errorDict.required,
		}),
		consentGroup: z.string().min(DEMO_STRING_LENGTH, {
			message: errorDict.required,
		}),
	});

	const {
		control,
		formState: { errors },
		handleSubmit,
		register,
	} = useReactHookForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
	});

	const onSubmit: SubmitHandler<z.infer<typeof schema>> = (data) => console.log('data', data);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h2>{textDict['patient-information']}</h2>
			<p>
				<span style={{ color: 'red' }}>*</span> {textDict['indicates-required-field']}
			</p>
			<FormField
				register={register}
				error={errors.firstName?.message}
				fieldName="firstName"
				label={fieldDict.firstName.label}
				type={fieldDict.firstName.type}
				required={fieldDict.firstName.required}
			/>
			<FormField
				register={register}
				error={errors.lastName?.message}
				fieldName="lastName"
				label={fieldDict.lastName.label}
				type={fieldDict.lastName.type}
				required={fieldDict.lastName.required}
			/>
			<FormField
				register={register}
				error={errors.preferredName?.message}
				fieldName="preferredName"
				label={fieldDict.preferredName.label}
				type={fieldDict.preferredName.type}
				required={fieldDict.preferredName.required}
			/>
			<FormField
				register={register}
				error={errors.phoneNumber?.message}
				fieldName="phoneNumber"
				label={fieldDict.phoneNumber.label}
				type={fieldDict.phoneNumber.type}
				required={fieldDict.phoneNumber.required}
			/>
			<FormField
				register={register}
				error={errors.email?.message}
				fieldName="email"
				label={fieldDict.email.label}
				type={fieldDict.email.type}
				required={fieldDict.email.required}
			/>

			<Controller
				control={control}
				name="consentGroup"
				render={({ field: { onChange, value } }) => (
					<Select
						instanceId="consentGroupSelect"
						onChange={(val: any) => onChange(val.value || null)}
						options={consentGroupOptions}
						value={consentGroupOptions.find((option) => option.value === value) || ''}
						placeholder="-- Choose consent group --"
					/>
				)}
				rules={{ required: true }}
			/>

			<input type="submit" />
		</form>
	);
};

export default ClinicianInviteForm;
