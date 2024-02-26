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
import { useId, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image, { StaticImageData } from 'next/image';
import { useDetectClickOutside } from 'react-detect-click-outside';

import { ValidLanguage } from 'src/i18n';
import { defaultLanguage } from 'src/i18n/settings';
import LanguageToggle from 'src/components/common/Header/LanguageToggle';
import { HeaderDictionary } from 'src/i18n/locales/en/header';
import OpenMenuIcon from 'src/../public/assets/images/hamburger.svg';
import CloseMenuIcon from 'src/../public/assets/images/close-icon.svg';
import OhcrnImage from 'src/../public/assets/images/ohcrn_large.svg';

import { RouteName } from '../Link/types';
import { getLinkNameByPath } from '../Link/utils';

import HamburgerMenu from './HamburgerMenu';
import styles from './Header.module.scss';
import HelpButton from './HelpButton';

const ROUTES_WITHOUT_DESKTOP_HEADER: RouteName[] = ['invite', 'register'];

const icons: {
	[k in ValidLanguage]: StaticImageData;
} = {
	en: OhcrnImage,
	fr: OhcrnImage, // TODO: get FR icon
};

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
	textDict: HeaderDictionary;
};

const Header = ({ currentLang, textDict }: HeaderContentProps) => {
	const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
	const mainIcon = icons[currentLang || defaultLanguage];
	const pathname = usePathname();
	const hiddenOnDesktop = checkHiddenOnDesktop(pathname, currentLang);
	const hamburgerMenuId = `menu-${useId()}`;

	const ref = useDetectClickOutside({
		onTriggered: () => {
			console.log('click outside');
			setShowHamburgerMenu(false);
		},
	});

	const toggleHamburgerMenu = () => {
		setShowHamburgerMenu(!showHamburgerMenu);
	};

	return (
		<header className={styles.header}>
			<div className={clsx(styles.headerBar, hiddenOnDesktop && styles['hide-desktop'])}>
				<div>
					<Link href={`/${currentLang}`}>
						<Image src={mainIcon} priority alt={textDict.logoAltText} className={styles.logo} />
					</Link>
				</div>
				<nav role="navigation" className={styles.right}>
					<div className={styles.headerItem}>
						<LanguageToggle currentLang={currentLang} />
					</div>
					{/* TODO: implement real help button, ticket TBD */}
					<div className={styles.help}>
						<HelpButton label={textDict.help} />
					</div>
					{/* TODO: implement mobile language toggle inside user menu in separate PR for https://github.com/OHCRN/consent-platform/issues/16 */}
					<div className={styles['user-menu']}>
						{/* Desktop */}
						<div className={styles.desktopUserMenu}>Hello</div>
						{/* Mobile */}
						<button
							type="button"
							className={styles.hamburgerToggle}
							onClick={toggleHamburgerMenu}
							ref={ref}
							aria-label={textDict.hamburgerMenuAltText}
							aria-expanded={showHamburgerMenu}
							aria-controls={hamburgerMenuId}
						>
							{showHamburgerMenu ? (
								<Image src={CloseMenuIcon} alt={textDict.hamburgerMenuAltText} />
							) : (
								<Image src={OpenMenuIcon} alt={textDict.hamburgerMenuAltText} />
							)}
						</button>
					</div>
				</nav>
			</div>
			<HamburgerMenu
				id={hamburgerMenuId}
				options={hamburgerMenuOptions}
				ref={ref}
				showHambugerMenu={showHamburgerMenu}
			/>
		</header>
	);
};

export default Header;
