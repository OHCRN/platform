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
import { useEffect } from 'react';
import { checkIsMinimumAgeOrGreater } from 'types/common';
import { RegisterFormStep1 } from 'types/consentUi';
import { ConsentGroup } from 'types/entities';
import { find } from 'lodash';

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

import { MockInviteDataStep1 } from '../handleInvite';

import styles from './RegisterForm.module.scss';
import RegisterDateOfBirthErrorModal from './RegisterDateOfBirthErrorModal';

interface FormStep1Props {
	className?: string;
	currentLang: ValidLanguage;
	dateOfBirthModalDict: RegisterDateOfBirthErrorModalDictionary;
	errorsDict: FormErrorsDictionary;
	handleNextClick: (data: RegisterFormStep1) => void;
	inviteData?: MockInviteDataStep1;
	labelsDict: RegisterFormStep1LabelsDictionary;
	textDict: RegisterFormStep1TextDictionary;
}

const guardianConsentGroups = [
	ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT,
	ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR,
	ConsentGroup.enum.ADULT_CONSENT_SUBSTITUTE_DECISION_MAKER,
];

const FormStep1 = ({
	className,
	currentLang,
	dateOfBirthModalDict,
	errorsDict,
	handleNextClick,
	inviteData,
	labelsDict,
	textDict,
}: FormStep1Props) => {
	// setup react-hook-forms
	const methods = useForm<RegisterFormStep1>({
		defaultValues: {
			...(inviteData || {}),
			isGuardian: inviteData
				? !!find(guardianConsentGroups, { group: inviteData?.consentGroup })
				: undefined,
			isInvited: !!inviteData?.inviteId,
		},
		mode: 'onBlur',
		resolver: zodResolver(RegisterFormStep1),
		shouldUnregister: true,
	});

	const {
		formState: { errors, isValid },
		getValues,
		handleSubmit,
		setFocus,
		watch,
	} = methods;

	const onSubmit: SubmitHandler<RegisterFormStep1> = (data, event) => {
		event?.preventDefault();
		handleNextClick(data);
	};

	useEffect(() => {
		// set focus to first field on mount
		setFocus('isGuardian');
	}, [setFocus]);

	const watchIsGuardian = watch('isGuardian');

	const { closeModal, openModal, modalIsOpen } = useModal();

	const handleDateOfBirthBlur = () => {
		const dateOfBirthValue = getValues('dateOfBirth');
		const getIsInvited = getValues('isInvited');
		// invited users don't have age restrictions
		if (dateOfBirthValue && !getIsInvited) {
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
					{/* SECTION - CHECK IF USER IS A GUARDIAN */}
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

					{/* OPTIONAL SECTION - GUARDIAN INFO */}
					{/* these fields are conditionally required, i.e. if the user is
						registering as a guardian */}

					{watchIsGuardian && (
						<FormSection variant="grey">
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
