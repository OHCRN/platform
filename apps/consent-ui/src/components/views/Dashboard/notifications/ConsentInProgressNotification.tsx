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
import Notification from 'src/components/common/Notification';

const ConsentInProgressNotification = ({
	currentLang,
	dismissClick,
}: {
	currentLang: ValidLanguage;
	dismissClick: () => void;
}) => {
	const translate = getTranslation(currentLang);
	return (
		<Notification
			dismissClick={dismissClick}
			level="success"
			title={translate('consentInProgressNotification', 'title')}
		>
			{translate('consentInProgressNotification', 'text1')}
			<Link href="#">{translate('consentInProgressNotification', 'linkText')}</Link>
			{/* TODO add a link for "send us a message" https://github.com/OHCRN/platform/issues/354 */}
			{translate('consentInProgressNotification', 'text2')}
		</Notification>
	);
};

export default ConsentInProgressNotification;