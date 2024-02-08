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

import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';

import { RouteName } from 'src/components/common/Link/types';

export type Notification = 'consentComplete' | 'consentInProgress' | 'emailVerified' | 'inviteSent';

export type NotificationConfig =
	| {
			notification: Notification;
			page: RouteName;
	  }
	| undefined;

type NotificationContextType = {
	dismissNotification: () => void;
	notificationConfig?: NotificationConfig;
	showNotification: (notificationConfig: NotificationConfig) => void;
};

const defaultNotificationContext: NotificationContextType = {
	dismissNotification: () => {},
	notificationConfig: undefined,
	showNotification: () => {},
};

const NotificationContext = createContext<NotificationContextType>(defaultNotificationContext);

const NotificationProvider = ({ children }: { children: ReactNode }) => {
	const [notificationConfig, setNotificationConfig] = useState<NotificationConfig>(undefined);

	const dismissNotification = useCallback(
		() => setNotificationConfig(undefined),
		[setNotificationConfig],
	);

	const showNotification = useCallback(
		(config: NotificationConfig) => setNotificationConfig(config),
		[setNotificationConfig],
	);

	const value = useMemo(
		() => ({
			dismissNotification,
			notificationConfig,
			showNotification,
		}),
		[dismissNotification, notificationConfig, showNotification],
	);

	return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

export const useNotification = () => {
	return useContext(NotificationContext);
};

export default NotificationProvider;
