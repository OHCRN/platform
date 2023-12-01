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
import clsx from 'clsx';
import { ReactNode } from 'react';

import OICRLogoEN from 'src/public/oicr-logo-gray-en.svg';
import { ValidLanguage, getTranslation } from 'src/i18n';
import LanguageToggle from 'src/components/Header/LanguageToggle';
import { getUnselectedLang } from 'src/components/Link/utils';
import HelpButton from 'src/components/Header/HelpButton';

import styles from './SideImageLayout.module.scss';

const SideImageLayout = ({
	children,
	currentLang,
	headerAction,
	showLogin = false,
	sidebarClassName,
	sidebarImage,
	title,
}: {
	children: ReactNode;
	currentLang: ValidLanguage;
	headerAction?: { topText: string; bottomText: string; url: string };
	showLogin?: boolean;
	sidebarClassName?: string;
	sidebarImage: StaticImageData;
	title: string;
}) => {
	const translate = getTranslation(currentLang);
	const langToSelect = getUnselectedLang(currentLang);

	return (
		<div className={clsx(styles.container)}>
			<div className={clsx(styles.sidebar, sidebarClassName)}>
				<div className={clsx(styles.sidebarImage)}>
					<Image src={sidebarImage} alt="" />
				</div>
				<div className={clsx(styles.sidebarText)}>
					<Link href={`/${currentLang}`} className={styles.logoLink}>
						<Image
							src={OICRLogoEN}
							alt={translate('footer', 'oicr-logo-alt')}
							className={styles.logoImg}
						/>
					</Link>
					<h1 className={clsx(styles.title)}>{title}</h1>
				</div>
			</div>
			<div className={clsx(styles.mobileTabletHeader)}>
				<h1 className={clsx(styles.title)}>{title}</h1>
			</div>
			<div className={clsx(styles.main)}>
				<div className={clsx(styles.content)}>
					<div className={clsx(styles.desktopHeader)}>
						<div className={clsx(styles.leftButtons)}>
							<LanguageToggle currentLang={currentLang} />
							<HelpButton label={translate('header', 'help')} />
						</div>
						<div className={clsx(styles.rightButtons)}>
							{showLogin && 'TODO login'}
							<br />
							<div className={clsx(styles.registerButton)}>
								{headerAction?.topText} <br /> {headerAction?.bottomText}
							</div>
						</div>
					</div>
					{children}
				</div>
			</div>
		</div>
	);
};

export default SideImageLayout;
