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
import { SyntheticEvent, useEffect } from 'react';

import { ValidLanguage } from 'src/i18n';
import { FormErrorsDictionary } from 'src/i18n/locales/en/formErrors';
import { RegisterFormLabelsDictionary } from 'src/i18n/locales/en/registerFormLabels';
import { RegisterFormTextDictionary } from 'src/i18n/locales/en/registerFormText';
import Form from 'src/components/common/Form';
import FormSection from 'src/components/common/Form/FormSection';
import TextFieldSet from 'src/components/common/Form/fieldsets/TextFieldSet';
import Button from 'src/components/common/Button';
import { OHCRN_HELP_CENTRE_URL } from 'src/constants/externalPaths';

import styles from './RegisterForm.module.scss';
import { RegisterFormStep1 } from './types';

const FormStep1 = ({
	className,
	errorsDict,
	handleNextClick,
	labelsDict,
	textDict,
}: {
	className?: string;
	currentLang: ValidLanguage;
	errorsDict: FormErrorsDictionary;
	handleNextClick: (data: RegisterFormStep1) => void;
	labelsDict: RegisterFormLabelsDictionary;
	textDict: RegisterFormTextDictionary;
}) => {
	// setup react-hook-forms
	const methods = useForm<RegisterFormStep1>({
		mode: 'onBlur',
		resolver: zodResolver(RegisterFormStep1),
		shouldUnregister: true,
	});

	const {
		formState: { errors, isValid },
		handleSubmit,
		setFocus,
	} = methods;

	const onSubmit: SubmitHandler<RegisterFormStep1> = (data, event) => {
		event?.preventDefault();
		// TODO #366 don't go to next page if user is a minor
		handleNextClick(data);
	};

	useEffect(() => {
		// set focus to first field on mount
		// TODO #366 change to registerOnBehalfOfSomeoneElse
		setFocus('guardianName');
	}, [setFocus]);

	const handleMouseDown = (e: SyntheticEvent) => {
		// prevent blur events from interrupting click events
		e.preventDefault();
	};

	return (
		<FormProvider {...methods}>
			<Form className={className} onSubmit={handleSubmit(onSubmit)}>
				{/* SECTION - REGISTERING ON BEHALF OF SOMEONE ELSE */}
				<FormSection>
					{/* TODO implement radio button #366
								this field is called registeringOnBehalfOfSomeoneElse in the data model */}
					{textDict.registeringForSomeoneElse} {labelsDict.yes} {labelsDict.no}
				</FormSection>

				{/* OPTIONAL SECTION - GUARDIAN INFO */}
				{/* these fields are conditionally required, i.e. if the user is
							registering on behalf of someone else */}

				{/* TODO #366 update this section - add conditional rendering.
							see guardian fields on invite form for an example. */}
				<FormSection variant="grey">
					<p className={styles.instructions}>{textDict.enterInfo}</p>
					<TextFieldSet
						error={errors.guardianName?.type && errorsDict.required}
						label={labelsDict.yourName}
						name="guardianName"
						required
						withNarrowDesktopLayout
					/>
					<TextFieldSet
						error={errors.guardianPhoneNumber?.type && errorsDict.required}
						label={labelsDict.yourPhone}
						name="guardianPhoneNumber"
						required
						withNarrowDesktopLayout
					/>
					<TextFieldSet
						error={errors.guardianRelationship?.type && errorsDict.required}
						label={labelsDict.yourRelationship}
						name="guardianRelationship"
						required
						withNarrowDesktopLayout
					/>
				</FormSection>

				{/* SECTION - PARTICIPANT INFO */}
				<FormSection>
					<p className={styles.instructions}>{textDict.enterParticipantInfo}</p>
					<TextFieldSet
						error={errors.participantFirstName?.type && errorsDict.required}
						label={labelsDict.firstName}
						name="participantFirstName"
						required
						tooltipContent={textDict.participantFirstNameTooltip}
						withNarrowDesktopLayout
					/>
					<TextFieldSet
						error={errors.participantLastName?.type && errorsDict.required}
						label={labelsDict.lastName}
						name="participantLastName"
						required
						tooltipContent={textDict.participantLastNameTooltip}
						withNarrowDesktopLayout
					/>
					<TextFieldSet
						error={errors.participantPreferredName?.type && errorsDict.required}
						label={labelsDict.preferredName}
						name="participantPreferredName"
						tooltipContent={textDict.participantPreferredNameTooltip}
						withNarrowDesktopLayout
					/>
					<TextFieldSet
						error={errors.participantPhoneNumber?.type && errorsDict.required}
						label={labelsDict.phone}
						name="participantPhoneNumber"
						required
						tooltipContent={textDict.participantPhoneNumberTooltip}
						withNarrowDesktopLayout
					/>
					{/* TODO #366 implement date input */}
					<TextFieldSet
						error={errors.dateOfBirth?.type && errorsDict.required}
						label={labelsDict.dateOfBirth}
						name="dateOfBirth"
						required
						tooltipContent={textDict.dateOfBirthTooltip}
						withNarrowDesktopLayout
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
						onMouseDown={handleMouseDown}
						type="submit"
					>
						{textDict.next}
					</Button>
				</div>
			</Form>
		</FormProvider>
	);
};

export default FormStep1;
