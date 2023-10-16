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

import styles from './Header.module.scss';

// TODO i18n - we should have a dictionary of english & french internal paths
const PATHNAMES_WITHOUT_DESKTOP_NAVBAR = ['/en/invite', '/en/register'];

const checkHiddenOnDesktop = (pathname: string) => {
	// TODO this may become more complex when URL parameters are added
	return PATHNAMES_WITHOUT_DESKTOP_NAVBAR.includes(pathname);
};

const HeaderWrapper = ({ children }: { children: ReactNode }) => {
	const pathname = usePathname();
	const hiddenOnDesktop = checkHiddenOnDesktop(pathname);
	return (
		<header className={clsx(styles.header, hiddenOnDesktop && styles['hide-desktop'])}>
			{children}
		</header>
	);
};

export default HeaderWrapper;
