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

import { useEffect } from 'react';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { FormLabelsDictionary } from 'src/i18n/locales/en/form-labels';
import Select, { SingleValue } from 'react-select';
import { ConsentGroup } from 'types/entities';

import TextFieldSet from '../Form/fieldsets/TextFieldSet';
import RequiredAsterisk from '../Form/RequiredAsterisk';
import FieldSet from '../Form/fieldsets/FieldSet';

import {
	ClinicianInviteFormTextDictionary,
	ConsentGroupOption,
	TempFieldNames,
	TempValidationSchema,
	tempValidationSchema,
} from './types';

const consentGroupsRequiringGuardian: ConsentGroup[] = [
	'GUARDIAN_CONSENT_OF_MINOR',
	'GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT',
];

const guardianInfoFields: TempFieldNames[] = [
	'guardianName',
	'guardianPhoneNumber',
	'guardianEmailAddress',
	'guardianRelationship',
];

const ClinicianInviteFormEl = ({
	consentGroupOptions,
	labelsDict,
	textDict,
}: {
	consentGroupOptions: ConsentGroupOption[];
	labelsDict: Partial<FormLabelsDictionary>;
	textDict: ClinicianInviteFormTextDictionary;
}) => {
	const {
		control,
		formState: { errors },
		handleSubmit,
		register,
		unregister,
		watch,
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

	// watch consentGroup value & show/hide guardian info fields if participant is a minor
	const watchConsentGroup = watch(TempFieldNames.enum.consentGroup);
	useEffect(() => {
		if (consentGroupsRequiringGuardian.includes(watchConsentGroup)) {
			guardianInfoFields.forEach((field) => {
				register(field);
			});
		} else {
			guardianInfoFields.forEach((field) => {
				unregister(field);
			});
		}
	}, [register, unregister, watchConsentGroup]);

	// NOTE doesn't work. uncomment to see TS error
	// const translateError: string = (error?: any) => {
	// 	const errorKey = Object.keys(error)[0];
	// 	(error && errorDict[errorKey]) || '';
	// };

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<h3>{textDict['patient-information']}</h3>
				<p>
					<RequiredAsterisk /> {textDict['indicates-required-field']}
				</p>
				<TextFieldSet
					error={errors.participantFirstName?.type}
					label={labelsDict['first-name'] || ''}
					name={TempFieldNames.enum.participantFirstName}
					register={register}
					required
				/>
				<TextFieldSet
					error={errors.participantLastName?.type}
					label={labelsDict['last-name'] || ''}
					name={TempFieldNames.enum.participantLastName}
					register={register}
					required
				/>
				<TextFieldSet
					error={errors.participantPreferredName?.type}
					label={labelsDict['preferred-name'] || ''}
					name={TempFieldNames.enum.participantPreferredName}
					register={register}
				/>

				<Controller
					name={TempFieldNames.enum.consentGroup}
					control={control}
					render={({ field: { onChange, value } }) => (
						<FieldSet
							error={errors.consentGroup?.type}
							label={labelsDict['consent-group'] || ''}
							name={TempFieldNames.enum.consentGroup}
							required
						>
							<Select
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
			</div>

			<div style={{ background: 'lightgrey' }}>
				{/* guardian fields are marked required in the UI - they're required if they're visible,
				i.e. if the user has indicated the participant is a minor */}
				<p>{textDict['enter-guardian-info']}</p>
				<TextFieldSet
					error={errors.guardianName?.type}
					label={labelsDict['guardian-name'] || ''}
					name={TempFieldNames.enum.guardianName}
					register={register}
					required
				/>
				<TextFieldSet
					error={errors.guardianPhoneNumber?.type}
					label={labelsDict['guardian-phone'] || ''}
					name={TempFieldNames.enum.guardianPhoneNumber}
					register={register}
					required
					type="tel"
				/>
				<TextFieldSet
					error={errors.guardianEmailAddress?.type}
					label={labelsDict['email'] || ''}
					name={TempFieldNames.enum.guardianEmailAddress}
					register={register}
					required
					type="email"
				/>
				<TextFieldSet
					error={errors.guardianRelationship?.type}
					label={labelsDict['guardian-relationship'] || ''}
					name={TempFieldNames.enum.guardianRelationship}
					register={register}
					required
				/>
				<p>
					{textDict['upload-file-description-1']}
					<a href="">{textDict['upload-file-link']}</a>
					{textDict['upload-file-description-2']}
					{/* TODO upload assent form https://github.com/OHCRN/platform/issues/265 */}
				</p>
			</div>

			<div>
				<p>{textDict['after-registering']}</p>
				{/* checkbox input with title & description */}
			</div>

			<div>
				<h3>{textDict['clinician-information']}</h3>
				<TextFieldSet
					error={errors.clinicianTitleOrRole?.type}
					label={labelsDict['clinician-title-or-role'] || ''}
					name={TempFieldNames.enum.clinicianTitleOrRole}
					register={register}
					required
				/>
				<TextFieldSet
					error={errors.clinicianFirstName?.type}
					label={labelsDict['clinician-first-name'] || ''}
					name={TempFieldNames.enum.clinicianFirstName}
					register={register}
					required
				/>
				<TextFieldSet
					error={errors.clinicianLastName?.type}
					label={labelsDict['clinician-last-name'] || ''}
					name={TempFieldNames.enum.clinicianLastName}
					register={register}
					required
				/>
				<TextFieldSet
					error={errors.clinicianInstitutionalEmailAddress?.type}
					label={labelsDict['clinician-institutional-email-address'] || ''}
					name={TempFieldNames.enum.clinicianInstitutionalEmailAddress}
					register={register}
					required
					type="email"
				/>
			</div>

			<button type="submit" onClick={handleSubmit(onSubmit)}>
				Submit
			</button>
		</form>
	);
};

export default ClinicianInviteFormEl;
