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

import Card from 'src/components/Card';
import LinkButton from 'src/components/Button/LinkButton';
import RightArrow from 'src/components/Icons/Arrow';
import { getTranslation, ValidLanguage } from 'src/i18n';
import ConsentsImage from 'src/public/consents.jpeg';

import styles from './Dashboard.module.scss';

const statuses = ['disabled', 'incomplete', 'complete'] as const;
const consentStatus: (typeof statuses)[number] = statuses[Math.floor(Math.random() * 3)];

const DashboardComponent = async ({ currentLang }: { currentLang: ValidLanguage }) => {
	const translate = await getTranslation(currentLang, 'dashboard');
	return (
		<div className={styles.dashboard}>
			<Card dropShadow="sm" className={clsx(styles.card, styles[consentStatus])}>
				<div className={styles['consents-img']}>
					<Image src={ConsentsImage} alt={translate('review-ohcrn-consents-img')} />
				</div>
				<div className={styles.content}>
					<h2>{translate('review-ohcrn-consents')}</h2>
					<p>{translate('review-consents-description')}</p>
					<div className={styles['button-container']}>
						{consentStatus == 'complete' ? (
							<LinkButton href={''} variant="secondary" color="blue" layout="icon">
								<b>{translate('download-consent-forms')}</b>
							</LinkButton>
						) : (
							<LinkButton href={''} variant="primary" color="green" layout="icon">
								<b>{translate('complete-consent-forms')}</b>
								<RightArrow />
							</LinkButton>
						)}
					</div>
				</div>
			</Card>
		</div>
	);
};

export default DashboardComponent;
