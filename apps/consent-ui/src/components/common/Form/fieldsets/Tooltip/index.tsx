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

import { ReactNode } from 'react';
import clsx from 'clsx';

import styles from './Tooltip.module.scss';

// show/hide tooltip using CSS not with conditional rendering, so that it can be read by screenreaders
// https://www.tpgi.com/short-note-on-aria-labelledby-and-aria-describedby/

interface TooltipProps {
	children: ReactNode;
	className?: string;
	id?: string;
	isVisible: boolean;
	withNarrowDesktopLayout?: boolean;
}

const Tooltip = ({ children, className, id, isVisible, withNarrowDesktopLayout }: TooltipProps) => {
	return (
		<div
			className={clsx(
				styles.tooltip,
				className,
				!withNarrowDesktopLayout && styles.wideDesktop,
				isVisible && styles.visible,
			)}
			id={id}
			role="tooltip"
		>
			{children}
		</div>
	);
};

export default Tooltip;
