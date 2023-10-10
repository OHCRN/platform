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

import Image from 'next/image';

import { ValidLanguage, getTranslation } from 'src/i18n';
import LinkButton from 'src/components/Button/LinkButton';
import RightArrow from 'src/components/Icons/Arrow';
import BackgroundImage from 'src/public/background.png';
import { OHCRN_HOME_LINK } from 'src/constants';

import styles from './Home.module.scss';
import Card from './Card/Card';

const HomeComponent = async ({ currentLang }: { currentLang: ValidLanguage }) => {
	const translate = await getTranslation(currentLang, 'landing-page');
	return (
		<div className={styles.heroContainer}>
			<Image
				src={BackgroundImage}
				alt={translate('hero-background-img-alt')}
				priority
				className={styles.backgroundImg}
			/>
			<div className={styles.gradientOverlay}></div>
			<div className={styles.hero}>
				<div className={styles.heroText}>
					<h1>{translate('title')}</h1>
					<p>
						<b>{translate('ohcrn-description')}</b>
					</p>
					<LinkButton href={OHCRN_HOME_LINK} variant="primary" size="large" layout="icon">
						<b>{translate('more-about-ohcrn')}</b>
						<RightArrow />
					</LinkButton>
				</div>
				<Card currentLang={currentLang} />
			</div>
		</div>
	);
};

export default HomeComponent;
