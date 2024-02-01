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

import { getTranslation, ValidLanguage } from 'src/i18n';
import { ConsentReviewSignFormDictionary } from 'src/i18n/locales/en/consentReviewSignForm';

import ConsentReviewSignForm from './ConsentReviewSignForm';

const ConsentReviewSign = ({ currentLang }: { currentLang: ValidLanguage }) => {
	const translate = getTranslation(currentLang);

	const formDict: ConsentReviewSignFormDictionary = {
		agree: translate('consentReviewSignForm', 'agree'),
		ancestry: translate('consentReviewSignForm', 'ancestry'),
		biobankDescription: translate('consentReviewSignForm', 'biobankDescription'),
		biobankTitle: translate('consentReviewSignForm', 'biobankTitle'),
		cancerDiagnosis: translate('consentReviewSignForm', 'cancerDiagnosis'),
		clinician: translate('consentReviewSignForm', 'clinician'),
		dateOfBirth: translate('consentReviewSignForm', 'dateOfBirth'),
		deidentifiedParticipationDescription: translate(
			'consentReviewSignForm',
			'deidentifiedParticipationDescription',
		),
		deidentifiedParticipationLink: translate(
			'consentReviewSignForm',
			'deidentifiedParticipationLink',
		),
		deidentifiedParticipationTitle: translate(
			'consentReviewSignForm',
			'deidentifiedParticipationTitle',
		),
		doNotAgree: translate('consentReviewSignForm', 'doNotAgree'),
		edit: translate('consentReviewSignForm', 'edit'),
		familyHistoryOfCancer: translate('consentReviewSignForm', 'familyHistoryOfCancer'),
		genderIdentity: translate('consentReviewSignForm', 'genderIdentity'),
		geneticsClinic: translate('consentReviewSignForm', 'geneticsClinic'),
		molecularLab: translate('consentReviewSignForm', 'molecularLab'),
		nameOnOhip: translate('consentReviewSignForm', 'nameOnOhip'),
		ohipNumber: translate('consentReviewSignForm', 'ohipNumber'),
		personalHistoryOfCancer: translate('consentReviewSignForm', 'personalHistoryOfCancer'),
		phone: translate('consentReviewSignForm', 'phone'),
		postalCode: translate('consentReviewSignForm', 'postalCode'),
		preferredName: translate('consentReviewSignForm', 'preferredName'),
		recontactDescription: translate('consentReviewSignForm', 'recontactDescription'),
		recontactTitle: translate('consentReviewSignForm', 'recontactTitle'),
		releaseContactDescription: translate('consentReviewSignForm', 'releaseContactDescription'),
		releaseContactLink: translate('consentReviewSignForm', 'releaseContactLink'),
		releaseContactTitle: translate('consentReviewSignForm', 'releaseContactTitle'),
		releaseHealthDataDescription: translate(
			'consentReviewSignForm',
			'releaseHealthDataDescription',
		),
		releaseHealthDataTitle: translate('consentReviewSignForm', 'releaseHealthDataTitle'),
		secondaryContact: translate('consentReviewSignForm', 'secondaryContact'),
		secondaryContactDescription: translate('consentReviewSignForm', 'secondaryContactDescription'),
		secondaryContactTitle: translate('consentReviewSignForm', 'secondaryContactTitle'),
		sexAssignedAtBirth: translate('consentReviewSignForm', 'sexAssignedAtBirth'),
	};

	return (
		<div>
			<h2>{translate('consentReviewSignPage', 'title')}</h2>
			<p>{translate('consentReviewSignPage', 'description')}</p>

			<ConsentReviewSignForm currentLang={currentLang} formDict={formDict} />
		</div>
	);
};

export default ConsentReviewSign;
