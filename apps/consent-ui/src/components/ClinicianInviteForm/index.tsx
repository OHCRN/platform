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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { ClinicianInviteRequest, ConsentGroup } from 'types/entities';

import { FormLabelsDictionary } from 'src/i18n/locales/en/form-labels';
import TextFieldSet from 'src/components/Form/fieldsets/TextFieldSet';
import RequiredAsterisk from 'src/components/Form/RequiredAsterisk';
import CheckboxFieldSet from 'src/components/Form/fieldsets/CheckboxFieldSet';
import SelectFieldSet from 'src/components/Form/fieldsets/SelectFieldSet';
import useRecaptcha from 'src/hooks/useRecaptcha';
import Notification from 'src/components/Notification';
import { FormErrorsDictionary } from 'src/i18n/locales/en/form-errors';
import { axiosClient } from 'src/services/api/axiosClient';
import { API } from 'src/constants';

import Form from '../Form';
import RecaptchaCheckbox from '../RecaptchaCheckbox';

import { ClinicianInviteFormTextDictionary, ConsentGroupOption } from './types';

const consentGroupsRequiringGuardian: ConsentGroup[] = [
	ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR,
	ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT,
];

const guardianInfoFields: Partial<keyof ClinicianInviteRequest>[] = [
	'guardianName',
	'guardianPhoneNumber',
	'guardianEmailAddress',
	'guardianRelationship',
];

