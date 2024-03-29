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

import urlJoin from 'url-join';
import Link from 'next/link';

import { ASSETS_PATH, CONSENT_PDFS_PATH } from 'src/constants';
import { ValidLanguage, getTranslation } from 'src/i18n';
import LinkButton from 'src/components/common/Button/LinkButton';
import { getAppConfig } from 'src/config/appConfig';
import PdfViewer from 'src/components/common/PdfViewer';
import { ConsentStepRouteEnum } from 'src/components/common/Link/types';

import ConsentStepsNavigation from '../ConsentStepsNavigation';

import InformedConsentForm from './InformedConsentForm';
import styles from './InformedConsent.module.scss';

const currentConsentStep = ConsentStepRouteEnum.enum['consent-1'];

const InformedConsent = ({ currentLang }: { currentLang: ValidLanguage }) => {
	const { translateNamespace } = getTranslation(currentLang);
	const formDict = translateNamespace('informedConsentForm');
	const errorsDict = translateNamespace('formErrors');
	const pageDict = translateNamespace('informedConsentPage');

	const { OHCRN_EMAIL } = getAppConfig();

	const studyConsentPdfUrl = urlJoin(ASSETS_PATH, CONSENT_PDFS_PATH, pageDict.studyConsentPdf);

	return (
		<div>
			<h2 className={styles.title}>{pageDict.title}</h2>
			<p className={styles.description}>
				{pageDict.description1}
				<Link href={studyConsentPdfUrl} prefetch={false} target="_blank">
					{pageDict.linkText}
				</Link>{' '}
				{pageDict.description2} <Link href={`mailto:${OHCRN_EMAIL}`}>{OHCRN_EMAIL}</Link>.
			</p>
			<LinkButton
				color="blue"
				href={studyConsentPdfUrl}
				prefetch={false}
				target="_blank"
				variant="secondary"
				className={styles.downloadButton}
			>
				{pageDict.downloadConsentPdf}
			</LinkButton>

			<PdfViewer pdfUrl={studyConsentPdfUrl} />

			<InformedConsentForm
				currentLang={currentLang}
				errorsDict={errorsDict}
				formDict={formDict}
				currentStep={currentConsentStep}
			>
				<ConsentStepsNavigation currentLang={currentLang} currentStep={currentConsentStep} />
			</InformedConsentForm>
		</div>
	);
};

export default InformedConsent;
