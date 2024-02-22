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
'use client';

import clsx from 'clsx';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import { ValidLanguage } from 'src/i18n';
import { defaultLanguage } from 'src/i18n/settings';
import LanguageToggle from 'src/components/common/Header/LanguageToggle';
import { HeaderDictionary } from 'src/i18n/locales/en/header';

import { RouteName } from '../Link/types';
import { getLinkNameByPath } from '../Link/utils';

import HamburgerMenu from './HamburgerMenu';
import styles from './Header.module.scss';
import HelpButton from './HelpButton';

import { HeaderIcons } from './';

const ROUTES_WITHOUT_DESKTOP_HEADER: RouteName[] = ['invite', 'register'];

const checkHiddenOnDesktop = (pathname: string, currentLang: ValidLanguage) => {
	// checks english and french paths by using route names
	const linkName = getLinkNameByPath(pathname, currentLang);
	return ROUTES_WITHOUT_DESKTOP_HEADER.includes(linkName);
};

const hamburgerMenuOptions: { label: React.ReactNode; link?: string }[] = [
	// TODO: replace with actual links
	{ label: 'Login', link: '/' },
	{ label: 'Register', link: '/' },
	{ label: 'Help', link: '/' },
];

type HeaderContentProps = {
	currentLang: ValidLanguage;
	icons: HeaderIcons;
	textDict: HeaderDictionary;
};

const HeaderContent = ({ currentLang, icons, textDict }: HeaderContentProps) => {
	const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
	const mainIcon = icons[currentLang || defaultLanguage];

	const toggleHamburgerMenu = () => {
		setShowHamburgerMenu(!showHamburgerMenu);
	};

	const pathname = usePathname();
	const hiddenOnDesktop = checkHiddenOnDesktop(pathname, currentLang);

	return (
		<>
			<header className={clsx(styles.header, hiddenOnDesktop && styles['hide-desktop'])}>
				<div>
					<Link href={`/${currentLang}`}>
						<Image src={mainIcon} priority alt={textDict.logoAltText} className={styles.logo} />
					</Link>
				</div>
				<div className={styles.right}>
					<div className={styles.headerItem}>
						<LanguageToggle currentLang={currentLang} />
					</div>
					{/* TODO: implement real help button, ticket TBD */}
					<div className={styles.help}>
						<HelpButton label={textDict.help} />
					</div>
					{/* TODO: implement mobile language toggle inside user menu in separate PR for https://github.com/OHCRN/consent-platform/issues/16 */}
					<div className={styles['user-menu']}>
						<div className={styles.desktopUserMenu}>Hello</div>
						{/* // TODO: close menu when click outside (check in with patrick) */}
						<div className={styles.hamburgerToggle} onClick={toggleHamburgerMenu}>
							{showHamburgerMenu ? (
								<Image src={icons.closeHamburger} alt={textDict.hamburgerMenuAltText} />
							) : (
								<Image src={icons.openHamburger} alt={textDict.hamburgerMenuAltText} />
							)}
						</div>
					</div>
				</div>
			</header>
			{showHamburgerMenu && <HamburgerMenu options={hamburgerMenuOptions} />}
		</>
	);
};

export default HeaderContent;