const ClinicianInviteFormComponent = ({
	consentGroupOptions,
	errorsDict,
	labelsDict,
	textDict,
}: {
	consentGroupOptions: ConsentGroupOption[];
	errorsDict: FormErrorsDictionary;
	labelsDict: Partial<FormLabelsDictionary>;
	textDict: ClinicianInviteFormTextDictionary;
}) => {
	// setup react-hook-forms
	const methods = useForm<ClinicianInviteRequest>({
		resolver: zodResolver(ClinicianInviteRequest),
	});

	const {
		formState: { errors },
		handleSubmit,
		unregister,
		watch,
	} = methods;

	// setup recaptcha
	const {
		getRecaptchaToken,
		onRecaptchaChange,
		recaptchaCheckboxRef,
		recaptchaError,
		resetRecaptcha,
		setRecaptchaError,
	} = useRecaptcha();

	const handleRecaptchaChange = () => {
		const token = getRecaptchaToken();
		token && setRecaptchaError('');
		onRecaptchaChange();
	};

	// submit form
	const [successMessageDemo, setSuccessMessageDemo] = useState('');
	// TODO remove and redirect to homepage

	const onSubmit: SubmitHandler<ClinicianInviteRequest> = (data, event) => {
		event?.preventDefault();

		const recaptchaToken = getRecaptchaToken();

		if (recaptchaToken) {
			axiosClient
				.post(API.INVITES, { data, recaptchaToken })
				.then(() => {
					setRecaptchaError('');
					resetRecaptcha();
					setSuccessMessageDemo('Form submitted successfully!');
				})
				.catch((e) => {
					console.error(e);
					setSuccessMessageDemo('');
					setRecaptchaError('Something went wrong, please try again');
				});
		} else {
			setSuccessMessageDemo('');
			setRecaptchaError('Please complete captcha');
		}
	};

	// watch consentGroup value & show/hide guardian info fields if participant is a minor.
	const watchConsentGroup = watch('consentGroup');
	const [showGuardianFields, setShowGuardianFields] = useState<boolean>(false);
	useEffect(() => {
		if (consentGroupsRequiringGuardian.includes(watchConsentGroup)) {
			// guardian fields are registered on render, in their input components
			setShowGuardianFields(true);
		} else {
			setShowGuardianFields(false);
			guardianInfoFields.forEach((field: Partial<keyof ClinicianInviteRequest>) => {
				unregister(field);
			});
		}
	}, [unregister, watchConsentGroup]);

	return (
		<FormProvider {...methods}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<h3>{textDict['patient-information']}</h3>
					<p>
						<RequiredAsterisk /> {textDict['indicates-required-field']}
					</p>
					<TextFieldSet
						error={errors.participantFirstName?.type && errorsDict['required']}
						label={labelsDict['first-name'] || ''}
						name="participantFirstName"
						required
					/>
					<TextFieldSet
						error={errors.participantLastName?.type && errorsDict['required']}
						label={labelsDict['last-name'] || ''}
						name="participantLastName"
						required
					/>
					<TextFieldSet
						error={errors.participantPreferredName?.type && errorsDict['required']}
						label={labelsDict['preferred-name'] || ''}
						name="participantPreferredName"
					/>
					<TextFieldSet
						error={errors.participantPhoneNumber?.type && errorsDict['required']}
						label={labelsDict['phone'] || ''}
						name="participantPhoneNumber"
						required
						type="tel"
					/>
					<TextFieldSet
						error={errors.participantEmailAddress?.type && errorsDict['required']}
						label={labelsDict['email'] || ''}
						name="participantEmailAddress"
						required
						type="email"
					/>

					<SelectFieldSet
						error={errors.consentGroup?.type && errorsDict['required']}
						label={labelsDict['consent-group'] || ''}
						name="consentGroup"
						options={consentGroupOptions}
						placeholder={textDict['select-placeholder'] || ''}
						required
					/>
				</div>

				{showGuardianFields && (
					<div style={{ background: 'lightgrey' }}>
						{/*
						 * guardian fields are marked required in the UI & optional in zod schema.
						 * they're required if they're visible,
						 * i.e. if the user has indicated the participant is a minor
						 */}
						<p>{textDict['enter-guardian-info']}</p>
						<TextFieldSet
							error={errors.guardianName?.type && errorsDict['required']}
							label={labelsDict['guardian-name'] || ''}
							name="guardianName"
							required
						/>
						<TextFieldSet
							error={errors.guardianPhoneNumber?.type && errorsDict['required']}
							label={labelsDict['guardian-phone'] || ''}
							name="guardianPhoneNumber"
							required
							type="tel"
						/>
						<TextFieldSet
							error={errors.guardianEmailAddress?.type && errorsDict['required']}
							label={labelsDict['email'] || ''}
							name="guardianEmailAddress"
							required
							type="email"
						/>
						<TextFieldSet
							error={errors.guardianRelationship?.type && errorsDict['required']}
							label={labelsDict['guardian-relationship'] || ''}
							name="guardianRelationship"
							required
						/>
						<p>
							{textDict['upload-file-description-1']}
							<a href="">{textDict['upload-file-link']}</a>
							{/* TODO download assent form https://github.com/OHCRN/platform/issues/287 */}
							{textDict['upload-file-description-2']}
							{/* TODO upload assent form https://github.com/OHCRN/platform/issues/265 */}
						</p>
					</div>
				)}

				<div>
					<p>{textDict['after-registering']}</p>
					<CheckboxFieldSet
						description={textDict['consent-contact-description']}
						error={errors.consentToBeContacted?.type && errorsDict['required']}
						name="consentToBeContacted"
						required
						title={labelsDict['consent-contact']}
					/>
				</div>

				<div>
					<h3>{textDict['clinician-information']}</h3>
					<TextFieldSet
						error={errors.clinicianTitleOrRole?.type && errorsDict['required']}
						label={labelsDict['clinician-title-or-role'] || ''}
						name="clinicianTitleOrRole"
						required
					/>
					<TextFieldSet
						error={errors.clinicianFirstName?.type && errorsDict['required']}
						label={labelsDict['clinician-first-name'] || ''}
						name="clinicianFirstName"
						required
					/>
					<TextFieldSet
						error={errors.clinicianLastName?.type && errorsDict['required']}
						label={labelsDict['clinician-last-name'] || ''}
						name="clinicianLastName"
						required
					/>
					<TextFieldSet
						error={errors.clinicianInstitutionalEmailAddress?.type && errorsDict['required']}
						label={labelsDict['clinician-institutional-email-address'] || ''}
						name="clinicianInstitutionalEmailAddress"
						required
						type="email"
					/>
				</div>

				{recaptchaError && (
					<Notification level="error" variant="small" title={`Error: ${recaptchaError}`} />
				)}

				<div style={{ margin: '25px 0' }}>
					<RecaptchaCheckbox
						onChange={handleRecaptchaChange}
						recaptchaCheckboxRef={recaptchaCheckboxRef}
					/>
				</div>

				<button type="submit">Submit</button>

				{successMessageDemo && (
					<Notification level="success" variant="small" title={successMessageDemo} />
				)}
			</Form>
		</FormProvider>
	);
};

export default ClinicianInviteFormComponent;
