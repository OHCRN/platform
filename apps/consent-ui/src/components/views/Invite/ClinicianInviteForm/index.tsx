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
import { ConsentGroup } from 'types/entities';
import { ClinicianInviteRequest } from 'types/consentApi';
import clsx from 'clsx';

import TextFieldSet from 'src/components/common/Form/fieldsets/TextFieldSet';
import RequiredAsterisk from 'src/components/common/Form/RequiredAsterisk';
import CheckboxFieldSet from 'src/components/common/Form/fieldsets/CheckboxFieldSet';
import SelectFieldSet from 'src/components/common/Form/fieldsets/SelectFieldSet';
import useRecaptcha, { RecaptchaToken } from 'src/hooks/useRecaptcha';
import Notification from 'src/components/common/Notification';
import { FormErrorsDictionary } from 'src/i18n/locales/en/formErrors';
import { axiosClient } from 'src/services/api/axiosClient';
import { API } from 'src/constants';
import Form from 'src/components/common/Form';
import RecaptchaCheckbox from 'src/components/common/Form/RecaptchaCheckbox';
import { InviteFormTextDictionary } from 'src/i18n/locales/en/inviteFormText';
import { InviteFormLabelsDictionary } from 'src/i18n/locales/en/inviteFormLabels';
import FormSection from 'src/components/common/Form/FormSection';
import Button from 'src/components/common/Button';
import layoutStyles from 'src/components/layouts/SideImageLayout/SideImageLayout.module.scss';
import { useModal } from 'src/components/common/Modal';
import ConsentGroupModal from 'src/components/views/Invite/ConsentGroupModal';
import { ValidLanguage } from 'src/i18n';

import { ConsentGroupOption } from './types';
import formStyles from './ClinicianInviteForm.module.scss';

const styles = Object.assign({}, formStyles, layoutStyles);

const consentGroupsRequiringGuardian: ConsentGroup[] = [
	ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR,
	ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT,
];

