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
// import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { ValidLanguage } from 'src/i18n';
// import { axiosClient } from 'src/services/api/axiosClient';
import { FormErrorsDictionary } from 'src/i18n/locales/en/formErrors';
import { RegisterFormLabelsDictionary } from 'src/i18n/locales/en/registerFormLabels';
import { RegisterFormTextDictionary } from 'src/i18n/locales/en/registerFormText';
import Form from 'src/components/common/Form';
import FormSection from 'src/components/common/Form/FormSection';
import TextFieldSet from 'src/components/common/Form/fieldsets/TextFieldSet';
import Button from 'src/components/common/Button';
// import { API } from 'src/constants/externalPaths';
// import CheckboxFieldSet from 'src/components/common/Form/fieldsets/CheckboxFieldSet';
// import useRecaptcha from 'src/hooks/useRecaptcha';
// import RecaptchaCheckbox from 'src/components/common/Form/RecaptchaCheckbox';
// import Notification from 'src/components/common/Notification';

import styles from './RegisterForm.module.scss';
import {
	// RegisterFormStep1,
	RegisterFormStep2,
} from './types';
import ConfirmPassword from './ConfirmPassword';

const FormStep2 = ({
	errorsDict,
	handleBackClick,
	labelsDict,
	// step1Data,
	textDict,
}: {
	currentLang: ValidLanguage;
	errorsDict: FormErrorsDictionary;
	handleBackClick: () => void;
	labelsDict: RegisterFormLabelsDictionary;
	// step1Data?: RegisterFormStep1;
	textDict: RegisterFormTextDictionary;
}) => {
	// setup react-hook-forms
	const methods = useForm<RegisterFormStep2>({
		mode: 'onBlur',
		resolver: zodResolver(RegisterFormStep2),
		shouldUnregister: true,
	});

	const {
		formState: { errors, isValid },
		handleSubmit,
		// setFocus,
	} = methods;

	console.log('isValid', isValid);

	// setup recaptcha
	// const {
	// 	getRecaptchaToken,
	// 	onRecaptchaChange,
	// 	recaptchaCheckboxRef,
	// 	recaptchaError,
	// 	resetRecaptcha,
	// 	setRecaptchaError,
	// } = useRecaptcha();

	// const handleRecaptchaChange = () => {
	// 	const token = getRecaptchaToken();
	// 	token && setRecaptchaError('');
	// 	onRecaptchaChange();
	// };

	const onSubmit: SubmitHandler<RegisterFormStep2> = (step2Data, event) => {
		event?.preventDefault();
		// TODO #366 don't submit form if participant is a minor

		// const recaptchaToken = getRecaptchaToken();

		// if (recaptchaToken) {
		// 	const data = Object.assign({}, step2Data);
		// 	axiosClient
		// 		.post(API.INVITES, { data, recaptchaToken })
		// 		.then(() => {
		// 			setRecaptchaError('');
		// 			resetRecaptcha();
		// 		})
		// 		.catch((e) => {
		// 			console.error(e);
		// 			setRecaptchaError('Something went wrong, please try again');
		// 		});
		// } else {
		// 	setRecaptchaError('Please complete captcha');
		// }
	};

	// useEffect(() => {
	// 	// set focus to first field on load
	// 	setFocus('participantEmailAddress');
	// }, [setFocus]);

	return (
		<FormProvider {...methods}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				{/* SECTION - EMAIL & PASSWORD */}
				<FormSection>
					{/* <TextFieldSet
						error={errors.participantEmailAddress?.type && errorsDict.required}
						label={labelsDict.email}
						name="participantEmailAddress"
						required
						withNarrowDesktopLayout
					/> */}
					<TextFieldSet
						error={errors.password?.type && errorsDict.required}
						label={labelsDict.password}
						name="password"
						required
						type="password"
						withNarrowDesktopLayout
					/>
					<ConfirmPassword
						labelText={labelsDict.confirmPassword}
						error={errors.confirmPassword?.type}
					/>
					{/* <TextFieldSet
						error={errors.confirmPassword?.type && errorsDict.required}
						label={labelsDict.confirmPassword}
						name="confirmPassword"
						required
						type="password"
						withNarrowDesktopLayout
					/> */}
				</FormSection>

				{/* SECTION - CONSENT TO BE CONTACTED */}
				{/* <FormSection className={styles.consentCheckbox}>
					<CheckboxFieldSet
						description={textDict.consentContactDescription}
						error={errors.consentToBeContacted?.type && errorsDict.required}
						name="consentToBeContacted"
						required
						title={labelsDict.consentContact}
					/>
				</FormSection> */}

				{/* SECTION - RECAPTCHA */}
				{/* <FormSection>
					{recaptchaError && (
						<Notification level="error" variant="small" title={`Error: ${recaptchaError}`} />
					)}

					<div className={styles.recaptchaCheckbox}>
						<RecaptchaCheckbox
							onChange={handleRecaptchaChange}
							recaptchaCheckboxRef={recaptchaCheckboxRef}
						/>
					</div>
				</FormSection> */}

				{/* GO BACK/SUBMIT */}
				<div className={styles.buttonWrapper}>
					<Button
						aria-label={`${textDict.goToStep} 1`}
						onClick={handleBackClick}
						variant="secondary"
					>
						{textDict.back}
					</Button>
					<Button type="submit" color={isValid ? 'green' : 'default'}>
						{textDict.createAccount}
					</Button>
				</div>
			</Form>
		</FormProvider>
	);
};

export default FormStep2;
