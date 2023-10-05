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

import Link from 'next/link';

import { getTranslation, ValidLanguage } from '@/i18n';
import Notification from '@/components/Notification';

const Dashboard = async ({ currentLang }: { currentLang: ValidLanguage }) => {
	const translate = await getTranslation(currentLang);
	return (
		<div>
			<h2>{translate('dashboard')}</h2>
			<Link href={`/${currentLang}`}>{translate('home')}</Link>
			<Notification
				actionText="Minim veniam commodo"
				dismissable
				level="error"
				title="Sint sit aute sunt non consequat."
				description="Cillum incididunt cillum elit do ipsum sit deserunt anim ipsum et Lorem. Eu laborum veniam sint eiusmod dolor id laborum nostrud occaecat pariatur amet in."
			/>
			<Notification
				level="info"
				title="Sint sit aute sunt non consequat."
				description={
					<>
						Cillum incididunt cillum elit do ipsum <b>sit deserunt</b> anim ipsum et Lorem. Eu
						laborum veniam sint <a href="#">eiusmod dolor</a> id laborum nostrud occaecat pariatur
						amet in.
					</>
				}
			/>
			<Notification dismissable level="success" title="Sint sit aute sunt non consequat." />
			<Notification
				actionText="Sit est commodo sunt"
				level="warning"
				title="Sint sit aute sunt non consequat."
			/>
		</div>
	);
};

export default Dashboard;
