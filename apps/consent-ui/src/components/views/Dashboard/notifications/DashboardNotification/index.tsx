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

import { ValidLanguage } from 'src/i18n';
import { Notification, useNotification } from 'src/components/providers/NotificationProvider';

import DashboardNotificationDisplay from './DashboardNotificationDisplay';

const DashboardNotification = ({ currentLang }: { currentLang: ValidLanguage }) => {
	const { notificationConfig, setNotificationConfig } = useNotification();

	// STUB - get name, email, email verified, consent progress from API
	const consentInProgress = false;
	const email = 'homersimpson@gmail.com';
	const emailVerified = false;
	const name = 'Homer Simpson';

	// STUB - get email verified URL param from keycloak redirect URL
	const emailVerifiedParam = false;

	//  logic for dismissing one notification and showing another
	// has not been implemented, since it can't be accurately tested.
	// this file will require revisions as features are completed.

	// STUB - determine which notification to show
	let nextNotification: Notification | undefined;

	if (
		notificationConfig?.page === 'dashboard' &&
		notificationConfig?.notification === 'consentComplete'
	) {
		// user has just completed the consent wizard. do nothing here.
		// notification context is updated on consent wizard submission.
		// show once
		nextNotification = undefined;
	} else if (emailVerifiedParam) {
		// user has just verified their email
		// (redirected to dashboard with URL param)
		// show once
		nextNotification = 'emailVerified';
	} else if (!emailVerified) {
		// user has registered, but not verified their email
		// or started the consent process.
		// show every session
		nextNotification = 'emailNotVerified';
	} else if (consentInProgress) {
		// user has started the consent wizard
		// show every session
		nextNotification = 'consentInProgress';
	}

	if (nextNotification) {
		setNotificationConfig({ page: 'dashboard', notification: nextNotification });
	}

	return <DashboardNotificationDisplay currentLang={currentLang} email={email} name={name} />;
};

export default DashboardNotification;
