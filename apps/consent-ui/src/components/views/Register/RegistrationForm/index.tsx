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
import { z } from 'zod';
import { Name, PhoneNumber } from 'types/entities';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import { ValidLanguage } from 'src/i18n';
import { FormErrorsDictionary } from 'src/i18n/locales/en/formErrors';
import { RegisterFormLabelsDictionary } from 'src/i18n/locales/en/registerFormLabels';
import { RegisterFormTextDictionary } from 'src/i18n/locales/en/registerFormText';
import Form from 'src/components/common/Form';
import FormSection from 'src/components/common/Form/FormSection';
import TextFieldSet from 'src/components/common/Form/fieldsets/TextFieldSet';
import Button from 'src/components/common/Button';
import RequiredAsterisk from 'src/components/common/Form/RequiredAsterisk';
import { OHCRN_HELP_CENTRE_URL } from 'src/constants/externalPaths';
import CheckboxFieldSet from 'src/components/common/Form/fieldsets/CheckboxFieldSet';

import styles from './RegistrationForm.module.scss';

// followup tickets
// date & radio inputs https://github.com/OHCRN/platform/issues/366
// backend https://github.com/OHCRN/platform/issues/368
// help centre link https://github.com/OHCRN/platform/issues/367

// TODO hookup backend #368
// create a better zod schema with conditional validation,
// and optional name fields
const RegisterRequestStub = z.object({
	confirmPassword: z.string().min(1), // TEMP #368
	consentToBeContacted: z.boolean(),
	dateOfBirth: z.date(), // TEMP #366
	guardianName: Name,
	guardianPhoneNumber: PhoneNumber,
	guardianRelationship: Name,
	participantEmailAddress: z.string().email(),
	participantFirstName: Name,
	participantLastName: Name,
	participantPhoneNumber: PhoneNumber,
	participantPreferredName: Name,
	password: z.string().min(1), // TEMP #368
	// registeringOnBehalfOfSomeoneElse: z.boolean(), TODO #366
	// commenting this out because the form won't work
	// with unused fields in the Zod schema
	useSubstituteDecisionMaker: z.boolean(),
});
type RegisterRequestStub = z.infer<typeof RegisterRequestStub>;

