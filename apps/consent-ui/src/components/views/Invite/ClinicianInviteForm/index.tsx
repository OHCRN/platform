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
import { ConsentGroup, ClinicianInviteBase, EmptyOrOptionalName } from 'types/entities';
import { ClinicianInviteRequest } from 'types/consentApi';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { hasRequiredGuardianInformation } from 'types/common';
import axios from 'axios';

import TextFieldSet from 'src/components/common/Form/fieldsets/TextFieldSet';
import RequiredAsterisk from 'src/components/common/Form/RequiredAsterisk';
import CheckboxFieldSet from 'src/components/common/Form/fieldsets/CheckboxFieldSet';
import SelectFieldSet from 'src/components/common/Form/fieldsets/SelectFieldSet';
import useRecaptcha, { RecaptchaToken } from 'src/hooks/useRecaptcha';
import Notification from 'src/components/common/Notification';
import { FormErrorsDictionary } from 'src/i18n/locales/en/formErrors';
import Form from 'src/components/common/Form';
import RecaptchaCheckbox from 'src/components/common/Form/RecaptchaCheckbox';
import FormSection from 'src/components/common/Form/FormSection';
import Button from 'src/components/common/Button';
import layoutStyles from 'src/components/layouts/SideImageLayout/SideImageLayout.module.scss';
import ConsentGroupModal from 'src/components/views/Invite/ConsentGroupModal';
import { ValidLanguage } from 'src/i18n';
import { InviteFormLabelsDictionary } from 'src/i18n/locales/en/inviteFormLabels';
import { InviteFormTextDictionary } from 'src/i18n/locales/en/inviteFormText';
import { useNotification } from 'src/components/providers/NotificationProvider';
import { getLocalizedRoute } from 'src/components/common/Link/utils';
import { useModal } from 'src/components/providers/ModalProvider';
import { handleMouseDownBlur } from 'src/components/utils';
import { formatFormRequest } from 'src/components/common/Form/utils';

import { ConsentGroupOption } from './types';
import formStyles from './ClinicianInviteForm.module.scss';

const styles = Object.assign({}, formStyles, layoutStyles);

const ClinicianInviteFormRequest = ClinicianInviteBase.extend({
	participantPreferredName: EmptyOrOptionalName,
}).refine(hasRequiredGuardianInformation);

