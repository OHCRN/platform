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

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { ConsentResearchParticipationRequest } from 'types/consentApi';
import clsx from 'clsx';

import { FormErrorsDictionary } from 'src/i18n/locales/en/formErrors';
import Form from 'src/components/common/Form';
import { ConsentResearchParticipationDictionary } from 'src/i18n/locales/en/consentResearchParticipation';
import FormSection from 'src/components/common/Form/FormSection';
import { ValidLanguage } from 'src/i18n';
import RadioFieldSet from 'src/components/common/Form/fieldsets/RadioFieldSet';

import styles from './ConsentStep3Component.module.scss';

const ConsentStep3Component = ({
	// currentLang,
	errorsDict,
	textDict,
}: {
	currentLang: ValidLanguage;
	errorsDict: FormErrorsDictionary;
	textDict: ConsentResearchParticipationDictionary;
}) => {
	// setup react-hook-forms
	const methods = useForm<ConsentResearchParticipationRequest>({
		mode: 'onBlur',
		resolver: zodResolver(ConsentResearchParticipationRequest),
		shouldUnregister: true,
	});

	const {
		formState: { errors },
		handleSubmit,
	} = methods;

	const onSubmit: SubmitHandler<ConsentResearchParticipationRequest> = (data, event) => {
		event?.preventDefault();
	};

	return (
		<FormProvider {...methods}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				{/* HEADING */}
				<FormSection>
					<h3 className={clsx(styles.heading)}>{textDict.heading}</h3>
					<h4 className={clsx(styles.subheading)}>
						{textDict.subheading}
						<a href="#" className={clsx(styles.link)}>
							{textDict.subheadingLink}
						</a>
					</h4>
					<p className={clsx(styles.label)}>{textDict.label}</p>
				</FormSection>

				{/* SECTION - PARTICIPANT CONSENTS */}
				<FormSection>
					<RadioFieldSet
						error={errors.RESEARCH_PARTICIPATION__FUTURE_RESEARCH?.type && errorsDict.required}
						title={textDict.RESEARCH_PARTICIPATION__FUTURE_RESEARCH_TITLE}
						description={textDict.RESEARCH_PARTICIPATION__FUTURE_RESEARCH_DESC}
						yesText={textDict.yesText}
						noText={textDict.noText}
						name={'RESEARCH_PARTICIPATION__FUTURE_RESEARCH'}
						required
						withNarrowDesktopLayout
					/>
					<RadioFieldSet
						error={errors.RESEARCH_PARTICIPATION__CONTACT_INFORMATION?.type && errorsDict.required}
						title={textDict.RESEARCH_PARTICIPATION__CONTACT_INFORMATION_TITLE}
						description={
							<>
								{textDict.RESEARCH_PARTICIPATION__CONTACT_INFORMATION_DESC}
								<a href="#" className={clsx(styles.link)}>
									{textDict.RESEARCH_PARTICIPATION__CONTACT_INFORMATION_DESC_LINK}
								</a>
							</>
						}
						yesText={textDict.yesText}
						noText={textDict.noText}
						name={'RESEARCH_PARTICIPATION__CONTACT_INFORMATION'}
						required
						withNarrowDesktopLayout
					/>
				</FormSection>

				{/* SECTION - PREVIOUS / NEXT */}
				{/* <FormSection>
					waiting on component
				</FormSection> */}
			</Form>
		</FormProvider>
	);
};

export default ConsentStep3Component;
