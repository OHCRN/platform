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

import Image, { StaticImageData } from 'next/image';
import clsx from 'clsx';
import { ReactNode } from 'react';
import Link from 'next/link';

import OICRLogoEN from 'src/../public/assets/images/oicr-logo-gray-en.svg';
import ChevronSvg from 'src/../public/assets/images/chevron-large.svg';
import { ValidLanguage, getTranslation } from 'src/i18n';
import LanguageToggle from 'src/components/common/Header/LanguageToggle';
import HelpButton from 'src/components/common/Header/HelpButton';
import LocalizedLink from 'src/components/common/Link/LocalizedLink';
import { RouteName } from 'src/components/common/Link/types';
import { getUnselectedLang } from 'src/components/common/Link/utils';

import styles from './SideImageLayout.module.scss';

interface SideImageLayoutProps {
	children: ReactNode;
	className?: string;
	currentLang: ValidLanguage;
	desktopHeaderImage: StaticImageData;
	desktopNavAction?: { bottomText: string; topText: string; url: RouteName };
	desktopNavButton?: { description: string; button: JSX.Element };
	mainSubtitle: ReactNode;
	mainTitle: string;
	navTitle: string;
}

const SideImageLayout = ({
	children,
	className,
	currentLang,
	desktopHeaderImage,
	desktopNavAction,
	desktopNavButton,
	mainSubtitle,
	mainTitle,
	navTitle,
}: SideImageLayoutProps) => {
	const { translate } = getTranslation(currentLang);

	const langToSelect = getUnselectedLang(currentLang);

	return (
		<div className={clsx(styles.container, className)}>
			<header className={styles.desktopHeader}>
				<Image className={styles.image} src={desktopHeaderImage} alt="" />
				<div className={clsx(styles.content)}>
					<Link href={`/${currentLang}`} className={styles.logoLink}>
						<Image
							src={OICRLogoEN}
							alt={translate('footer', 'oicrLogoAlt')}
							className={styles.logoImg}
						/>
					</Link>
					<h1 className={styles.title}>{navTitle}</h1>
				</div>
			</header>
			<div className={styles.desktopHeaderSpace}></div>
			<header className={styles.mobileTabletHeader}>
				<h1 className={styles.title}>{navTitle}</h1>
			</header>
			<div className={styles.main}>
				<nav className={styles.desktopNav}>
					<div className={styles.leftButtons}>
						<LanguageToggle
							currentLang={currentLang}
							langToSelect={langToSelect}
							fullLabel={translate('header', langToSelect)}
						/>
						<HelpButton label={translate('header', 'help')} />
					</div>
					<div className={styles.rightButtons}>
						{desktopNavButton && (
							<div className={styles.desktopNavButton}>
								<span className={styles.description}>{desktopNavButton.description}</span>
								{desktopNavButton.button}
							</div>
						)}
						{desktopNavAction && (
							<LocalizedLink
								className={styles.desktopNavAction}
								defaultStyle={false}
								linkLang={currentLang}
								name={desktopNavAction.url}
							>
								<div className={styles.text}>
									<span>{desktopNavAction.topText}</span>
									<span className={styles.bottomText}>{desktopNavAction.bottomText}</span>
								</div>
								<Image src={ChevronSvg} alt="" className={styles.chevron} priority />
							</LocalizedLink>
						)}
					</div>
				</nav>
				<div className={styles.content}>
					<h2 className={styles.mainTitle}>{mainTitle}</h2>
					<p className={styles.mainSubtitle}>{mainSubtitle}</p>
					{children}
				</div>
			</div>
		</div>
	);
};

export default SideImageLayout;
