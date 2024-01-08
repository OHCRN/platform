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

import Link from 'next/link';

import { ValidLanguage, getTranslation } from 'src/i18n';
import { RegisteredNotificationDictionary } from 'src/i18n/locales/en/registeredNotification';
import Notification from 'src/components/common/Notification';

import ResendEmailVerificationButton from './ResendEmailVerificationButton';

interface RegisteredNotificationProps {
	className?: string;
	currentLang: ValidLanguage;
	dismissClick?: () => void;
	email: string;
	name: string;
}

const RegisteredNotification = ({
	className,
	currentLang,
	dismissClick,
	email,
	name,
}: RegisteredNotificationProps) => {
	const translate = getTranslation(currentLang);

	const dictionary: RegisteredNotificationDictionary = {
		actionButton: translate('registeredNotification', 'actionButton'),
		linkText: translate('registeredNotification', 'linkText'),
		text1: translate('registeredNotification', 'text1'),
		text2: translate('registeredNotification', 'text2'),
		text3: translate('registeredNotification', 'text3'),
		title: translate('registeredNotification', 'title', { name }),
	};

	const actionButton = (
		<ResendEmailVerificationButton>{dictionary.actionButton}</ResendEmailVerificationButton>
	);

	return (
		<Notification
			actionButton={actionButton}
			className={className}
			dismissClick={dismissClick}
			level="warning"
			title={dictionary.title}
		>
			{dictionary.text1}
			<b>{email}</b>
			{dictionary.text2}
			{/* TODO add support link https://github.com/OHCRN/platform/issues/342 */}
			<Link href="#">{dictionary.linkText}</Link>
			{dictionary.text3}
		</Notification>
	);
};

export default RegisteredNotification;
