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

'use client';

import clsx from 'clsx';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { ValidLanguage } from 'src/i18n';

import { getLinkNameByPath } from '../Link/utils';
import { RouteName } from '../Link/types';

import styles from './Header.module.scss';

const ROUTES_WITHOUT_DESKTOP_HEADER: RouteName[] = ['invite', 'register'];

const checkHiddenOnDesktop = (pathname: string, currentLang: ValidLanguage) => {
	// checks english and french paths by using route names
	const linkName = getLinkNameByPath(pathname, currentLang);
	return ROUTES_WITHOUT_DESKTOP_HEADER.includes(linkName);
};

const HeaderWrapper = ({
	children,
	currentLang,
}: {
	children: ReactNode;
	currentLang: ValidLanguage;
}) => {
	const pathname = usePathname();
	const hiddenOnDesktop = checkHiddenOnDesktop(pathname, currentLang);
	return (
		<header className={clsx(styles.header, hiddenOnDesktop && styles['hide-desktop'])}>
			{children}
		</header>
	);
};

export default HeaderWrapper;
