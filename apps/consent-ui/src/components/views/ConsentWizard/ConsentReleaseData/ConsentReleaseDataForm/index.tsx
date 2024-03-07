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
import { ConsentReleaseDataFormRequest } from 'types/consentUi';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

import Form from 'src/components/common/Form';
import CheckboxFieldSet from 'src/components/common/Form/fieldsets/CheckboxFieldSet';
import TextFieldSet from 'src/components/common/Form/fieldsets/TextFieldSet';
import FormSection from 'src/components/common/Form/FormSection';
import { FormErrorsDictionary } from 'src/i18n/locales/en/formErrors';
import { ConsentReleaseDataLabelsDictionary } from 'src/i18n/locales/en/consentReleaseDataLabels';
import { ConsentReleaseDataTextDictionary } from 'src/i18n/locales/en/consentReleaseDataText';
import { ValidLanguage } from 'src/i18n';
import { ConsentStepRouteEnum } from 'src/components/common/Link/types';
import SelectFieldSet from 'src/components/common/Form/fieldsets/SelectFieldSet';
import CalendarFieldSet from 'src/components/common/Form/fieldsets/CalendarFieldSet';
import OhipFieldSet from 'src/components/common/Form/fieldsets/OhipFieldSet';

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
import styles from './ConsentReleaseDataForm.module.scss';

const transformData = (data: ConsentReleaseDataFormRequest): ConsentReleaseDataRequest => {
	return {
		...data,
		hasOhip: !data.ohipDisabled,
	};
};

const currentConsentStep = ConsentStepRouteEnum.enum['consent-2'];

