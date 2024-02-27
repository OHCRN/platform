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

import { ConsentRecontactRequest } from 'types/consentApi';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Form from 'src/components/common/Form';
import RadioFieldSet from 'src/components/common/Form/fieldsets/RadioFieldSet';
import TextFieldSet from 'src/components/common/Form/fieldsets/TextFieldSet';
import { ConsentRecontactFormDictionary } from 'src/i18n/locales/en/consentRecontactForm';
import FormSection from 'src/components/common/Form/FormSection';
import { FormErrorsDictionary } from 'src/i18n/locales/en/formErrors';
import { ValidLanguage } from 'src/i18n';
import { ConsentStepRouteEnum } from 'src/components/common/Link/types';

import ConsentStepsNavigation from '../../ConsentStepsNavigation';
import useGoToNextConsentStep from '../../ConsentStepsNavigation/useGoToNextConsentStep';

import styles from './ConsentRecontactForm.module.scss';

const currentConsentStep = ConsentStepRouteEnum.enum['consent-4'];

const ConsentRecontactForm = ({
	currentLang,
	errorsDict,
	formDict,
}: {
	currentLang: ValidLanguage;
	errorsDict: FormErrorsDictionary;
	formDict: ConsentRecontactFormDictionary;
}) => {
	// setup react-hook-forms
	const methods = useForm<ConsentRecontactRequest>({
		mode: 'onBlur',
		resolver: zodResolver(ConsentRecontactRequest),
		shouldUnregister: true,
	});
	const {
		formState: { errors },
		handleSubmit,
		watch,
	} = methods;

	const goToNextConsentStep = useGoToNextConsentStep(currentLang, currentConsentStep);

	const onSubmit: SubmitHandler<ConsentRecontactRequest> = (data, event) => {
		event?.preventDefault();
		goToNextConsentStep();
	};

	const showSecondaryContact = watch('RECONTACT__SECONDARY_CONTACT');

	return (
		<FormProvider {...methods}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FormSection>
					<RadioFieldSet
						error={errors.RECONTACT__FUTURE_RESEARCH?.type && errorsDict.required}
						name="RECONTACT__FUTURE_RESEARCH"
						required
						title={formDict.recontactFutureResearchTitle}
						description={formDict.recontactFutureResearchDesc}
						yesText={formDict.yes}
						noText={formDict.no}
					/>
					<RadioFieldSet
						error={errors.RECONTACT__SECONDARY_CONTACT?.type && errorsDict.required}
						name="RECONTACT__SECONDARY_CONTACT"
						required
						title={formDict.recontactSecondaryContactTitle}
						description={formDict.recontactSecondaryContactDesc}
						yesText={formDict.yes}
						noText={formDict.no}
					/>
				</FormSection>

				{showSecondaryContact && (
					<FormSection>
						<p className={styles.secondaryContactFormDescription}>
							{formDict.secondaryContactFormDescription}
						</p>
						<TextFieldSet
							className={styles.textInput}
							error={errors.secondaryContactFirstName?.type && errorsDict.required}
							label={formDict.firstName}
							name="secondaryContactFirstName"
							required
						/>
						<TextFieldSet
							className={styles.textInput}
							error={errors.secondaryContactLastName?.type && errorsDict.required}
							label={formDict.lastName}
							name="secondaryContactLastName"
							required
						/>
						<TextFieldSet
							className={styles.textInput}
							error={errors.secondaryContactPhoneNumber?.type && errorsDict.required}
							label={formDict.phone}
							description={formDict.phoneDescription}
							type={'tel'}
							name="secondaryContactPhoneNumber"
							required
						/>
					</FormSection>
				)}
				<ConsentStepsNavigation currentLang={currentLang} currentStep={currentConsentStep} />
			</Form>
		</FormProvider>
	);
};

export default ConsentRecontactForm;
