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

import { JSX, ReactNode } from 'react';
import clsx from 'clsx';

import CheckmarkCircle from '../Icons/CheckmarkCircle';
import ExclamationTriangle from '../Icons/ExclamationTriangle';
import InfoCircle from '../Icons/InfoCircle';

import styles from './Notification.module.scss';
import DismissButton from './DismissButton';
import ActionButton from './ActionButton';

export type NotificationLevel = 'error' | 'info' | 'success' | 'warning';
export type NotificationVariant = 'small' | 'medium';

export interface NotificationProps {
	actionProps?: { text: string; onClick: () => void };
	className?: string;
	level: NotificationLevel;
	title: ReactNode;
	children?: ReactNode;
	dismissable?: boolean;
	variant?: NotificationVariant;
}

const notificationIcons: Record<NotificationLevel, JSX.Element> = {
	error: <ExclamationTriangle />,
	info: <InfoCircle />,
	success: <CheckmarkCircle />,
	warning: <ExclamationTriangle />,
} as const;

const Notification = ({
	actionProps,
	className = '',
	level,
	title,
	children,
	dismissable,
	variant = 'medium',
}: NotificationProps) => {
	return (
		<div className={clsx(styles.notification, styles[level], styles[variant], className)}>
			<div className={clsx(styles.container)}>
				<div className={clsx(styles.icon)}>{notificationIcons[level]}</div>
				<div className={clsx(styles.body)}>
					<div className={clsx(styles.title)}>{title}</div>
					{children && <div className={clsx(styles.description)}>{children}</div>}
					{actionProps && (
						<div className={clsx(styles.action)}>
							<ActionButton onClick={actionProps.onClick}>{actionProps.text}</ActionButton>
						</div>
					)}
				</div>
				{dismissable && <DismissButton className={clsx(styles['dismiss-button'])} />}
			</div>
		</div>
	);
};

export default Notification;
