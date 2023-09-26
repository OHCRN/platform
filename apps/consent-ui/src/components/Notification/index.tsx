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

import { JSX } from 'react';
import clsx from 'clsx';

import styles from './Notification.module.scss';

export type NotificationLevel = 'error' | 'info' | 'success' | 'warning';

export interface NotificationProps {
	className?: string;
	level: NotificationLevel;
	title: string | JSX.Element;
	description?: string | JSX.Element;
	dismissable?: boolean;
}

const notificationIcons: Record<NotificationLevel, JSX.Element> = {
	error: <></>,
	info: <></>,
	success: <></>,
	warning: <></>,
} as const;

const Notification = ({
	className = '',
	level,
	title,
	description,
	dismissable,
}: NotificationProps) => {
	return (
		<div className={clsx(styles.base, styles[level], styles[className])}>
			<div className="container">
				<div className="icon">{notificationIcons[level]}</div>
				<div className="text">
					<div className="title">{title}</div>
					<div className="description">{description}</div>
				</div>
				<div className="dismissButtonWrapper">{dismissable && 'x'}</div>
			</div>
		</div>
	);
};

export default Notification;
