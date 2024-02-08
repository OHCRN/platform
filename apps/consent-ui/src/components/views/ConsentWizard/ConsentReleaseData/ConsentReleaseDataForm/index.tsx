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

import { ConsentReleaseDataRequest } from 'types/consentApi';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Form from 'src/components/common/Form';
import CheckboxFieldSet from 'src/components/common/Form/fieldsets/CheckboxFieldSet';
import TextFieldSet from 'src/components/common/Form/fieldsets/TextFieldSet';
import FormSection from 'src/components/common/Form/FormSection';
// import { FormErrorsDictionary } from 'src/i18n/locales/en/formErrors';
import { ValidLanguage } from 'src/i18n';
import { ConsentStepRouteEnum } from 'src/components/common/Link/types';
import SelectFieldSet from 'src/components/common/Form/fieldsets/SelectFieldSet';
import CalendarFieldSet from 'src/components/common/Form/fieldsets/CalendarFieldSet';

import ConsentStepsNavigation from '../../ConsentStepsNavigation';
import useGoToNextConsentStep from '../../ConsentStepsNavigation/useGoToNextConsentStep';

import {
	GenderOption,
	BirthSexOption,
	AncestryOption,
	HistoryOfCancerOption,
	GeneticsClinicOption,
	MolecularLabOption,
} from './types';

const currentConsentStep = ConsentStepRouteEnum.enum['consent-1'];

const ConsentReleaseDataForm = ({
	currentLang,
	genderOptions,
	birthSexOptions,
	ancestryOptions,
	historyOfCancerOptions,
	geneticsClinicOptions,
	molecularLabOptions,
	// errorsDict,
	// formDict,
}: {
	currentLang: ValidLanguage;
	genderOptions: GenderOption[];
	birthSexOptions: BirthSexOption[];
	ancestryOptions: AncestryOption[];
	historyOfCancerOptions: HistoryOfCancerOption[];
	geneticsClinicOptions: GeneticsClinicOption[];
	molecularLabOptions: MolecularLabOption[];
	// errorsDict: FormErrorsDictionary;
	// formDict: InformedConsentFormDictionary;
}) => {
	// setup react-hook-forms
	const methods = useForm<ConsentReleaseDataRequest>({
		resolver: zodResolver(ConsentReleaseDataRequest),
		shouldUnregister: true,
	});
	const {
		// formState: { errors },
		handleSubmit,
	} = methods;

	const goToNextConsentStep = useGoToNextConsentStep(currentLang, currentConsentStep);

	const onSubmit: SubmitHandler<ConsentReleaseDataRequest> = (_data, event) => {
		event?.preventDefault();

		// go to next page after successful API request
		goToNextConsentStep();
	};

	return (
		<FormProvider {...methods}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FormSection>
					<CheckboxFieldSet
						description={
							'I agree to the release and update of clinical and genetic data obtained from applicable institutions and provided by the patient, to be stored within OHCRN.'
						}
						error={undefined}
						name="1"
						required
						title={''}
					/>
					<CheckboxFieldSet
						description={
							'I agree to the use my registry data in de-identified research (including display of aggregate data on OHCRN website and research facilitated by longitudinal linkage to administrative health databases.) Learn more about privacy and de-identified information.'
						}
						error={undefined}
						name="2"
						required
						title={''}
					/>
				</FormSection>

				<p>To make this possible, we will need the following information from you:</p>

				<FormSection>
					<TextFieldSet
						description={'As it appears on your health card'}
						error={undefined}
						name="3"
						required
						label={'First Name'}
					/>
					<TextFieldSet
						description={'As it appears on your health card'}
						error={undefined}
						name="4"
						label={'Middle Name'}
					/>
					<TextFieldSet
						description={'As it appears on your health card'}
						error={undefined}
						name="5"
						required
						label={'Last Name'}
					/>
					<TextFieldSet
						description={'What would the participant like to be called when they are contacted.'}
						error={undefined}
						name="6"
						label={'Preferred Name'}
					/>

					<SelectFieldSet
						label={'Gender Identity'}
						name="7"
						placeholder={'- Select an option -'}
						options={genderOptions}
						required
					/>
					{/* TODO: add OhipFieldSet when merged */}
					<CalendarFieldSet
						currentLang={currentLang}
						label={'Date of Birth'}
						name="8"
						description={'We require this to request your clinical information.'}
						required
					/>

					<SelectFieldSet
						label={'Sex Assigned at Birth'}
						description={
							'Sex assigned at birth can help improve our understanding of cancer causes and risks.'
						}
						name="9"
						placeholder={'- Select an option -'}
						options={birthSexOptions}
						required
					/>
					<SelectFieldSet
						label={'Ancestry'}
						name="10"
						placeholder={'- Select an option -'}
						options={ancestryOptions}
						required
					/>
					<SelectFieldSet
						label={'Personal History of Cancer'}
						name="11"
						placeholder={'- Select an option -'}
						options={historyOfCancerOptions}
						required
					/>
					<SelectFieldSet
						label={'Primary Cancer Diagnosis'}
						description={'You may select multiple cancers you have been diagnosed with.'}
						name="12"
						placeholder={'- Select an option -'}
						options={[]} // TODO: Add cancer options
						required
					/>
					<SelectFieldSet
						label={'Family History of Cancer'}
						description={
							'Select yes only if the family member is: parent, sibling, child, aunt/uncle, or grandparents.'
						}
						name="13"
						placeholder={'- Select an option -'}
						options={historyOfCancerOptions}
						required
					/>

					<TextFieldSet
						description={
							'We require this to request your clinical information, this is not used to identify you or your location of residence.'
						}
						error={undefined}
						name="14"
						label={'Postal Code'}
						required
					/>
				</FormSection>

				<p>
					OHCRN is open to participants who have had genetic testing. Please tell us about where
					your testing was completed:
				</p>

				<FormSection>
					<TextFieldSet
						description={
							'Please provide the name of the clinician that ordered your genetic testing, or the main clinician handling your clinical care.'
						}
						error={undefined}
						name="15"
						label={'Clinician Title/Role'}
					/>
					<TextFieldSet error={undefined} name="16" label={'Clinician First Name'} />
					<TextFieldSet error={undefined} name="17" label={'Clinician Last Name'} />
					<SelectFieldSet
						label={'Genetics Clinic'}
						name="16"
						placeholder={'- Select an option -'}
						options={geneticsClinicOptions}
						required
					/>
					<SelectFieldSet
						label={'Molecular Lab'}
						description={
							'Please provide the name of the lab that did your genetic testing, if you know this.'
						}
						name="17"
						placeholder={'- Select an option -'}
						options={molecularLabOptions}
						required
					/>
				</FormSection>

				<ConsentStepsNavigation currentLang={currentLang} currentStep={currentConsentStep} />
			</Form>
		</FormProvider>
	);
};

export default ConsentReleaseDataForm;
