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
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import Form from 'src/components/common/Form';
import { ValidLanguage } from 'src/i18n';
import { ConsentReviewSignFormDictionary } from 'src/i18n/locales/en/consentReviewSignForm';
import ReviewInfoCard from 'src/components/common/ReviewInfoCard';
import LocalizedLink from 'src/components/common/Link/LocalizedLink';

export const ConsentReviewSignRequest = z.object({ stub: z.string().min(1) });
export type ConsentReviewSignRequest = z.infer<typeof ConsentReviewSignRequest>;

const stubData = {
	ancestry: 'American',
	cancerDiagnosis: 'Pancreas',
	clinician: 'Dr. Nick',
	CONSENT_RECONTACT: true,
	dateOfBirth: '09/25/1975',
	familyHistoryOfCancer: '',
	genderIdentity: 'Man',
	geneticsClinic: 'University Labs',
	molecularLab: 'College Labs',
	nameOnOhip: 'Homer Simpson',
	ohipNumber: '53657653434',
	personalHistoryOfCancer: '',
	postalCode: 'H0H0H0',
	preferredName: 'Homer',
	RECONTACT__FUTURE_RESEARCH: true,
	RECONTACT__SECONDARY_CONTACT: true,
	RELEASE_DATA__CLINICAL_AND_GENETIC: true,
	RELEASE_DATA__DE_IDENTIFIED: true,
	RESEARCH_PARTICIPATION__CONTACT_INFORMATION: true,
	RESEARCH_PARTICIPATION__FUTURE_RESEARCH: true,
	secondaryContactName: 'Marge Simpson',
	secondaryContactPhone: '1234567890',
	sexAssignedAtBirth: 'Male',
};

