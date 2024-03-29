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
import { getNotificationComponent } from 'src/components/providers/NotificationProvider/utils';
import { NotificationTranslations } from 'src/components/providers/NotificationProvider/getNotificationTranslations';

import styles from './DashboardNotificationDisplay.module.scss';

const DashboardNotificationDisplay = ({
	currentLang,
	notificationTranslations,
}: {
	currentLang: ValidLanguage;
	notificationTranslations: NotificationTranslations;
}) => {
	const { dismissNotification, notificationConfig } = useNotification();

	// check if there's a notification for this page in context
	if (!(notificationConfig && notificationConfig.page === 'dashboard')) {
		return <></>;
	}

	const notificationProps = {
		currentLang,
		dismissClick: dismissNotification,
	};

	const notificationComponent = getNotificationComponent({
		notificationConfig,
		notificationProps,
		notificationTranslations,
	});

	if (notificationComponent) {
		return <div className={styles.notification}>{notificationComponent}</div>;
	} else {
		return <></>;
	}
};

export default DashboardNotificationDisplay;
