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

import { ValidLanguage, getTranslation } from 'src/i18n';
import ReviewInfoCard from 'src/components/common/ReviewInfoCard';
import LocalizedLink from 'src/components/common/Link/LocalizedLink';
import { ConsentReviewCardsDictionary } from 'src/i18n/locales/en/consentReviewCards';

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

interface ConsentReviewCardsProps {
	currentLang: ValidLanguage;
}

const ConsentReviewCards = ({ currentLang }: ConsentReviewCardsProps) => {
	const translate = getTranslation(currentLang);

	const textDict: ConsentReviewCardsDictionary = {
		agree: translate('consentReviewCards', 'agree'),
		ancestry: translate('consentReviewCards', 'ancestry'),
		biobankDescription: translate('consentReviewCards', 'biobankDescription'),
		biobankTitle: translate('consentReviewCards', 'biobankTitle'),
		cancerDiagnosis: translate('consentReviewCards', 'cancerDiagnosis'),
		clinician: translate('consentReviewCards', 'clinician'),
		dateOfBirth: translate('consentReviewCards', 'dateOfBirth'),
		deidentifiedParticipationDescription: translate(
			'consentReviewCards',
			'deidentifiedParticipationDescription',
		),
		deidentifiedParticipationLink: translate('consentReviewCards', 'deidentifiedParticipationLink'),
		deidentifiedParticipationTitle: translate(
			'consentReviewCards',
			'deidentifiedParticipationTitle',
		),
		doNotAgree: translate('consentReviewCards', 'doNotAgree'),
		edit: translate('consentReviewCards', 'edit'),
		familyHistoryOfCancer: translate('consentReviewCards', 'familyHistoryOfCancer'),
		genderIdentity: translate('consentReviewCards', 'genderIdentity'),
		geneticsClinic: translate('consentReviewCards', 'geneticsClinic'),
		molecularLab: translate('consentReviewCards', 'molecularLab'),
		nameOnOhip: translate('consentReviewCards', 'nameOnOhip'),
		ohipNumber: translate('consentReviewCards', 'ohipNumber'),
		personalHistoryOfCancer: translate('consentReviewCards', 'personalHistoryOfCancer'),
		phone: translate('consentReviewCards', 'phone'),
		postalCode: translate('consentReviewCards', 'postalCode'),
		preferredName: translate('consentReviewCards', 'preferredName'),
		recontactDescription: translate('consentReviewCards', 'recontactDescription'),
		recontactTitle: translate('consentReviewCards', 'recontactTitle'),
		releaseContactDescription: translate('consentReviewCards', 'releaseContactDescription'),
		releaseContactLink: translate('consentReviewCards', 'releaseContactLink'),
		releaseContactTitle: translate('consentReviewCards', 'releaseContactTitle'),
		releaseHealthDataDescription: translate('consentReviewCards', 'releaseHealthDataDescription'),
		releaseHealthDataTitle: translate('consentReviewCards', 'releaseHealthDataTitle'),
		secondaryContact: translate('consentReviewCards', 'secondaryContact'),
		secondaryContactDescription: translate('consentReviewCards', 'secondaryContactDescription'),
		secondaryContactTitle: translate('consentReviewCards', 'secondaryContactTitle'),
		sexAssignedAtBirth: translate('consentReviewCards', 'sexAssignedAtBirth'),
	};

	const releaseHealthFields = [
		{
			label: textDict.preferredName,
			value: stubData.preferredName,
		},
		{ label: textDict.nameOnOhip, value: stubData.nameOnOhip },
		{ label: textDict.genderIdentity, value: stubData.genderIdentity },
		{ label: textDict.ohipNumber, value: stubData.ohipNumber },
		{ label: textDict.dateOfBirth, value: stubData.dateOfBirth },
		{ label: textDict.sexAssignedAtBirth, value: stubData.sexAssignedAtBirth },
		{ label: textDict.ancestry, value: stubData.ancestry },
		{ label: textDict.personalHistoryOfCancer, value: stubData.personalHistoryOfCancer },
		{ label: textDict.cancerDiagnosis, value: stubData.cancerDiagnosis },
		{ label: textDict.familyHistoryOfCancer, value: stubData.familyHistoryOfCancer },
		{ label: textDict.postalCode, value: stubData.postalCode },
		{ label: textDict.clinician, value: stubData.clinician },
		{ label: textDict.molecularLab, value: stubData.molecularLab },
		{ label: textDict.geneticsClinic, value: stubData.geneticsClinic },
	];

	const secondaryContactFields = [
		{
			label: textDict.secondaryContact,
			value: stubData.secondaryContactName,
		},
		{ label: textDict.phone, value: stubData.secondaryContactPhone },
	];

	const cardProps = {
		editText: textDict.edit,
		linkLang: currentLang,
	};

	return (
		<>
			{/* STEP 2 */}
			<ReviewInfoCard
				boxColor={stubData.RELEASE_DATA__CLINICAL_AND_GENETIC ? 'green' : 'grey'}
				fields={releaseHealthFields}
				name="consent-2"
				required
				title={textDict.releaseHealthDataTitle}
				{...cardProps}
			>
				<>
					<b>
						{stubData.RELEASE_DATA__CLINICAL_AND_GENETIC ? textDict.agree : textDict.doNotAgree}
					</b>{' '}
					{textDict.releaseHealthDataDescription}
				</>
			</ReviewInfoCard>
			<ReviewInfoCard
				boxColor={stubData.RELEASE_DATA__DE_IDENTIFIED ? 'green' : 'grey'}
				name="consent-2"
				required
				title={textDict.deidentifiedParticipationTitle}
				{...cardProps}
			>
				<>
					<b>{stubData.RELEASE_DATA__DE_IDENTIFIED ? textDict.agree : textDict.doNotAgree}</b>{' '}
					{textDict.deidentifiedParticipationDescription}{' '}
					<LocalizedLink linkLang={currentLang} name="privacy">
						{textDict.deidentifiedParticipationLink}
					</LocalizedLink>
				</>
			</ReviewInfoCard>

			{/* STEP 3 */}
			<ReviewInfoCard
				boxColor={stubData.RESEARCH_PARTICIPATION__FUTURE_RESEARCH ? 'green' : 'grey'}
				name="consent-3"
				title={textDict.biobankTitle}
				{...cardProps}
			>
				<>
					<b>
						{stubData.RESEARCH_PARTICIPATION__FUTURE_RESEARCH
							? textDict.agree
							: textDict.doNotAgree}
					</b>{' '}
					{textDict.biobankDescription}
				</>
			</ReviewInfoCard>
			<ReviewInfoCard
				boxColor={stubData.RESEARCH_PARTICIPATION__CONTACT_INFORMATION ? 'green' : 'grey'}
				name="consent-3"
				title={textDict.releaseContactTitle}
				{...cardProps}
			>
				<>
					<b>
						{stubData.RESEARCH_PARTICIPATION__FUTURE_RESEARCH
							? textDict.agree
							: textDict.doNotAgree}
					</b>{' '}
					{textDict.releaseContactDescription}{' '}
					<LocalizedLink linkLang={currentLang} name="cancer-registries">
						{textDict.releaseContactLink}
					</LocalizedLink>
				</>
			</ReviewInfoCard>

			{/* STEP 4 */}
			<ReviewInfoCard
				boxColor={stubData.RECONTACT__FUTURE_RESEARCH ? 'green' : 'grey'}
				name="consent-4"
				title={textDict.recontactTitle}
				{...cardProps}
			>
				<>
					<b>{stubData.RECONTACT__FUTURE_RESEARCH ? textDict.agree : textDict.doNotAgree}</b>{' '}
					{textDict.recontactDescription}
				</>
			</ReviewInfoCard>
			<ReviewInfoCard
				boxColor={stubData.RECONTACT__SECONDARY_CONTACT ? 'green' : 'grey'}
				fields={secondaryContactFields}
				name="consent-4"
				title={textDict.secondaryContactTitle}
				{...cardProps}
			>
				<>
					<b>{stubData.RECONTACT__SECONDARY_CONTACT ? textDict.agree : textDict.doNotAgree}</b>{' '}
					{textDict.secondaryContactDescription}
				</>
			</ReviewInfoCard>
		</>
	);
};

export default ConsentReviewCards;