const ClinicianInviteFormComponent = ({
	consentGroupOptions,
	currentLang,
	errorsDict,
	labelsDict,
	textDict,
}: {
	consentGroupOptions: ConsentGroupOption[];
	currentLang: ValidLanguage;
	errorsDict: FormErrorsDictionary;
	labelsDict: InviteFormLabelsDictionary;
	textDict: InviteFormTextDictionary;
}) => {
	// setup submit button enabled status
	const [enableSubmit, setEnableSubmit] = useState<boolean>(false);
	const handleEnableSubmit = (isValid: boolean, recaptchaToken: RecaptchaToken) => {
		// enable submit button if the form & recaptcha are both valid
		setEnableSubmit(isValid && !!recaptchaToken);
	};

	// setup react-hook-forms
	const methods = useForm<ClinicianInviteRequest>({
		mode: 'onBlur',
		resolver: zodResolver(ClinicianInviteRequest),
		shouldUnregister: true,
	});

	const {
		formState: { errors, isValid },
		handleSubmit,
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
		const recaptchaToken = getRecaptchaToken();
		recaptchaToken && setRecaptchaError('');
		handleEnableSubmit(isValid, recaptchaToken);
		onRecaptchaChange();
	};

	const onSubmit: SubmitHandler<ClinicianInviteRequest> = (data, event) => {
		event?.preventDefault();

		const recaptchaToken = getRecaptchaToken();

		if (recaptchaToken) {
			console.log('form data', data);
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

	// toggle submit button's enabled status when isValid & recaptcha change
	useEffect(() => {
		const recaptchaToken = getRecaptchaToken();
		handleEnableSubmit(isValid, recaptchaToken);
	}, [getRecaptchaToken, isValid]);

	// watch consentGroup value & show/hide guardian info fields if participant is a minor.
	// guardian fields register on mount, in their input component.
	// they unregister on unmount, with `shouldUnregister: true`
	const watchConsentGroup = watch('consentGroup');
	const [showGuardianFields, setShowGuardianFields] = useState<boolean>(false);
	useEffect(() => {
		const enableGuardianFields = consentGroupsRequiringGuardian.includes(watchConsentGroup);
		setShowGuardianFields(enableGuardianFields);
	}, [watchConsentGroup]);

	// setup consent group info modal
	const { openModal, closeModal } = useModal();

	const consentGroupModalConfig = {
		title: textDict.consentGroups,
		actionButtonText: 'OK',
		onActionClick: closeModal,
		onCancelClick: closeModal,
		body: <ConsentGroupModal currentLang={currentLang} />,
	};

	const handleConsentGroupInfoButtonClick = () => openModal(consentGroupModalConfig);

	return (
		<FormProvider {...methods}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FormSection>
					<h3 className={styles.sectionTitle}>{textDict.patientInformation}</h3>
					<p className={styles.smallText}>
						<RequiredAsterisk /> {textDict.indicatesRequiredField}
					</p>
					<TextFieldSet
						error={errors.participantFirstName?.type && errorsDict.required}
						label={labelsDict.firstName || ''}
						name="participantFirstName"
						required
						tooltipContent={textDict.participantFirstNameTooltip}
						withNarrowDesktopLayout
					/>
					<TextFieldSet
						error={errors.participantLastName?.type && errorsDict.required}
						label={labelsDict.lastName || ''}
						name="participantLastName"
						required
						tooltipContent={textDict.participantLastNameTooltip}
						withNarrowDesktopLayout
					/>
					<TextFieldSet
						error={errors.participantPreferredName?.type && errorsDict.required}
						label={labelsDict.preferredName || ''}
						name="participantPreferredName"
						tooltipContent={textDict.participantPreferredNameTooltip}
						withNarrowDesktopLayout
					/>

					<SelectFieldSet
						error={errors.consentGroup?.type && errorsDict.required}
						infoButtonProps={{
							label: textDict.learnMoreConsentGroups,
							onClick: handleConsentGroupInfoButtonClick,
						}}
						label={labelsDict.consentGroup || ''}
						name="consentGroup"
						options={consentGroupOptions}
						placeholder={textDict.selectPlaceholder || ''}
						required
						tooltipContent={textDict.consentGroupTooltip}
						withNarrowDesktopLayout
					/>

					<TextFieldSet
						tooltipContent={textDict.participantPhoneNumberTooltip}
						error={errors.participantPhoneNumber?.type && errorsDict.required}
						label={labelsDict.phone || ''}
						name="participantPhoneNumber"
						required
						withNarrowDesktopLayout
					/>
					<TextFieldSet
						error={errors.participantEmailAddress?.type && errorsDict.required}
						label={labelsDict.email || ''}
						name="participantEmailAddress"
						required
						tooltipContent={textDict.participantEmailAddressTooltip}
						withNarrowDesktopLayout
					/>
				</FormSection>

				{showGuardianFields && (
					<FormSection variant="grey">
						{/*
						 * guardian fields are marked required in the UI & optional in zod schema.
						 * they're required if they're visible,
						 * i.e. if the user has indicated the participant is a minor
						 */}
						<p>{textDict.enterGuardianInfo}</p>
						<TextFieldSet
							error={errors.guardianName?.type && errorsDict.required}
							label={labelsDict.guardianName || ''}
							name="guardianName"
							required
							withNarrowDesktopLayout
						/>
						<TextFieldSet
							error={errors.guardianPhoneNumber?.type && errorsDict.required}
							label={labelsDict.guardianPhone || ''}
							name="guardianPhoneNumber"
							required
							tooltipContent={textDict.guardianPhoneNumberTooltip}
							type="tel"
							withNarrowDesktopLayout
						/>
						<TextFieldSet
							error={errors.guardianEmailAddress?.type && errorsDict.required}
							label={labelsDict.email || ''}
							name="guardianEmailAddress"
							required
							tooltipContent={textDict.guardianEmailAddressTooltip}
							type="email"
							withNarrowDesktopLayout
						/>
						<TextFieldSet
							error={errors.guardianRelationship?.type && errorsDict.required}
							label={labelsDict.guardianRelationship || ''}
							name="guardianRelationship"
							required
							withNarrowDesktopLayout
						/>
						<p>
							{textDict.uploadFileDescription1}
							<a href="">{textDict.uploadFileLink}</a>
							{/* TODO download assent form https://github.com/OHCRN/platform/issues/287 */}
							{textDict.uploadFileDescription2}
							{/* TODO upload assent form https://github.com/OHCRN/platform/issues/265 */}
						</p>
					</FormSection>
				)}

				<FormSection>
					<p className={styles.afterRegistering}>{textDict.afterRegistering}</p>
					<CheckboxFieldSet
						description={textDict.consentContactDescription}
						error={errors.consentToBeContacted?.type && errorsDict.required}
						name="consentToBeContacted"
						required
						title={labelsDict.consentContact}
					/>
				</FormSection>

				<FormSection>
					<h3 className={clsx(styles.sectionTitle, styles.clinicianTitle)}>
						{textDict.clinicianInformation}
					</h3>
					<TextFieldSet
						error={errors.clinicianTitleOrRole?.type && errorsDict.required}
						label={labelsDict.clinicianTitleOrRole || ''}
						name="clinicianTitleOrRole"
						required
						withNarrowDesktopLayout
					/>
					<TextFieldSet
						error={errors.clinicianFirstName?.type && errorsDict.required}
						label={labelsDict.clinicianFirstName || ''}
						name="clinicianFirstName"
						required
						withNarrowDesktopLayout
					/>
					<TextFieldSet
						error={errors.clinicianLastName?.type && errorsDict.required}
						label={labelsDict.clinicianLastName || ''}
						name="clinicianLastName"
						required
						withNarrowDesktopLayout
					/>
					<TextFieldSet
						error={errors.clinicianInstitutionalEmailAddress?.type && errorsDict.required}
						label={labelsDict.clinicianInstitutionalEmailAddress || ''}
						name="clinicianInstitutionalEmailAddress"
						required
						tooltipContent={textDict.clinicianInstitutionalEmailAddressTooltip}
						type="email"
						withNarrowDesktopLayout
					/>
				</FormSection>

				<FormSection>
					{recaptchaError && (
						<Notification level="error" variant="small" title={`Error: ${recaptchaError}`} />
					)}

					<div className={styles.recaptchaCheckbox}>
						<RecaptchaCheckbox
							onChange={handleRecaptchaChange}
							recaptchaCheckboxRef={recaptchaCheckboxRef}
						/>
					</div>

					<Button
						className={styles.submitButton}
						color={enableSubmit ? 'green' : 'default'}
						type="submit"
					>
						{textDict.submit}
					</Button>
				</FormSection>
			</Form>
		</FormProvider>
	);
};

export default ClinicianInviteFormComponent;
