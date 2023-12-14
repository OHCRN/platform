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
import { ClinicianInviteRequest, ConsentGroup, InviteGuardianFields } from 'types/entities';

import TextFieldSet from 'src/components/common/Form/fieldsets/TextFieldSet';
import RequiredAsterisk from 'src/components/common/Form/RequiredAsterisk';
import CheckboxFieldSet from 'src/components/common/Form/fieldsets/CheckboxFieldSet';
import SelectFieldSet from 'src/components/common/Form/fieldsets/SelectFieldSet';
import useRecaptcha from 'src/hooks/useRecaptcha';
import Notification from 'src/components/common/Notification';
import { FormErrorsDictionary } from 'src/i18n/locales/en/formErrors';
import { axiosClient } from 'src/services/api/axiosClient';
import { API } from 'src/constants';
import Form from 'src/components/common/Form';
import RecaptchaCheckbox from 'src/components/common/Form/RecaptchaCheckbox';
import { InviteFormTextDictionary } from 'src/i18n/locales/en/inviteFormText';
import { InviteFormLabelsDictionary } from 'src/i18n/locales/en/inviteFormLabels';
import FieldGroup from 'src/components/common/Form/FieldGroup';

import { ConsentGroupOption } from './types';

const consentGroupsRequiringGuardian: ConsentGroup[] = [
	ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR,
	ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT,
];

const guardianInfoFields: (keyof InviteGuardianFields)[] = [
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
	labelsDict: InviteFormLabelsDictionary;
	textDict: InviteFormTextDictionary;
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

	const onSubmit: SubmitHandler<ClinicianInviteRequest> = (data, event) => {
		event?.preventDefault();

		const recaptchaToken = getRecaptchaToken();

		if (recaptchaToken) {
			axiosClient
				.post(API.INVITES, { data, recaptchaToken })
				.then(() => {
					setRecaptchaError('');
					resetRecaptcha();
				})
				.catch((e) => {
					console.error(e);
					setRecaptchaError('Something went wrong, please try again');
				});
		} else {
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
			guardianInfoFields.forEach((field) => {
				unregister(field);
			});
		}
	}, [unregister, watchConsentGroup]);

	return (
		<FormProvider {...methods}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FieldGroup>
					<h3>{textDict['patientInformation']}</h3>
					<p>
						<RequiredAsterisk /> {textDict['indicatesRequiredField']}
					</p>
					<TextFieldSet
						error={errors.participantFirstName?.type && errorsDict['required']}
						label={labelsDict['firstName'] || ''}
						name="participantFirstName"
						required
					/>
					<TextFieldSet
						error={errors.participantLastName?.type && errorsDict['required']}
						label={labelsDict['lastName'] || ''}
						name="participantLastName"
						required
					/>
					<TextFieldSet
						error={errors.participantPreferredName?.type && errorsDict['required']}
						label={labelsDict['preferredName'] || ''}
						name="participantPreferredName"
					/>

					<SelectFieldSet
						error={errors.consentGroup?.type && errorsDict['required']}
						label={labelsDict['consentGroup'] || ''}
						name="consentGroup"
						options={consentGroupOptions}
						placeholder={textDict['selectPlaceholder'] || ''}
						required
					/>
				</FieldGroup>

				{showGuardianFields && (
					<FieldGroup variant="grey">
						{/*
						 * guardian fields are marked required in the UI & optional in zod schema.
						 * they're required if they're visible,
						 * i.e. if the user has indicated the participant is a minor
						 */}
						<p>{textDict['enterGuardianInfo']}</p>
						<TextFieldSet
							error={errors.guardianName?.type && errorsDict['required']}
							label={labelsDict['guardianName'] || ''}
							name="guardianName"
							required
						/>
						<TextFieldSet
							error={errors.guardianPhoneNumber?.type && errorsDict['required']}
							label={labelsDict['guardianPhone'] || ''}
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
							label={labelsDict['guardianRelationship'] || ''}
							name="guardianRelationship"
							required
						/>
						<p>
							{textDict['uploadFileDescription1']}
							<a href="">{textDict['uploadFileLink']}</a>
							{/* TODO download assent form https://github.com/OHCRN/platform/issues/287 */}
							{textDict['uploadFileDescription2']}
							{/* TODO upload assent form https://github.com/OHCRN/platform/issues/265 */}
						</p>
					</FieldGroup>
				)}

				<FieldGroup>
					<p>{textDict['afterRegistering']}</p>
					<CheckboxFieldSet
						description={textDict['consentContactDescription']}
						error={errors.consentToBeContacted?.type && errorsDict['required']}
						name="consentToBeContacted"
						required
						title={labelsDict['consentContact']}
					/>
				</FieldGroup>

				<FieldGroup>
					<h3>{textDict['clinicianInformation']}</h3>
					<TextFieldSet
						error={errors.clinicianTitleOrRole?.type && errorsDict['required']}
						label={labelsDict['clinicianTitleOrRole'] || ''}
						name="clinicianTitleOrRole"
						required
					/>
					<TextFieldSet
						error={errors.clinicianFirstName?.type && errorsDict['required']}
						label={labelsDict['clinicianFirstName'] || ''}
						name="clinicianFirstName"
						required
					/>
					<TextFieldSet
						error={errors.clinicianLastName?.type && errorsDict['required']}
						label={labelsDict['clinicianLastName'] || ''}
						name="clinicianLastName"
						required
					/>
					<TextFieldSet
						error={errors.clinicianInstitutionalEmailAddress?.type && errorsDict['required']}
						label={labelsDict['clinicianInstitutionalEmailAddress'] || ''}
						name="clinicianInstitutionalEmailAddress"
						required
						type="email"
					/>
				</FieldGroup>

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
			</Form>
		</FormProvider>
	);
};

export default ClinicianInviteFormComponent;
