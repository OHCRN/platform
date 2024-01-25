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

import { ValidLanguage, replaceParams } from 'src/i18n';
import { FormErrorsDictionary } from 'src/i18n/locales/en/formErrors';
import { RegisterFormLabelsDictionary } from 'src/i18n/locales/en/registerFormLabels';
import { RegisterFormTextDictionary } from 'src/i18n/locales/en/registerFormText';
import FormSection from 'src/components/common/Form/FormSection';
import RequiredAsterisk from 'src/components/common/Form/RequiredAsterisk';

import styles from './RegistrationForm.module.scss';
import RegistrationFormStep1 from './RegistrationFormStep1';
import { RegisterFormStep1 } from './types';
import RegistrationFormStep2 from './RegistrationFormStep2';

// followup tickets
// date & radio inputs https://github.com/OHCRN/platform/issues/366
// backend https://github.com/OHCRN/platform/issues/368
// help centre link https://github.com/OHCRN/platform/issues/367

const RegistrationForm = ({
	currentLang,
	errorsDict,
	labelsDict,
	textDict,
}: {
	currentLang: ValidLanguage;
	errorsDict: FormErrorsDictionary;
	labelsDict: RegisterFormLabelsDictionary;
	textDict: RegisterFormTextDictionary;
}) => {
	const [step1Data, setStep1Data] = useState<RegisterFormStep1 | undefined>(undefined);

	// setup 2-step form
	// - show/hide step 1 with CSS only, so the fields are always in form state.
	// - step 1 must be valid to proceed to step 2.
	// - show/hide guardian section & step 2 with conditional rendering.
	//   - these fields will unregister on unmount (removed from form state & validation)
	const STEP_COUNT = 2;
	const [currentStep, setCurrentStep] = useState<1 | 2>(1);
	const handleNextClick = (data: RegisterFormStep1) => {
		setStep1Data(data);
		setCurrentStep(2);
		window.scroll(0, 0);
	};
	const handleBackClick = () => {
		setCurrentStep(1);
		window.scroll(0, 0);
	};
	return (
		<>
			<FormSection>
				<h3 className={styles.stepTitle}>
					{replaceParams(textDict.stepCurrentOfTotal, {
						current: currentStep,
						total: STEP_COUNT,
					})}
				</h3>
				<p className={styles.smallText}>
					<RequiredAsterisk /> {textDict.indicatesRequiredField}
				</p>
			</FormSection>

			<RegistrationFormStep1
				className={currentStep === 1 ? styles.visible : styles.hidden}
				currentLang={currentLang}
				errorsDict={errorsDict}
				handleNextClick={handleNextClick}
				labelsDict={labelsDict}
				textDict={textDict}
			/>

			{currentStep === 2 && (
				<RegistrationFormStep2
					currentLang={currentLang}
					errorsDict={errorsDict}
					handleBackClick={handleBackClick}
					labelsDict={labelsDict}
					step1Data={step1Data}
					textDict={textDict}
				/>
			)}
		</>
	);
};

export default RegistrationForm;
