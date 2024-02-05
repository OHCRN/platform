/*
 * Copyright (c) 2023 The Ontario Institute for Cancer Research. All rights reserved
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

import clsx from 'clsx';
import Image from 'next/image';

import Card from 'src/components/common/Card';
import { getTranslation, ValidLanguage } from 'src/i18n';
import ConsentsImage from 'src/../public/assets/images/consents.jpeg';
import PaddedContainer from 'src/components/common/PaddedContainer';
import LocalizedLink from 'src/components/common/Link/LocalizedLink';

import styles from './Dashboard.module.scss';
import DashboardNotification from './notifications/DashboardNotification';

const statuses = ['disabled', 'incomplete', 'complete'] as const;
const consentStatus: (typeof statuses)[number] = statuses[Math.floor(Math.random() * 3)];

const DashboardComponent = async ({ currentLang }: { currentLang: ValidLanguage }) => {
	const { translate } = getTranslation(currentLang);
	return (
		<PaddedContainer>
			<DashboardNotification currentLang={currentLang} />
			<Card dropShadow="sm" className={clsx(styles.card, styles[consentStatus])} layout="row">
				<div className={styles['consents-img']}>
					<Image src={ConsentsImage} alt="" priority />
				</div>
				<div className={styles.content}>
					<h2>{translate('dashboard', 'reviewOhcrnConsents')}</h2>
					<p>{translate('dashboard', 'reviewConsentsDescription')}</p>
					<div className={styles['button-container']}>
						{consentStatus == 'complete' ? (
							<LocalizedLink
								name={'home'}
								linkLang={currentLang}
								role="button"
								variant="secondary"
								color="blue"
							>
								{translate('dashboard', 'downloadConsentForms')}
							</LocalizedLink>
						) : (
							<LocalizedLink
								name={'consent-1'}
								linkLang={currentLang}
								role="button"
								variant="primary"
								color="green"
								size="large"
								action="next"
							>
								{translate('dashboard', 'completeConsentForms')}
							</LocalizedLink>
						)}
					</div>
				</div>
			</Card>
		</PaddedContainer>
	);
};

export default DashboardComponent;
