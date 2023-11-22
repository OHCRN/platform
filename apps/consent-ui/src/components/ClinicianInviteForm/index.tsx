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

import { useEffect, useState } from 'react';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { ClinicianInviteForm, ConsentGroup, ConsentToBeContacted } from 'types/entities';

import { FormLabelsDictionary } from 'src/i18n/locales/en/form-labels';
import TextFieldSet from 'src/components/Form/fieldsets/TextFieldSet';
import RequiredAsterisk from 'src/components/Form/RequiredAsterisk';
import CheckboxFieldSet from 'src/components/Form/fieldsets/CheckboxFieldSet';
import SelectFieldSet from 'src/components/Form/fieldsets/SelectFieldSet';

import Form from '../Form';

import { ClinicianInviteFormTextDictionary, ConsentGroupOption } from './types';

const consentGroupsRequiringGuardian: ConsentGroup[] = [
	ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR,
	ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT,
];
const guardianInfoFields = [
	// const guardianInfoFields: Partial<keyof ClinicianInviteForm>[] = [
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
	} = useForm<ClinicianInviteForm>({
		resolver: zodResolver(ClinicianInviteForm),
	});

	const onSubmit: SubmitHandler<ClinicianInviteForm> = (data: any) => {
		console.log('SUBMIT DATA', data);
		try {
			axios.post('http://localhost:8080/invites', { body: data });
		} catch (e) {
			console.log(e);
		}
	};

	// watch consentGroup value & show/hide guardian info fields if participant is a minor.
	const watchConsentGroup = watch('consentGroup');
	const [showGuardianFields, setShowGuardianFields] = useState<boolean>(false);
	useEffect(() => {
		if (consentGroupsRequiringGuardian.includes(watchConsentGroup)) {
			// guardian fields are registered on render
			setShowGuardianFields(true);
		} else {
			setShowGuardianFields(false);
			guardianInfoFields.forEach((field: any) => {
				unregister(field);
			});
		}
	}, [unregister, watchConsentGroup]);

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<h3>{textDict['patient-information']}</h3>
				<p>
					<RequiredAsterisk /> {textDict['indicates-required-field']}
				</p>
				<TextFieldSet
					error={errors.participantFirstName?.type}
					label={labelsDict['first-name'] || ''}
					name="participantFirstName"
					register={register}
					required
				/>
				<TextFieldSet
					error={errors.participantLastName?.type}
					label={labelsDict['last-name'] || ''}
					name="participantLastName"
					register={register}
					required
				/>
				<TextFieldSet
					error={errors.participantPreferredName?.type}
					label={labelsDict['preferred-name'] || ''}
					name="participantPreferredName"
					register={register}
				/>
				<TextFieldSet
					error={errors.participantPhoneNumber?.type}
					label={labelsDict['phone'] || ''}
					name="participantPhoneNumber"
					register={register}
					required
					type="tel"
				/>
				<TextFieldSet
					error={errors.participantEmailAddress?.type}
					label={labelsDict['email'] || ''}
					name="participantEmailAddress"
					register={register}
					required
					type="email"
				/>

				<Controller
					name="consentGroup"
					control={control}
					render={({ field: { onChange, value } }) => (
						<SelectFieldSet
							error={errors.consentGroup?.type}
							label={labelsDict['consent-group'] || ''}
							name="consentGroup"
							onChange={onChange}
							options={consentGroupOptions}
							placeholder={textDict['select-placeholder'] || ''}
							required
							value={value}
						/>
					)}
					rules={{ required: true }}
				/>
			</div>

			{showGuardianFields && (
				<div style={{ background: 'lightgrey' }}>
					{/*
					 * guardian fields are marked required in the UI & optional in zod schema
					 * because they're required if they're visible,
					 * i.e. if the user has indicated the participant is a minor
					 */}
					<p>{textDict['enter-guardian-info']}</p>
					<TextFieldSet
						error={errors.guardianName?.type}
						label={labelsDict['guardian-name'] || ''}
						name="guardianName"
						register={register}
						required
					/>
					<TextFieldSet
						error={errors.guardianPhoneNumber?.type}
						label={labelsDict['guardian-phone'] || ''}
						name="guardianPhoneNumber"
						register={register}
						required
						type="tel"
					/>
					<TextFieldSet
						error={errors.guardianEmailAddress?.type}
						label={labelsDict['email'] || ''}
						name="guardianEmailAddress"
						register={register}
						required
						type="email"
					/>
					<TextFieldSet
						error={errors.guardianRelationship?.type}
						label={labelsDict['guardian-relationship'] || ''}
						name="guardianRelationship"
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
			)}

			<div>
				<p>{textDict['after-registering']}</p>
				<CheckboxFieldSet
					description={textDict['consent-contact-description']}
					error={errors.consentToBeContacted?.type}
					name="consentToBeContacted"
					register={register}
					required
					title={labelsDict['consent-contact']}
					value={ConsentToBeContacted.enum.CONSENTED}
				/>
			</div>

			<div>
				<h3>{textDict['clinician-information']}</h3>
				<TextFieldSet
					error={errors.clinicianTitleOrRole?.type}
					label={labelsDict['clinician-title-or-role'] || ''}
					name="clinicianTitleOrRole"
					register={register}
					required
				/>
				<TextFieldSet
					error={errors.clinicianFirstName?.type}
					label={labelsDict['clinician-first-name'] || ''}
					name="clinicianFirstName"
					register={register}
					required
				/>
				<TextFieldSet
					error={errors.clinicianLastName?.type}
					label={labelsDict['clinician-last-name'] || ''}
					name="clinicianLastName"
					register={register}
					required
				/>
				<TextFieldSet
					error={errors.clinicianInstitutionalEmailAddress?.type}
					label={labelsDict['clinician-institutional-email-address'] || ''}
					name="clinicianInstitutionalEmailAddress"
					register={register}
					required
					type="email"
				/>
			</div>

			<button type="submit">Submit</button>
		</Form>
	);
};

export default ClinicianInviteFormEl;
