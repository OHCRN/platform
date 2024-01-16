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

import styles from './RegistrationForm.module.scss';

// followup tickets
// date & radio https://github.com/OHCRN/platform/issues/366
// backend https://github.com/OHCRN/platform/issues/368
// help centre link https://github.com/OHCRN/platform/issues/367

// TODO hookup backend #368
const RegisterRequestStub = z.object({
	confirmPassword: z.string(), // TEMP #368
	dateOfBirth: z.date(), // TEMP #366
	participantEmailAddress: z.string().email(),
	participantFirstName: Name,
	participantLastName: Name,
	participantPhoneNumber: PhoneNumber,
	participantPreferredName: Name,
	password: z.string(), // TEMP #368
	registrantName: Name,
	registrantPhoneNumber: PhoneNumber,
	registrantRelationship: Name,
	// registeringOnBehalfOfSomeoneElse: z.boolean(), #366
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
	// go to top of page on step change
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [currentStep]);

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

					{/* OPTIONAL SECTION - REGISTRANT INFO */}
					{/* these fields are conditionally required, i.e. if the user is
							registering on behalf of someone else */}

					{/* TODO #366 make this section optional/conditional.
							see guardian fields on invite form for an example. */}
					<FormSection variant="grey">
						<p>{textDict.enterInfo}</p>
						<TextFieldSet
							error={errors.registrantName?.type && errorsDict.required}
							label={labelsDict.yourName || ''}
							name="registrantName"
							required
							withNarrowDesktopLayout
						/>
						<TextFieldSet
							error={errors.registrantPhoneNumber?.type && errorsDict.required}
							label={labelsDict.yourPhone || ''}
							name="registrantPhoneNumber"
							required
							withNarrowDesktopLayout
						/>
						<TextFieldSet
							error={errors.registrantRelationship?.type && errorsDict.required}
							label={labelsDict.yourPhone || ''}
							name="registrantRelationship"
							required
							withNarrowDesktopLayout
						/>
					</FormSection>

					{/* SECTION - PARTICIPANT INFO */}
					<FormSection>
						<p>{textDict.enterParticipantInfo}</p>
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
						{/* TODO add link to help centre https://github.com/OHCRN/platform/issues/367 */}
						<Link href={OHCRN_HELP_CENTRE_URL}>{textDict.questions}</Link>
					</FormSection>

					{/* GO TO NEXT PAGE */}
					<Button onClick={handleNextClick} aria-label={`${textDict.goToStep} 2`}>
						{textDict.next}
					</Button>
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
					{/* GO TO PREVIOUS PAGE */}
					<Button onClick={handleBackClick} aria-label={`${textDict.goToStep} 1`}>
						{textDict.back}
					</Button>
					<Button type="submit">{textDict.createAccount}</Button>
				</div>
				{/* END STEP 2 */}
			</Form>
		</FormProvider>
	);
};

export default RegistrationForm;
