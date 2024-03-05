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

import { useState } from 'react';
import { RegisterFormStep1 } from 'types/consentUi';

import { ValidLanguage } from 'src/i18n';
import { FormErrorsDictionary } from 'src/i18n/locales/en/formErrors';
import { RegisterFormTextDictionary } from 'src/i18n/locales/en/registerFormText';
import RequiredAsterisk from 'src/components/common/Form/RequiredAsterisk';
import { scrollToTop } from 'src/components/utils';
import { RegisterFormStep1LabelsDictionary } from 'src/i18n/locales/en/registerFormStep1Labels';
import { RegisterFormStep2LabelsDictionary } from 'src/i18n/locales/en/registerFormStep2Labels';
import { RegisterFormStep2TextDictionary } from 'src/i18n/locales/en/registerFormStep2Text';
import { RegisterFormStep1TextDictionary } from 'src/i18n/locales/en/registerFormStep1Text';

import styles from './RegisterForm.module.scss';
import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';

const RegisterForm = ({
	currentLang,
	errorsDict,
	step1LabelsDict,
	step1TextDict,
	step2LabelsDict,
	step2TextDict,
	textDict,
	stepTitleDict,
}: {
	currentLang: ValidLanguage;
	errorsDict: FormErrorsDictionary;
	step1LabelsDict: RegisterFormStep1LabelsDictionary;
	step1TextDict: RegisterFormStep1TextDictionary;
	step2LabelsDict: RegisterFormStep2LabelsDictionary;
	step2TextDict: RegisterFormStep2TextDictionary;
	textDict: RegisterFormTextDictionary;
	stepTitleDict: Record<1 | 2, string>;
}) => {
	const [step1Data, setStep1Data] = useState<RegisterFormStep1 | undefined>(undefined);

	// setup 2-step form
	// - show/hide step 1 with CSS only, so the fields are always in form state.
	// - step 1 must be valid to proceed to step 2.
	// - show/hide guardian section & step 2 with conditional rendering.
	//   - these fields will unregister on unmount (removed from form state & validation)
	const [currentStep, setCurrentStep] = useState<1 | 2>(1);
	const handleNextClick = (data: RegisterFormStep1) => {
		setStep1Data(data);
		scrollToTop();
		setCurrentStep(2);
	};
	const handleBackClick = () => {
		scrollToTop();
		setCurrentStep(1);
	};

	return (
		<>
			<h3 className={styles.stepTitle}>{stepTitleDict[currentStep]}</h3>
			<p className={styles.smallText}>
				<RequiredAsterisk /> {textDict.indicatesRequiredField}
			</p>

			<FormStep1
				className={currentStep === 1 ? styles.visible : styles.hidden}
				currentLang={currentLang}
				errorsDict={errorsDict}
				handleNextClick={handleNextClick}
				labelsDict={step1LabelsDict}
				textDict={step1TextDict}
			/>

			{currentStep === 2 && (
				<FormStep2
					currentLang={currentLang}
					errorsDict={errorsDict}
					handleBackClick={handleBackClick}
					labelsDict={step2LabelsDict}
					step1Data={step1Data}
					textDict={step2TextDict}
				/>
			)}
		</>
	);
};

export default RegisterForm;
