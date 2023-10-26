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

import RightArrow from 'src/components/Icons/Arrow';

import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonColor = 'default' | 'blue' | 'green';
export type ButtonSize = 'base' | 'large';
export type ButtonLayout = 'default' | 'right-icon' | 'left-icon';
export type ButtonAction = 'next' | 'prev';
export interface ButtonProps {
	children: ReactNode;
	onClick: (e: React.SyntheticEvent<HTMLElement>) => any;
	variant?: ButtonVariant;
	color?: ButtonColor;
	size?: ButtonSize;
	layout?: ButtonLayout;
	action?: ButtonAction;
	disabled?: boolean;
	className?: string;
}
const Button = ({
	children,
	onClick,
	variant = 'primary',
	color = 'default',
	size = 'base',
	layout = 'default',
	action,
	disabled = false,
	className = '',
}: ButtonProps) => {
	return (
		<button
			className={clsx(
				styles.base,
				styles[variant],
				styles[color],
				styles[size],
				styles[layout],
				action === 'prev' && styles['left-icon'],
				action === 'next' && styles['right-icon'],
				className,
			)}
			disabled={disabled}
			onClick={onClick}
		>
			{action === 'prev' && <RightArrow className={styles['left-arrow']} />}
			{children}
			{action === 'next' && <RightArrow />}
		</button>
	);
};

export default Button;