const ConsentReleaseDataForm = ({
	currentLang,
	genderOptions,
	birthSexOptions,
	ancestryOptions,
	historyOfCancerOptions,
	geneticsClinicOptions,
	molecularLabOptions,
	errorsDict,
	labelsDict,
	textDict,
}: {
	currentLang: ValidLanguage;
	genderOptions: GenderOption[];
	birthSexOptions: BirthSexOption[];
	ancestryOptions: AncestryOption[];
	historyOfCancerOptions: HistoryOfCancerOption[];
	geneticsClinicOptions: GeneticsClinicOption[];
	molecularLabOptions: MolecularLabOption[];
	errorsDict: FormErrorsDictionary;
	labelsDict: ConsentReleaseDataLabelsDictionary;
	textDict: ConsentReleaseDataTextDictionary;
}) => {
	// setup react-hook-forms
	const methods = useForm<ConsentReleaseDataFormRequest>({
		resolver: zodResolver(ConsentReleaseDataFormRequest),
		shouldUnregister: true,
		mode: 'onBlur',
	});
	const {
		formState: { errors },
		handleSubmit,
	} = methods;

	const goToNextConsentStep = useGoToNextConsentStep(currentLang, currentConsentStep);

	const onSubmit: SubmitHandler<ConsentReleaseDataFormRequest> = (data, event) => {
		event?.preventDefault();
		const transformedData = transformData(data);
		// TODO: submit data to API
		console.log(transformedData);
		goToNextConsentStep();
	};

	return (
		<FormProvider {...methods}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FormSection>
					<CheckboxFieldSet
						className={styles.checkbox}
						description={textDict.releaseAndUpdateData}
						error={errors.RELEASE_DATA__CLINICAL_AND_GENETIC?.type && errorsDict.required}
						name="RELEASE_DATA__CLINICAL_AND_GENETIC"
						required
					/>
					<CheckboxFieldSet
						className={styles.checkbox}
						description={
							<>
								{textDict.deIdentifiedResearch}
								<Link href={''} target="_blank">
									{textDict.deIdentifiedResearchLink}
								</Link>
							</>
						}
						error={errors.RELEASE_DATA__DE_IDENTIFIED?.type && errorsDict.required}
						name="RELEASE_DATA__DE_IDENTIFIED"
						required
					/>
				</FormSection>

				<p className={styles.smallText}>{textDict.sectionDescription}</p>

				<FormSection>
					<TextFieldSet
						description={textDict.participantFirstNameTooltip}
						error={errors.firstName?.type && errorsDict.required}
						name="firstName"
						required
						label={labelsDict.firstName}
					/>
					<TextFieldSet
						description={textDict.participantMiddleNameTooltip}
						error={errors.middleName?.type && errorsDict.required}
						name="middleName"
						label={labelsDict.middleName}
					/>
					<TextFieldSet
						description={textDict.participantLastNameTooltip}
						error={errors.lastName?.type && errorsDict.required}
						name="lastName"
						required
						label={labelsDict.lastName}
					/>
					<TextFieldSet
						description={textDict.participantPreferredNameTooltip}
						error={errors.preferredName?.type && errorsDict.required}
						name="preferredName"
						label={labelsDict.preferredName}
					/>

					<SelectFieldSet
						label={labelsDict.genderIdentity}
						name="genderIdentity"
						error={errors.genderIdentity?.type && errorsDict.required}
						placeholder={textDict.selectPlaceholder}
						options={genderOptions}
						required
					/>
					<OhipFieldSet
						label={labelsDict.ohipNumber}
						error={errors.ohipNumber?.type && errorsDict.required}
						checkboxLabel={textDict.ohipCheckboxText}
						required
					/>

					<CalendarFieldSet
						currentLang={currentLang}
						label={labelsDict.dateOfBirth}
						error={errors.dateOfBirth?.type && errorsDict.required}
						name="dateOfBirth"
						description={textDict.dateOfBirthTooltip}
						required
					/>

					<SelectFieldSet
						label={labelsDict.sexAssignedAtBirth}
						description={textDict.sexAssignedAtBirthTooltip}
						name="birthSex"
						error={errors.birthSex?.type && errorsDict.required}
						placeholder={textDict.selectPlaceholder}
						options={birthSexOptions}
						required
					/>
					<SelectFieldSet
						label={labelsDict.ancestry}
						name="ancestry"
						error={errors.ancestry?.type && errorsDict.required}
						placeholder={textDict.selectPlaceholder}
						options={ancestryOptions}
						required
					/>
					<SelectFieldSet
						label={labelsDict.personalHistoryOfCancer}
						name="historyOfCancer"
						error={errors.historyOfCancer?.type && errorsDict.required}
						placeholder={textDict.selectPlaceholder}
						options={historyOfCancerOptions}
						required
					/>
					<SelectFieldSet
						label={labelsDict.primaryCancerDiagnosis}
						description={textDict.primaryCancerDiagnosisTooltip}
						name="primaryCancerDiagnosis"
						error={undefined} // TODO: Add primaryCancerDiagnosis to zod schema
						placeholder={textDict.selectPlaceholder}
						options={[]} // TODO: Add cancer options
						required
					/>
					<SelectFieldSet
						label={labelsDict.familyHistoryOfCancer}
						description={textDict.familyHistoryOfCancerTooltip}
						name="familyHistoryOfCancer"
						error={errors.familyHistoryOfCancer?.type && errorsDict.required}
						placeholder={textDict.selectPlaceholder}
						options={historyOfCancerOptions}
						required
					/>

					<TextFieldSet
						label={labelsDict.residentialPostalCode}
						description={textDict.residentialPostalCodeTooltip}
						error={errors.residentialPostalCode?.type && errorsDict.required}
						name="residentialPostalCode"
						required
					/>
				</FormSection>

				<p className={styles.smallText}>{textDict.sectionDescription2}</p>

				<FormSection>
					<TextFieldSet
						description={textDict.clinicianTitleOrRoleTooltip}
						error={errors.selfReportedClinicianTitle?.type && errorsDict.required}
						name="selfReportedClinicianTitle"
						label={labelsDict.clinicianTitleOrRole}
					/>
					<TextFieldSet
						error={errors.selfReportedClinicianFirstName?.type && errorsDict.required}
						name="selfReportedClinicianFirstName"
						label={labelsDict.clinicianFirstName}
					/>
					<TextFieldSet
						error={errors.selfReportedClinicianLastName?.type && errorsDict.required}
						name="selfReportedClinicianLastName"
						label={labelsDict.clinicianLastName}
					/>
					<SelectFieldSet
						label={labelsDict.geneticsClinic}
						name="selfReportedGeneticsClinic"
						error={errors.selfReportedGeneticsClinic?.type && errorsDict.required}
						placeholder={textDict.selectPlaceholder}
						options={geneticsClinicOptions}
					/>
					<SelectFieldSet
						label={labelsDict.molecularLab}
						description={textDict.molecularLabNameTooltip}
						name="selfReportedMolecularLab"
						error={errors.selfReportedMolecularLab?.type && errorsDict.required}
						placeholder={textDict.selectPlaceholder}
						options={molecularLabOptions}
					/>
				</FormSection>

				<ConsentStepsNavigation currentLang={currentLang} currentStep={currentConsentStep} />
			</Form>
		</FormProvider>
	);
};

export default ConsentReleaseDataForm;
