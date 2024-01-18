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

import Link from 'next/link';

import { ValidLanguage, getTranslation } from 'src/i18n';
import { InformedConsentFormDictionary } from 'src/i18n/locales/en/informedConsentForm';
import { FormErrorsDictionary } from 'src/i18n/locales/en/formErrors';
import { InformedConsentPageDictionary } from 'src/i18n/locales/en/informedConsentPage';
import { OHCRN_EMAIL } from 'src/constants';

import InformedConsentForm from './InformedConsentForm';
import styles from './InformedConsent.module.scss';

const InformedConsent = ({ currentLang }: { currentLang: ValidLanguage }) => {
	const translate = getTranslation(currentLang);

	const formDict: InformedConsentFormDictionary = {
		readUnderstand1: translate('informedConsentForm', 'readUnderstand1'),
		readUnderstand2: translate('informedConsentForm', 'readUnderstand2'),
	};

	const errorsDict: FormErrorsDictionary = {
		required: translate('formErrors', 'required'),
	};

	const pageDict: InformedConsentPageDictionary = {
		description1: translate('informedConsentPage', 'description1'),
		description2: translate('informedConsentPage', 'description2'),
		description3: translate('informedConsentPage', 'description3'),
		linkText: translate('informedConsentPage', 'linkText'),
		title: translate('informedConsentPage', 'title'),
	};

	return (
		<div>
			<h2 className={styles.title}>{pageDict.title}</h2>
			<p className={styles.description}>
				{pageDict.description1}
				{/* TODO add download link for informed consent PDF https://github.com/OHCRN/platform/issues/379 */}
				<Link href="#">{pageDict.linkText}</Link> {pageDict.description2}{' '}
				<Link href={`mailto:${OHCRN_EMAIL}`}>{OHCRN_EMAIL}</Link>.
			</p>
			<InformedConsentForm currentLang={currentLang} errorsDict={errorsDict} formDict={formDict} />
		</div>
	);
};

export default InformedConsent;
