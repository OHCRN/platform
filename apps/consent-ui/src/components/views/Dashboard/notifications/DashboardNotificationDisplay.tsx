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

import { useNotification } from 'src/components/providers/NotificationProvider';
import { ValidLanguage } from 'src/i18n';

import styles from './DashboardNotificationDisplay.module.scss';
import RegisteredNotification from './RegisteredNotification';

const DashboardNotification = ({
	currentLang,
	email,
	name,
}: {
	currentLang: ValidLanguage;
	email: string;
	name: string;
}) => {
	const { dismissNotification, notificationConfig } = useNotification();

	// check if there's a notification for the dashboard
	if (!(notificationConfig && notificationConfig.page === 'dashboard')) {
		return <></>;
	}

	const notificationProps = {
		className: styles.notification,
		currentLang,
		dismissClick: dismissNotification,
		email,
		name,
	};

	let notification;

	switch (notificationConfig.notification) {
		case 'emailNotVerified':
			// user has registered, but not verified their email
			// or started the consent process.
			// show every session
			notification = <RegisteredNotification {...notificationProps} />;
			break;
		case 'emailVerified':
			// user has just verified their email
			// (redirected to dashboard with URL param)
			// show once
			notification = <div>email is verified</div>;
			break;
		case 'consentInProgress':
			// user has started the consent wizard
			// show every session
			notification = <div>consent is in progress</div>;
			break;
		case 'consentComplete':
			// user has just completed the consent wizard
			// show once
			notification = <div>consent completed</div>;
			break;
		default:
			break;
	}

	if (notification) {
		return <div className={styles.notification}>{notification}</div>;
	} else {
		return <></>;
	}
};

export default DashboardNotification;
