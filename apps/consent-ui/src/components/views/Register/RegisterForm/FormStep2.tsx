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
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { RegisterFormStep2LabelsDictionary } from 'src/i18n/locales/en/registerFormStep2Labels';
import { ValidLanguage } from 'src/i18n';
import { axiosClient } from 'src/services/api/axiosClient';
import { FormErrorsDictionary } from 'src/i18n/locales/en/formErrors';
import { RegisterFormStep2TextDictionary } from 'src/i18n/locales/en/registerFormStep2Text';
import Form from 'src/components/common/Form';
import FormSection from 'src/components/common/Form/FormSection';
import TextFieldSet from 'src/components/common/Form/fieldsets/TextFieldSet';
import Button from 'src/components/common/Button';
import CheckboxFieldSet from 'src/components/common/Form/fieldsets/CheckboxFieldSet';
import { API } from 'src/constants/externalPaths';
import useRecaptcha, { RecaptchaToken } from 'src/hooks/useRecaptcha';
import RecaptchaCheckbox from 'src/components/common/Form/RecaptchaCheckbox';
import Notification from 'src/components/common/Notification';

import styles from './RegisterForm.module.scss';
import { RegisterFormStep1, RegisterFormStep2 } from './types';

const FormStep2 = ({
	currentLang,
	errorsDict,
	handleBackClick,
	labelsDict,
	step1Data,
	textDict,
}: {
	currentLang: ValidLanguage;
	errorsDict: FormErrorsDictionary;
	handleBackClick: () => void;
	labelsDict: RegisterFormStep2LabelsDictionary;
	step1Data?: RegisterFormStep1;
	textDict: RegisterFormStep2TextDictionary;
}) => {
	// setup submit button enabled status
	const [enableSubmit, setEnableSubmit] = useState<boolean>(false);
	const handleEnableSubmit = (isValid: boolean, recaptchaToken: RecaptchaToken) => {
		// enable submit button if the form & recaptcha are both valid
		setEnableSubmit(isValid && !!recaptchaToken);
	};

	// setup react-hook-forms
	const methods = useForm<RegisterFormStep2>({
		mode: 'onBlur',
		resolver: zodResolver(RegisterFormStep2),
		shouldUnregister: true,
	});

	const {
		clearErrors,
		formState: { errors, isValid, touchedFields },
		handleSubmit,
		setError,
		setFocus,
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

	const onSubmit: SubmitHandler<RegisterFormStep2> = (step2Data, event) => {
		event?.preventDefault();

		const recaptchaToken = getRecaptchaToken();

		if (recaptchaToken) {
			const data = Object.assign({}, step1Data, step2Data);
			axiosClient
				.post(API.REGISTER, { data, recaptchaToken })
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

	useEffect(() => {
		// toggle submit button's enabled status when isValid changes
		const recaptchaToken = getRecaptchaToken();
		handleEnableSubmit(isValid, recaptchaToken);
	}, [getRecaptchaToken, isValid]);

	useEffect(() => {
		// set focus to first field on mount
		setFocus('participantEmailAddress');
	}, [setFocus]);

	// set an error on confirmPassword if the 2 password fields are different.
	// fires on first confirmPassword onBlur validation,
	// then onChange for both fields, if they both have input.
	const watchPassword = watch('password');
	const watchConfirmPassword = watch('confirmPassword');
	useEffect(() => {
		// check if password & confirmPassword have inputs
		// and confirmPassword has had a blur event
		if (watchPassword && watchConfirmPassword && touchedFields.confirmPassword) {
			if (watchPassword === watchConfirmPassword) {
				// clear error if inputs match
				clearErrors('confirmPassword');
			} else {
				// set error if inputs don't match
				setError('confirmPassword', { type: 'custom', message: 'passwordMismatch' });
			}
		}
	}, [clearErrors, setError, touchedFields.confirmPassword, watchConfirmPassword, watchPassword]);

	return (
		<FormProvider {...methods}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				{/* SECTION - EMAIL & PASSWORD */}
				<FormSection>
					<TextFieldSet
						error={errors.participantEmailAddress?.type && errorsDict.required}
						label={labelsDict.email}
						name="participantEmailAddress"
						required
					/>
					<TextFieldSet
						error={errors.password?.type && errorsDict.required}
						label={labelsDict.password}
						name="password"
						required
						type="password"
					/>
					<TextFieldSet
						error={errors.confirmPassword?.type && errorsDict.required}
						label={labelsDict.confirmPassword}
						name="confirmPassword"
						required
						type="password"
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

				{/* SECTION - RECAPTCHA */}
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
				</FormSection>

				{/* GO BACK/SUBMIT */}
				<div className={styles.buttonWrapper}>
					<Button
						aria-label={`${textDict.goToStep} 1`}
						onClick={handleBackClick}
						variant="secondary"
					>
						{textDict.back}
					</Button>
					<Button type="submit" color={enableSubmit ? 'green' : 'default'}>
						{textDict.createAccount}
					</Button>
				</div>
			</Form>
		</FormProvider>
	);
};

export default FormStep2;