const RegistrationForm = ({
	errorsDict,
	labelsDict,
	textDict,
}: {
	currentLang: ValidLanguage;
	errorsDict: FormErrorsDictionary;
	labelsDict: RegisterFormLabelsDictionary;
	textDict: RegisterFormTextDictionary;
}) => {
	// setup react-hook-forms
	const methods = useForm<RegisterRequestStub>({
		resolver: zodResolver(RegisterRequestStub),
	});

	const {
		formState: { errors },
		handleSubmit,
		setFocus,
	} = methods;

	const onSubmit: SubmitHandler<RegisterRequestStub> = (data, event) => {
		event?.preventDefault();
		// TODO #366 don't submit form if participant is a minor
		console.log(data);
	};

	// setup 2-step form
	// hide inactive step with CSS only, to maintain form state
	const STEP_COUNT = 2;
	const [currentStep, setCurrentStep] = useState<1 | 2>(1);
	const handleNextClick = () => setCurrentStep(2);
	const handleBackClick = () => setCurrentStep(1);

	useEffect(() => {
		// go to top of page on step change
		window.scrollTo(0, 0);
		// set focus to first input in the current step
		if (currentStep === 1) {
			setFocus('guardianName'); // TODO #366 change to registeringOnBehalfOfSomeoneElse
		} else if (currentStep === 2) {
			setFocus('participantEmailAddress');
		}
	}, [currentStep, setFocus]);

	return (
		<FormProvider {...methods}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				{/* HEADING */}
				<h3 className={styles.stepTitle}>
					{textDict.stepXofY1} {currentStep} {textDict.stepXofY2} {STEP_COUNT}
				</h3>
				<p className={styles.smallText}>
					<RequiredAsterisk /> {textDict.indicatesRequiredField}
				</p>

				{/* BEGIN STEP 1 */}
				<div className={currentStep === 1 ? styles.visible : styles.hidden}>
					{/* SECTION - REGISTERING ON BEHALF OF SOMEONE ELSE */}
					<FormSection>
						{/* TODO implement radio button #366
								this field is called registeringOnBehalfOfSomeoneElse in the data model */}
						{textDict.registeringForSomeoneElse} {labelsDict.yes} {labelsDict.no}
					</FormSection>

					{/* OPTIONAL SECTION - GUARDIAN INFO */}
					{/* these fields are conditionally required, i.e. if the user is
							registering on behalf of someone else */}

					{/* TODO #366 make this section optional/conditional.
							see guardian fields on invite form for an example. */}
					<FormSection variant="grey">
						<p className={styles.instructions}>{textDict.enterInfo}</p>
						<TextFieldSet
							error={errors.guardianName?.type && errorsDict.required}
							label={labelsDict.yourName || ''}
							name="guardianName"
							required
							withNarrowDesktopLayout
						/>
						<TextFieldSet
							error={errors.guardianPhoneNumber?.type && errorsDict.required}
							label={labelsDict.yourPhone || ''}
							name="guardianPhoneNumber"
							required
							withNarrowDesktopLayout
						/>
						<TextFieldSet
							error={errors.guardianRelationship?.type && errorsDict.required}
							label={labelsDict.yourPhone || ''}
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
						<TextFieldSet
							error={errors.participantPhoneNumber?.type && errorsDict.required}
							label={labelsDict.phone || ''}
							name="participantPhoneNumber"
							required
							tooltipContent={textDict.participantPhoneNumberTooltip}
							withNarrowDesktopLayout
						/>
						{/* TODO #366 implement date input */}
						<TextFieldSet
							error={errors.dateOfBirth?.type && errorsDict.required}
							label={labelsDict.dateOfBirth || ''}
							name="dateOfBirth"
							required
							tooltipContent={textDict.dateOfBirthTooltip}
							withNarrowDesktopLayout
						/>
					</FormSection>

					{/* SECTION - CONTACT AFTER REGISTERING NOTICE */}
					<FormSection>
						<p>{textDict.afterRegistering}</p>
						{/* TODO add link to help centre #367 */}
						<Link className={styles.questionsLink} href={OHCRN_HELP_CENTRE_URL}>
							{textDict.questions}
						</Link>
					</FormSection>

					{/* GO TO NEXT PAGE */}
					<div className={styles.buttonWrapper}>
						<Button
							action="next"
							aria-label={`${textDict.goToStep} 2`}
							onClick={handleNextClick}
							color="green"
						>
							{textDict.next}
						</Button>
					</div>
				</div>
				{/* END STEP 1 */}

				{/* BEGIN STEP 2 */}
				<div className={clsx(currentStep === 2 ? styles.visible : styles.hidden)}>
					{/* SECTION - EMAIL & PASSWORD */}
					<FormSection>
						<TextFieldSet
							error={errors.participantEmailAddress?.type && errorsDict.required}
							label={labelsDict.email || ''}
							name="participantEmailAddress"
							required
							withNarrowDesktopLayout
						/>
						<TextFieldSet
							error={errors.password?.type && errorsDict.required}
							label={labelsDict.password || ''}
							name="password"
							required
							withNarrowDesktopLayout
						/>
						<TextFieldSet
							error={errors.confirmPassword?.type && errorsDict.required}
							label={labelsDict.confirmPassword || ''}
							name="confirmPassword"
							required
							withNarrowDesktopLayout
						/>
					</FormSection>

					{/* SECTION - CONSENT TO BE CONTACTED */}
					<FormSection className={styles.consentCheckbox}>
						<CheckboxFieldSet
							description={textDict.consentContactDescription}
							error={errors.consentToBeContacted?.type && errorsDict.required}
							name="consentToBeContacted"
							required
							title={labelsDict.consentContact}
						/>
					</FormSection>

					{/* GO TO PREVIOUS PAGE */}
					<div className={styles.buttonWrapper}>
						<Button
							aria-label={`${textDict.goToStep} 1`}
							onClick={handleBackClick}
							variant="secondary"
						>
							{textDict.back}
						</Button>
						<Button type="submit">{textDict.createAccount}</Button>
					</div>
				</div>
				{/* END STEP 2 */}
			</Form>
		</FormProvider>
	);
};

export default RegistrationForm;
