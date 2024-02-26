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

import clsx from 'clsx';
import Link from 'next/link';
import { MutableRefObject } from 'react';

import styles from './HamburgerMenu.module.scss';

const HamburgerMenu = ({
	id,
	options,
	ref,
	showHambugerMenu,
}: {
	id: string;
	options: { label: React.ReactNode; link?: string }[];
	ref: MutableRefObject<null>;
	showHambugerMenu: boolean;
}) => {
	return (
		<div
			className={clsx(styles.hamburgerContainer, !showHambugerMenu && styles.hamburgerHidden)}
			id={id}
			ref={ref}
			aria-hidden={!showHambugerMenu}
		>
			{options.map((option) => (
				<Link href={option.link || ''} className={styles.hamburgerLine} key={option.link}>
					{option.label}
				</Link>
			))}
		</div>
	);
};

export default HamburgerMenu;
