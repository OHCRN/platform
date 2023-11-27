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
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { ClinicianInviteForm, ConsentGroup } from 'types/entities';
import urlJoin from 'url-join';

import { FormLabelsDictionary } from 'src/i18n/locales/en/form-labels';
import TextFieldSet from 'src/components/Form/fieldsets/TextFieldSet';
import RequiredAsterisk from 'src/components/Form/RequiredAsterisk';
import CheckboxFieldSet from 'src/components/Form/fieldsets/CheckboxFieldSet';
import SelectFieldSet from 'src/components/Form/fieldsets/SelectFieldSet';
import useRecaptcha from 'src/hooks/useRecaptcha';
import Notification from 'src/components/Notification';

import Form from '../Form';
import RecaptchaCheckbox from '../RecaptchaCheckbox';
import { useAppConfigContext } from '../AppConfigContextProvider';

import { ClinicianInviteFormTextDictionary, ConsentGroupOption } from './types';

// TODO fix types. errors.field?.type equals required in code but displays as invalid_type in the browser.
const getErrorFromDictionary = (dictionary: any, errorType: any) =>
	(errorType && dictionary[errorType]) || '';

const consentGroupsRequiringGuardian: ConsentGroup[] = [
	ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR,
	ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT,
];

const guardianInfoFields: Partial<keyof ClinicianInviteForm>[] = [
	'guardianName',
	'guardianPhoneNumber',
	'guardianEmailAddress',
	'guardianRelationship',
];

const ClinicianInviteFormComponent = ({
	consentGroupOptions,
	errorDict,
	labelsDict,
	textDict,
}: {
	consentGroupOptions: ConsentGroupOption[];
	errorDict: Record<string, string>;
	labelsDict: Partial<FormLabelsDictionary>;
	textDict: ClinicianInviteFormTextDictionary;
}) => {
	const { CONSENT_API_URL } = useAppConfigContext();

	// setup react-hook-forms
	const methods = useForm<ClinicianInviteForm>({
		resolver: zodResolver(ClinicianInviteForm),
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

	const handleRecaptchaChangeDemo = () => {
		const token = getRecaptchaToken();
		token && setRecaptchaError('');
		onRecaptchaChange();
	};

	// submit form
	const [successMessageDemo, setSuccessMessageDemo] = useState('');
	const onSubmit: SubmitHandler<ClinicianInviteForm> = (data, event) => {
		event?.preventDefault();
		console.log('SUBMIT DATA', data);
		const recaptchaToken = getRecaptchaToken();

		if (recaptchaToken) {
			axios
				.post(urlJoin(CONSENT_API_URL, 'invites'), { data, recaptchaToken })
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
			guardianInfoFields.forEach((field: Partial<keyof ClinicianInviteForm>) => {
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
						error={getErrorFromDictionary(errorDict, errors.participantFirstName?.type)}
						label={labelsDict['first-name'] || ''}
						name="participantFirstName"
						required
					/>
					<TextFieldSet
						error={getErrorFromDictionary(errorDict, errors.participantFirstName?.type)}
						label={labelsDict['last-name'] || ''}
						name="participantLastName"
						required
					/>
					<TextFieldSet
						error={getErrorFromDictionary(errorDict, errors.participantFirstName?.type)}
						label={labelsDict['preferred-name'] || ''}
						name="participantPreferredName"
					/>
					<TextFieldSet
						error={getErrorFromDictionary(errorDict, errors.participantFirstName?.type)}
						label={labelsDict['phone'] || ''}
						name="participantPhoneNumber"
						required
						type="tel"
					/>
					<TextFieldSet
						error={getErrorFromDictionary(errorDict, errors.participantFirstName?.type)}
						label={labelsDict['email'] || ''}
						name="participantEmailAddress"
						required
						type="email"
					/>

					<SelectFieldSet
						error={getErrorFromDictionary(errorDict, errors.participantFirstName?.type)}
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
							error={getErrorFromDictionary(errorDict, errors.participantFirstName?.type)}
							label={labelsDict['guardian-name'] || ''}
							name="guardianName"
							required
						/>
						<TextFieldSet
							error={getErrorFromDictionary(errorDict, errors.participantFirstName?.type)}
							label={labelsDict['guardian-phone'] || ''}
							name="guardianPhoneNumber"
							required
							type="tel"
						/>
						<TextFieldSet
							error={getErrorFromDictionary(errorDict, errors.participantFirstName?.type)}
							label={labelsDict['email'] || ''}
							name="guardianEmailAddress"
							required
							type="email"
						/>
						<TextFieldSet
							error={getErrorFromDictionary(errorDict, errors.participantFirstName?.type)}
							label={labelsDict['guardian-relationship'] || ''}
							name="guardianRelationship"
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
						error={getErrorFromDictionary(errorDict, errors.participantFirstName?.type)}
						name="consentToBeContacted"
						required
						title={labelsDict['consent-contact']}
					/>
				</div>

				<div>
					<h3>{textDict['clinician-information']}</h3>
					<TextFieldSet
						error={getErrorFromDictionary(errorDict, errors.participantFirstName?.type)}
						label={labelsDict['clinician-title-or-role'] || ''}
						name="clinicianTitleOrRole"
						required
					/>
					<TextFieldSet
						error={getErrorFromDictionary(errorDict, errors.participantFirstName?.type)}
						label={labelsDict['clinician-first-name'] || ''}
						name="clinicianFirstName"
						required
					/>
					<TextFieldSet
						error={getErrorFromDictionary(errorDict, errors.participantFirstName?.type)}
						label={labelsDict['clinician-last-name'] || ''}
						name="clinicianLastName"
						required
					/>
					<TextFieldSet
						error={getErrorFromDictionary(errorDict, errors.participantFirstName?.type)}
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
						onChange={handleRecaptchaChangeDemo}
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
