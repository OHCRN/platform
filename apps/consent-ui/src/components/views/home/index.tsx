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
import LinkButton from 'src/components/common/Button/LinkButton';
import BackgroundImage from 'src/public/landing-page.jpg';
import { OHCRN_HOME_LINK } from 'src/constants';

import LandingPageCard from './LandingPageCard';
import styles from './home.module.scss';

const HomeComponent = async ({ currentLang }: { currentLang: ValidLanguage }) => {
	const translate = getTranslation(currentLang);
	return (
		<div className={styles.heroContainer}>
			<div className={styles.backgroundImg}>
				<Image src={BackgroundImage} alt="" priority placeholder="blur" />
			</div>
			<div className={styles.hero}>
				<div className={styles.heroText}>
					<h1>{translate('landing-page', 'title')}</h1>
					<p>
						<b>{translate('landing-page', 'ohcrn-description')}</b>
					</p>
					<LinkButton href={OHCRN_HOME_LINK} variant="primary" size="large" action="next">
						<b>{translate('landing-page', 'more-about-ohcrn')}</b>
					</LinkButton>
				</div>
				<LandingPageCard currentLang={currentLang} />
			</div>
		</div>
	);
};

export default HomeComponent;
