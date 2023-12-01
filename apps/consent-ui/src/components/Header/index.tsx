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

import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';

import { ValidLanguage, getTranslation } from 'src/i18n';
import { defaultLanguage } from 'src/i18n/settings';
import LanguageToggle from 'src/components/Header/LanguageToggle';
import OhcrnImage from 'src/public/ohcrn_large.svg';

import styles from './Header.module.scss';
import HelpButton from './HelpButton';
import HeaderWrapper from './HeaderWrapper';

const icons: {
	[k in ValidLanguage]: StaticImageData;
} = {
	en: OhcrnImage,
	fr: OhcrnImage, // TODO: get FR icon
};

const Header = async ({ currentLang }: { currentLang: ValidLanguage }) => {
	const translate = getTranslation(currentLang);
	const icon = icons[currentLang || defaultLanguage];
	return (
		<HeaderWrapper currentLang={currentLang}>
			<div>
				<Link href={`/${currentLang}`}>
					<Image
						src={icon}
						priority
						alt={translate('header', 'logo-alt-text')}
						className={styles.logo}
					/>
				</Link>
			</div>
			<div className={styles.right}>
				<div className={styles.headerItem}>
					<LanguageToggle currentLang={currentLang} />
				</div>
				{/* TODO: implement real help button, ticket TBD */}
				<div className={styles.help}>
					<HelpButton label={translate('header', 'help')} />
				</div>
				{/* TODO: implement mobile language toggle inside user menu in separate PR for https://github.com/OHCRN/consent-platform/issues/16 */}
				{/* TODO: implement user menu, ticket TBD */}
				<div className={styles['user-menu']}>
					<div>Hello</div>
				</div>
			</div>
		</HeaderWrapper>
	);
};

export default Header;
