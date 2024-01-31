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
import clsx from 'clsx';
import Link from 'next/link';

import { ValidLanguage, getTranslation } from 'src/i18n';
import { FormErrorsDictionary } from 'src/i18n/locales/en/formErrors';
import { ConsentResearchParticipationPageDictionary } from 'src/i18n/locales/en/consentResearchParticipationPage';
import { ConsentResearchParticipationFormDictionary } from 'src/i18n/locales/en/consentResearchParticipationForm';

import styles from './ConsentResearchParticipation.module.scss';
import ConsentResearchParticipationForm from './ConsentResearchParticipationForm';

const ConsentResearchParticipation = ({ currentLang }: { currentLang: ValidLanguage }) => {
	const translate = getTranslation(currentLang);

	const formDict: ConsentResearchParticipationFormDictionary = {
		researchParticipationFutureResearchTitle: translate(
			'consentResearchParticipationForm',
			'researchParticipationFutureResearchTitle',
		),
		researchParticipationFutureResearchTitleDesc: translate(
			'consentResearchParticipationForm',
			'researchParticipationFutureResearchTitleDesc',
		),
		researchParticipationContactInformationTitle: translate(
			'consentResearchParticipationForm',
			'researchParticipationContactInformationTitle',
		),
		researchParticipationContactInformationDesc: translate(
			'consentResearchParticipationForm',
			'researchParticipationContactInformationDesc',
		),
		researchParticipationContactInformationDescLink: translate(
			'consentResearchParticipationForm',
			'researchParticipationContactInformationDescLink',
		),
		yesText: translate('consentResearchParticipationForm', 'yesText'),
		noText: translate('consentResearchParticipationForm', 'noText'),
	};

	const errorsDict: FormErrorsDictionary = {
		required: translate('formErrors', 'required'),
	};

	const pageDict: ConsentResearchParticipationPageDictionary = {
		heading: translate('consentResearchParticipationPage', 'heading'),
		subheading: translate('consentResearchParticipationPage', 'subheading'),
		subheadingLink: translate('consentResearchParticipationPage', 'subheadingLink'),
		smallText: translate('consentResearchParticipationPage', 'smallText'),
	};

	return (
		<div>
			<h3 className={clsx(styles.heading)}>{pageDict.heading}</h3>
			<h4 className={clsx(styles.subheading)}>
				{pageDict.subheading}
				<Link href="#">{pageDict.subheadingLink}</Link>
			</h4>
			<p className={clsx(styles.smallText)}>{pageDict.smallText}</p>

			<ConsentResearchParticipationForm
				currentLang={currentLang}
				errorsDict={errorsDict}
				formDict={formDict}
			/>
		</div>
	);
};

export default ConsentResearchParticipation;
