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
import urlJoin from 'url-join';

import { ValidLanguage, getTranslation } from 'src/i18n';

import { ASSETS_PATH, CONSENT_PDFS_PATH } from 'src/constants';
import styles from './ConsentRecontact.module.scss';
import ConsentRecontactForm from './ConsentRecontactForm';

const ConsentRecontact = ({ currentLang }: { currentLang: ValidLanguage }) => {
	const { translateNamespace } = getTranslation(currentLang);
	const formDict = translateNamespace('consentRecontactForm');
	const errorsDict = translateNamespace('formErrors');
	const pageDict = translateNamespace('consentRecontactPage');

	const studyConsentPdfUrl = urlJoin(ASSETS_PATH, CONSENT_PDFS_PATH, pageDict.studyConsentPdf);

	return (
		<div>
			<h2 className={styles.title}>{pageDict.title}</h2>
			<p className={styles.description}>{pageDict.subheading}</p>
			<p className={styles.description}>
				{pageDict.subheading2}
				<Link href={studyConsentPdfUrl} prefetch={false} target="_blank">
					{pageDict.subheadingLink}
				</Link>
			</p>
			<p className={styles.smallText}>{pageDict.smallText}</p>
			<ConsentRecontactForm currentLang={currentLang} errorsDict={errorsDict} formDict={formDict} />
		</div>
	);
};

export default ConsentRecontact;