type ClinicianInviteFormRequest = z.infer<typeof ClinicianInviteFormRequest>;

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
	const { showNotification } = useNotification();
	const router = useRouter();

	// setup submit button enabled status
	const [enableSubmit, setEnableSubmit] = useState<boolean>(false);
	const handleEnableSubmit = (isValid: boolean, recaptchaToken: RecaptchaToken) => {
		// enable submit button if the form & recaptcha are both valid
		setEnableSubmit(isValid && !!recaptchaToken);
	};

	// setup react-hook-forms
	const methods = useForm<ClinicianInviteFormRequest>({
		defaultValues: {
			clinicianFirstName: 'dr',
			clinicianInstitutionalEmailAddress: 'hello@example.com',
			clinicianLastName: 'nick',
			clinicianTitleOrRole: 'doctor',
			consentGroup: 'ADULT_CONSENT',
			consentToBeContacted: true,
			participantEmailAddress: 'hello@example.com',
			participantFirstName: 'homer',
			participantLastName: 'simpson',
			participantPhoneNumber: '1234567890',
		},
		mode: 'onBlur',
		resolver: zodResolver(ClinicianInviteFormRequest),
		shouldUnregister: true,
	});

	const {
		formState: { errors, isSubmitting, isValid },
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
		onRecaptchaChange(recaptchaToken);
	};

	const onSubmit: SubmitHandler<ClinicianInviteRequest> = (data, event) => {
		// prevent page refresh on submit
		event?.preventDefault();

		const recaptchaToken = getRecaptchaToken();

		if (recaptchaToken) {
			const formattedData = formatFormRequest(data);
			axios
				.post('http://localhost:3000/api/mock', {
					body: { ...formattedData, recaptchaToken },
				})
				.then(() => {
					showNotification({ page: 'home', notification: 'inviteSent' });
					router.push(getLocalizedRoute(currentLang, 'home'));
				})
				.catch(() => {
					// TODO set a different error
					setRecaptchaError('Something went wrong');
				})
				.finally(() => {
					resetRecaptcha();
				});
		} else {
			setRecaptchaError('Please complete captcha');
		}
	};

	// toggle submit button's enabled status when isValid changes
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
	const { openModal } = useModal();
	const consentGroupModalConfig = {
		modalComponent: <ConsentGroupModal currentLang={currentLang} />,
	};
	const handleConsentGroupInfoButtonClick = () => openModal(consentGroupModalConfig);

	return (
		<FormProvider {...methods}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				{/* HEADING */}
				<FormSection>
					<h3 className={styles.sectionTitle}>{textDict.patientInformation}</h3>
					<p className={styles.smallText}>
						<RequiredAsterisk /> {textDict.indicatesRequiredField}
					</p>
				</FormSection>

				{/* SECTION - PARTICIPANT INFO */}
				<FormSection>
					<TextFieldSet
						error={errors.participantFirstName?.type && errorsDict.required}
						label={labelsDict.firstName}
						name="participantFirstName"
						required
						description={textDict.participantFirstNameTooltip}
					/>
					<TextFieldSet
						error={errors.participantLastName?.type && errorsDict.required}
						label={labelsDict.lastName}
						name="participantLastName"
						required
						description={textDict.participantLastNameTooltip}
					/>
					<TextFieldSet
						error={errors.participantPreferredName?.type && errorsDict.required}
						label={labelsDict.preferredName}
						name="participantPreferredName"
						description={textDict.participantPreferredNameTooltip}
					/>

					<SelectFieldSet
						error={errors.consentGroup?.type && errorsDict.required}
						infoButtonProps={{
							label: textDict.learnMoreConsentGroups,
							onClick: handleConsentGroupInfoButtonClick,
						}}
						label={labelsDict.consentGroup}
						name="consentGroup"
						options={consentGroupOptions}
						placeholder={textDict.selectPlaceholder}
						required
						description={textDict.consentGroupTooltip}
					/>

					<TextFieldSet
						description={textDict.participantPhoneNumberTooltip}
						error={errors.participantPhoneNumber?.type && errorsDict.required}
						label={labelsDict.phone}
						name="participantPhoneNumber"
						required
					/>
					<TextFieldSet
						error={errors.participantEmailAddress?.type && errorsDict.required}
						label={labelsDict.email}
						name="participantEmailAddress"
						required
						description={textDict.participantEmailAddressTooltip}
					/>
				</FormSection>

				{/* SECTION - GUARDIAN INFO */}
				{/* show/hide this field with conditional rendering.
						fields will be removed from form state when hidden. */}
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
							label={labelsDict.guardianName}
							name="guardianName"
							required
						/>
						<TextFieldSet
							error={errors.guardianPhoneNumber?.type && errorsDict.required}
							label={labelsDict.guardianPhone}
							name="guardianPhoneNumber"
							required
							description={textDict.guardianPhoneNumberTooltip}
							type="tel"
						/>
						<TextFieldSet
							error={errors.guardianEmailAddress?.type && errorsDict.required}
							label={labelsDict.email}
							name="guardianEmailAddress"
							required
							description={textDict.guardianEmailAddressTooltip}
							type="email"
						/>
						<TextFieldSet
							error={errors.guardianRelationship?.type && errorsDict.required}
							label={labelsDict.guardianRelationship}
							name="guardianRelationship"
							required
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

				{/* SECTION - CLINICIAN INFO */}
				<FormSection>
					<h3 className={clsx(styles.sectionTitle, styles.clinicianTitle)}>
						{textDict.clinicianInformation}
					</h3>
					<TextFieldSet
						error={errors.clinicianTitleOrRole?.type && errorsDict.required}
						label={labelsDict.clinicianTitleOrRole}
						name="clinicianTitleOrRole"
						required
					/>
					<TextFieldSet
						error={errors.clinicianFirstName?.type && errorsDict.required}
						label={labelsDict.clinicianFirstName}
						name="clinicianFirstName"
						required
					/>
					<TextFieldSet
						error={errors.clinicianLastName?.type && errorsDict.required}
						label={labelsDict.clinicianLastName}
						name="clinicianLastName"
						required
					/>
					<TextFieldSet
						error={errors.clinicianInstitutionalEmailAddress?.type && errorsDict.required}
						label={labelsDict.clinicianInstitutionalEmailAddress}
						name="clinicianInstitutionalEmailAddress"
						required
						description={textDict.clinicianInstitutionalEmailAddressTooltip}
						type="email"
					/>
				</FormSection>

				{/* SECTION - RECAPTCHA & SUBMIT */}
				<FormSection>
					{recaptchaError && (
						<Notification level="error" variant="small" title={`Error: ${recaptchaError}`} />
					)}

					<div className={styles.recaptchaCheckbox}>
						<RecaptchaCheckbox
							onChange={handleRecaptchaChange}
							recaptchaCheckboxRef={recaptchaCheckboxRef}
							currentLang={currentLang}
						/>
					</div>

					<Button
						className={styles.submitButton}
						color={enableSubmit && !isSubmitting ? 'green' : 'default'}
						disabled={isSubmitting}
						onMouseDown={handleMouseDownBlur}
						type="submit"
					>
						{isSubmitting ? '...' : textDict.submit}
					</Button>
				</FormSection>
			</Form>
		</FormProvider>
	);
};

export default ClinicianInviteFormComponent;