const ConsentReviewSignForm = ({
	currentLang,
	formDict,
}: {
	currentLang: ValidLanguage;
	formDict: ConsentReviewSignFormDictionary;
}) => {
	// setup react-hook-form
	const methods = useForm<ConsentReviewSignRequest>({
		mode: 'onBlur',
		resolver: zodResolver(ConsentReviewSignRequest),
	});

	const { handleSubmit, register } = methods;

	const onSubmit: SubmitHandler<ConsentReviewSignRequest> = (data, event) => {
		event?.preventDefault();
		console.log('form data', data);

		// go to next page
	};

	const cardProps = {
		editText: formDict.edit,
		linkLang: currentLang,
	};

	const releaseHealthFields = [
		{
			label: formDict.preferredName,
			value: stubData.preferredName,
		},
		{ label: formDict.nameOnOhip, value: stubData.nameOnOhip },
		{ label: formDict.genderIdentity, value: stubData.genderIdentity },
		{ label: formDict.ohipNumber, value: stubData.ohipNumber },
		{ label: formDict.dateOfBirth, value: stubData.dateOfBirth },
		{ label: formDict.sexAssignedAtBirth, value: stubData.sexAssignedAtBirth },
		{ label: formDict.ancestry, value: stubData.ancestry },
		{ label: formDict.personalHistoryOfCancer, value: stubData.personalHistoryOfCancer },
		{ label: formDict.cancerDiagnosis, value: stubData.cancerDiagnosis },
		{ label: formDict.familyHistoryOfCancer, value: stubData.familyHistoryOfCancer },
		{ label: formDict.postalCode, value: stubData.postalCode },
		{ label: formDict.clinician, value: stubData.clinician },
		{ label: formDict.molecularLab, value: stubData.molecularLab },
		{ label: formDict.geneticsClinic, value: stubData.geneticsClinic },
	];

	const secondaryContactFields = [
		{
			label: formDict.secondaryContact,
			value: stubData.secondaryContactName,
		},
		{ label: formDict.phone, value: stubData.secondaryContactPhone },
	];

	return (
		<>
			{/* STEP 2 */}
			<ReviewInfoCard
				boxColor={stubData.RELEASE_DATA__CLINICAL_AND_GENETIC ? 'green' : 'grey'}
				fields={releaseHealthFields}
				name="consent-2"
				required
				title={formDict.releaseHealthDataTitle}
				{...cardProps}
			>
				<>
					<b>
						{stubData.RELEASE_DATA__CLINICAL_AND_GENETIC ? formDict.agree : formDict.doNotAgree}
					</b>{' '}
					{formDict.releaseHealthDataDescription}
				</>
			</ReviewInfoCard>

			<ReviewInfoCard
				boxColor={stubData.RELEASE_DATA__DE_IDENTIFIED ? 'green' : 'grey'}
				name="consent-2"
				required
				title={formDict.deidentifiedParticipationTitle}
				{...cardProps}
			>
				<>
					<b>{stubData.RELEASE_DATA__DE_IDENTIFIED ? formDict.agree : formDict.doNotAgree}</b>{' '}
					{formDict.deidentifiedParticipationDescription}{' '}
					<LocalizedLink linkLang={currentLang} name="privacy">
						{formDict.deidentifiedParticipationLink}
					</LocalizedLink>
				</>
			</ReviewInfoCard>

			{/* STEP 3 */}
			<ReviewInfoCard
				boxColor={stubData.RESEARCH_PARTICIPATION__FUTURE_RESEARCH ? 'green' : 'grey'}
				name="consent-3"
				title={formDict.biobankTitle}
				{...cardProps}
			>
				<>
					<b>
						{stubData.RESEARCH_PARTICIPATION__FUTURE_RESEARCH
							? formDict.agree
							: formDict.doNotAgree}
					</b>{' '}
					{formDict.biobankDescription}
				</>
			</ReviewInfoCard>

			<ReviewInfoCard
				boxColor={stubData.RESEARCH_PARTICIPATION__CONTACT_INFORMATION ? 'green' : 'grey'}
				name="consent-3"
				title={formDict.releaseContactTitle}
				{...cardProps}
			>
				<>
					<b>
						{stubData.RESEARCH_PARTICIPATION__FUTURE_RESEARCH
							? formDict.agree
							: formDict.doNotAgree}
					</b>{' '}
					{formDict.releaseContactDescription}{' '}
					<LocalizedLink linkLang={currentLang} name="cancer-registries">
						{formDict.releaseContactLink}
					</LocalizedLink>
				</>
			</ReviewInfoCard>

			{/* STEP 4 */}
			<ReviewInfoCard
				boxColor={stubData.RECONTACT__FUTURE_RESEARCH ? 'green' : 'grey'}
				name="consent-4"
				title={formDict.recontactTitle}
				{...cardProps}
			>
				<>
					<b>{stubData.RECONTACT__FUTURE_RESEARCH ? formDict.agree : formDict.doNotAgree}</b>{' '}
					{formDict.recontactDescription}
				</>
			</ReviewInfoCard>

			<ReviewInfoCard
				boxColor={stubData.RECONTACT__SECONDARY_CONTACT ? 'green' : 'grey'}
				fields={secondaryContactFields}
				name="consent-4"
				title={formDict.secondaryContactTitle}
				{...cardProps}
			>
				<>
					<b>{stubData.RECONTACT__SECONDARY_CONTACT ? formDict.agree : formDict.doNotAgree}</b>{' '}
					{formDict.secondaryContactDescription}
				</>
			</ReviewInfoCard>

			{/* E-SIGNATURE */}
			<FormProvider {...methods}>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<ReviewInfoCard
						boxColor={'grey'}
						fields={secondaryContactFields}
						name="consent-5"
						title={formDict.secondaryContactTitle}
						{...cardProps}
					>
						<input {...register('stub')} />
					</ReviewInfoCard>
					{/* TODO add e-signature, remove this input */}
				</Form>
			</FormProvider>
		</>
	);
};

export default ConsentReviewSignForm;
