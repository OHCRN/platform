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

import { useEffect } from 'react';

import { ValidLanguage } from 'src/i18n';
import { Notification, useNotification } from 'src/components/providers/NotificationProvider';
import { NotificationTranslations } from 'src/components/providers/NotificationProvider/getNotificationTranslations';

import DashboardNotificationDisplay from './DashboardNotificationDisplay';

const DashboardNotification = ({
	currentLang,
	notificationTranslations,
}: {
	currentLang: ValidLanguage;
	notificationTranslations: NotificationTranslations;
}) => {
	const { showNotification } = useNotification();

	// STUB - get consent progress from API
	const consentInProgress = true;

	// STUB - get email verified URL param from keycloak redirect URL
	const emailVerifiedParam = false;

	useEffect(() => {
		// STUB - determine which notification to show
		let nextNotification: Notification | undefined;

		if (emailVerifiedParam) {
			nextNotification = 'emailVerified';
		} else if (consentInProgress) {
			nextNotification = 'consentInProgress';
		}

		if (nextNotification) {
			showNotification({ page: 'dashboard', notification: nextNotification });
		}
	}, [consentInProgress, emailVerifiedParam, showNotification]);

	return (
		<DashboardNotificationDisplay
			currentLang={currentLang}
			notificationTranslations={notificationTranslations}
		/>
	);
};

export default DashboardNotification;
