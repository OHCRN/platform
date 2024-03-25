/*
 * Copyright (c) 2024 The Ontario Institute for Cancer Research. All rights reserved
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

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { checkIsMinimumAgeOrGreater } from 'types/common';
import { RegisterFormStep1 } from 'types/consentUi';

import useModal from 'src/components/common/Modal/useModal';
import { FormErrorsDictionary } from 'src/i18n/locales/en/formErrors';
import Form from 'src/components/common/Form';
import FormSection from 'src/components/common/Form/FormSection';
import TextFieldSet from 'src/components/common/Form/fieldsets/TextFieldSet';
import Button from 'src/components/common/Button';
import { OHCRN_HELP_CENTRE_URL } from 'src/constants/externalPaths';
import { RegisterFormStep1LabelsDictionary } from 'src/i18n/locales/en/registerFormStep1Labels';
import { RegisterFormStep1TextDictionary } from 'src/i18n/locales/en/registerFormStep1Text';
import { handleMouseDownBlur } from 'src/components/utils';
import CalendarFieldSet from 'src/components/common/Form/fieldsets/CalendarFieldSet';
import { ValidLanguage } from 'src/i18n/types';
import { RegisterDateOfBirthErrorModalDictionary } from 'src/i18n/locales/en/registerDateOfBirthErrorModal';
import RadioFieldSet from 'src/components/common/Form/fieldsets/RadioFieldSet';

import { MockInviteDataRegisterStep1 } from '../handleInvite';
import { getUserType } from '../../Dashboard/generateConsentPdf';

import styles from './RegisterForm.module.scss';
import RegisterDateOfBirthErrorModal from './RegisterDateOfBirthErrorModal';

interface FormStep1Props {
	className?: string;
	currentLang: ValidLanguage;
	errorsDict: FormErrorsDictionary;
	handleNextClick: (data: RegisterFormStep1) => void;
	inviteData?: MockInviteDataRegisterStep1;
	labelsDict: RegisterFormStep1LabelsDictionary;
	textDict: RegisterFormStep1TextDictionary;
	dateOfBirthModalDict: RegisterDateOfBirthErrorModalDictionary;
}

const FormStep1 = ({
	className,
	currentLang,
	errorsDict,
	handleNextClick,
	inviteData,
	labelsDict,
	textDict,
	dateOfBirthModalDict,
}: FormStep1Props) => {
	// setup react-hook-forms
	const methods = useForm<RegisterFormStep1>({
		defaultValues: {
			...(inviteData || {}),
			isGuardian: inviteData?.consentGroup
				? getUserType(inviteData.consentGroup) !== 'participant'
				: undefined,
			isInvited: !!inviteData,
		},
		mode: 'onBlur',
		resolver: zodResolver(RegisterFormStep1),
		shouldUnregister: true,
	});

	const {
		formState: { errors, isValid },
		getValues,
		handleSubmit,
		register,
		watch,
	} = methods;

	const onSubmit: SubmitHandler<RegisterFormStep1> = (data, event) => {
		event?.preventDefault();
		handleNextClick(data);
	};

	// watch isInvited field to determine if the isGuardian radio field should be shown
	const watchIsInvited = watch('isInvited');

	// watch isGuardian field to determine whether to show guardian fields
	// and participant phone number
	const watchIsGuardian = watch('isGuardian');

	// check if user's birthdate meets age requirements.
	// if it doesn't, show a warning modal.
	// invited users are exempt from the age check.
	const { closeModal, openModal, modalIsOpen } = useModal();
	const handleDateOfBirthBlur = () => {
		const dateOfBirthValue = getValues('dateOfBirth');
		if (dateOfBirthValue && !watchIsInvited) {
			const currentDate = new Date();
			const dateOfBirth = new Date(dateOfBirthValue);
			const userIsMinimumAgeOrGreater = checkIsMinimumAgeOrGreater(currentDate, dateOfBirth);
			if (!userIsMinimumAgeOrGreater) {
				openModal();
			}
		}
	};

	return (
		<>
			<RegisterDateOfBirthErrorModal
				closeModal={closeModal}
				currentLang={currentLang}
				modalIsOpen={modalIsOpen}
				dateOfBirthModalDict={dateOfBirthModalDict}
			/>
			<FormProvider {...methods}>
				<Form className={className} onSubmit={handleSubmit(onSubmit)}>
					<input disabled hidden={true} {...register('isInvited')} />

					{/* SECTION - CHECK IF USER IS A GUARDIAN */}
					{!watchIsInvited && (
						<FormSection>
							<RadioFieldSet
								description={textDict.isGuardianDescription}
								error={errors.isGuardian?.type && errorsDict.required}
								name="isGuardian"
								noText={labelsDict.no}
								required
								yesText={labelsDict.yes}
							/>
						</FormSection>
					)}

					{/* OPTIONAL SECTION - GUARDIAN INFO */}
					{/* these fields are conditionally required, i.e. if the user is
						registering as a guardian */}

					{watchIsGuardian && (
						<FormSection variant={watchIsInvited ? 'white' : 'grey'}>
							<p className={styles.instructions}>{textDict.enterInfo}</p>
							<TextFieldSet
								error={errors.guardianName?.type && errorsDict.required}
								label={labelsDict.yourName}
								name="guardianName"
								required
							/>
							<TextFieldSet
								error={errors.guardianPhoneNumber?.type && errorsDict.required}
								label={labelsDict.yourPhone}
								name="guardianPhoneNumber"
								required
							/>
							<TextFieldSet
								error={errors.guardianRelationship?.type && errorsDict.required}
								label={labelsDict.yourRelationship}
								name="guardianRelationship"
								required
							/>
						</FormSection>
					)}

					{/* SECTION - PARTICIPANT INFO */}
					<FormSection>
						<p className={styles.instructions}>{textDict.enterParticipantInfo}</p>
						<TextFieldSet
							error={errors.participantOhipFirstName?.type && errorsDict.required}
							label={labelsDict.firstName}
							name="participantOhipFirstName"
							required
							description={textDict.participantFirstNameTooltip}
						/>
						<TextFieldSet
							error={errors.participantOhipLastName?.type && errorsDict.required}
							label={labelsDict.lastName}
							name="participantOhipLastName"
							required
							description={textDict.participantLastNameTooltip}
						/>
						<TextFieldSet
							error={errors.participantPreferredName?.type && errorsDict.required}
							label={labelsDict.preferredName}
							name="participantPreferredName"
							description={textDict.participantPreferredNameTooltip}
						/>
						{!watchIsGuardian && (
							<TextFieldSet
								error={errors.participantPhoneNumber?.type && errorsDict.required}
								label={labelsDict.phone}
								name="participantPhoneNumber"
								required
								description={textDict.participantPhoneNumberTooltip}
							/>
						)}
						<CalendarFieldSet
							currentLang={currentLang}
							description={textDict.dateOfBirthTooltip}
							error={errors.dateOfBirth?.type && errorsDict.required}
							label={labelsDict.dateOfBirth}
							name="dateOfBirth"
							onBlur={handleDateOfBirthBlur}
							required
						/>
					</FormSection>

					{/* SECTION - CONTACT AFTER REGISTERING NOTICE */}
					<div className={styles.afterRegistering}>
						<p>{textDict.afterRegistering}</p>
						{/* TODO add link to help centre #367 */}
						<Link className={styles.questionsLink} href={OHCRN_HELP_CENTRE_URL}>
							{textDict.questions}
						</Link>
					</div>

					{/* GO TO NEXT PAGE */}
					<div className={styles.buttonWrapper}>
						<Button
							action="next"
							aria-label={`${textDict.goToStep} 2`}
							color={isValid ? 'green' : 'default'}
							onMouseDown={handleMouseDownBlur}
							type="submit"
						>
							{textDict.next}
						</Button>
					</div>
				</Form>
			</FormProvider>
		</>
	);
};

export default FormStep1;
