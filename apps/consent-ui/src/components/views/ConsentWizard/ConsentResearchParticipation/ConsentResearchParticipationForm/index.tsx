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

import Link from 'next/link';
import {
	ConsentResearchParticipationRequest,
	ConsentResearchParticipationResponse,
} from 'types/consentApi';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ConsentResearchParticipationFormDictionary } from 'src/i18n/locales/en/consentResearchParticipationForm';
import Form from 'src/components/common/Form';
import RadioFieldSet from 'src/components/common/Form/fieldsets/RadioFieldSet';
import FormSection from 'src/components/common/Form/FormSection';
import { FormErrorsDictionary } from 'src/i18n/locales/en/formErrors';
import { ValidLanguage } from 'src/i18n';
import { ConsentStepRouteEnum } from 'src/components/common/Link/types';

import ConsentStepsNavigation from '../../ConsentStepsNavigation';
import useGoToNextConsentStep from '../../ConsentStepsNavigation/useGoToNextConsentStep';

import styles from './ConsentResearchParticipationForm.module.scss';

const currentConsentStep = ConsentStepRouteEnum.enum['consent-3'];

const ConsentResearchParticipationForm = ({
	currentLang,
	defaultValues,
	errorsDict,
	formDict,
}: {
	currentLang: ValidLanguage;
	defaultValues: ConsentResearchParticipationResponse;
	errorsDict: FormErrorsDictionary;
	formDict: ConsentResearchParticipationFormDictionary;
}) => {
	// setup react-hook-forms
	const methods = useForm<ConsentResearchParticipationRequest>({
		defaultValues,
		resolver: zodResolver(ConsentResearchParticipationRequest),
	});
	const {
		formState: { errors },
		handleSubmit,
	} = methods;

	const goToNextConsentStep = useGoToNextConsentStep(currentLang, currentConsentStep);

	const onSubmit: SubmitHandler<ConsentResearchParticipationRequest> = (data, event) => {
		event?.preventDefault();
		goToNextConsentStep();
	};

	return (
		<FormProvider {...methods}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FormSection>
					<RadioFieldSet
						error={errors.RESEARCH_PARTICIPATION__FUTURE_RESEARCH?.type && errorsDict.required}
						title={formDict.researchParticipationFutureResearchTitle}
						description={formDict.researchParticipationFutureResearchTitleDesc}
						yesText={formDict.yes}
						noText={formDict.no}
						name={'RESEARCH_PARTICIPATION__FUTURE_RESEARCH'}
						required
					/>
					<RadioFieldSet
						error={errors.RESEARCH_PARTICIPATION__CONTACT_INFORMATION?.type && errorsDict.required}
						title={formDict.researchParticipationContactInformationTitle}
						description={
							<p className={styles.description}>
								{formDict.researchParticipationContactInformationDesc}
								<Link href="#">{formDict.researchParticipationContactInformationDescLink}</Link>
							</p>
						}
						yesText={formDict.yes}
						noText={formDict.no}
						name={'RESEARCH_PARTICIPATION__CONTACT_INFORMATION'}
						required
					/>
				</FormSection>

				<ConsentStepsNavigation currentLang={currentLang} currentStep={currentConsentStep} />
			</Form>
		</FormProvider>
	);
};

export default ConsentResearchParticipationForm;
