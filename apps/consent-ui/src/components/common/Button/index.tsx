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

import clsx from 'clsx';

import RightArrow from 'src/components/common/Icons/Arrow';

import { ButtonProps as BaseProps } from './types';
import styles from './Button.module.scss';

interface ButtonProps extends BaseProps {
	onClick?: (e: React.SyntheticEvent<HTMLElement>) => any;
	disabled?: boolean;
	type?: 'button' | 'submit';
}

const Button = ({
	children,
	onClick,
	variant = 'primary',
	color = 'default',
	size = 'base',
	action,
	disabled = false,
	className = '',
	LeftIcon,
	RightIcon,
	type = 'button',
}: ButtonProps) => {
	return (
		<button
			className={clsx(
				styles.base,
				styles[variant],
				styles[color],
				styles[size],
				(action === 'prev' || LeftIcon) && styles['left-icon'],
				(action === 'next' || RightIcon) && styles['right-icon'],
				className,
			)}
			disabled={disabled}
			onClick={onClick}
			type={type}
		>
			{action === 'prev' ? (
				<div>
					<RightArrow className={styles['left-arrow']} />
				</div>
			) : (
				LeftIcon && <div>{LeftIcon}</div>
			)}
			{children}
			{action === 'next' ? (
				<div>
					<RightArrow />
				</div>
			) : (
				RightIcon && <div>{RightIcon}</div>
			)}
		</button>
	);
};

export default Button;
