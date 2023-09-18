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

// import { User } from 'common';

import Link from 'next/link';

import { ValidLanguage, getTranslation } from '@/i18n';
// import PatientIcon from '@/assets/icons/family.svg';
import LinkButton from '@/components/Button/LinkButton';

import styles from './Home.module.scss';
import CardButton from './CardButton/CardButton';

const HomeComponent = async ({ currentLang }: { currentLang: ValidLanguage }) => {
	const translate = await getTranslation(currentLang, 'landing-page');
	return (
		<div className={styles.heroContainer}>
			<div className={styles.hero}>
				<div className={styles.heroText}>
					<h1>{translate('title')}</h1>
					<p>
						<b>{translate('ohcrn-description')}</b>
					</p>
					<LinkButton href="#" variant="secondary" className={styles.moreButton}>
						<b>{translate('more-about-ohcrn')}</b>
					</LinkButton>
				</div>
				<div className={styles.card}>
					<h3>{translate('join-ohcrn')}</h3>
					<p>
						<b>{translate('join-ohcrn-description')}</b>
					</p>
					{/* mobile view */}
					<CardButton Icon={'icon'} classes={styles.mobileCardBtn}>
						<Link href="#">{translate('participants-register-today')}</Link>
					</CardButton>
					<CardButton Icon={'icon'} classes={styles.mobileCardBtn}>
						<Link href="#">{translate('clinicians-register-today')}</Link>
					</CardButton>
					{/* tablet/desktop view */}
					<CardButton Icon={'icon'} classes={styles.tabletCardBtn}>
						<span>
							{translate('long-participants-register-today')}{' '}
							<Link href="#">{translate('register-yourself-today')}</Link>
						</span>
					</CardButton>
					<CardButton Icon={'icon'} classes={styles.tabletCardBtn}>
						<span>
							{translate('long-clinicians-register-today')}{' '}
							<Link href="#">{translate('register-patient-today')}</Link>
						</span>
					</CardButton>
				</div>
			</div>
		</div>
	);
};

export default HomeComponent;
