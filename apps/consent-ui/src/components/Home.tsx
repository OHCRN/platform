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

import { User } from 'common';

import { ValidLanguage, getTranslation } from '@/i18n';

import LocalizedLink from './Link/LocalizedLink';
import { RouteName } from './Link/types';

const user: User = {
	id: '1',
	name: 'Homer Simpson',
	email: 'homersimpson@example.com',
};

// TODO: for demoing localized named links, these pages will be routed to properly in a later ticket
const paths: { name: RouteName; key?: string }[] = [
	{ name: 'register' },
	{ name: 'invite' },
	{ name: 'dashboard' },
	{ name: 'consent-1', key: 'consent' },
];

const HomeComponent = async ({ lang }: { lang: ValidLanguage }) => {
	const translate = await getTranslation(lang);
	return (
		<div>
			<h1>{translate('title')}</h1>
			<p>{translate('sample-text')}</p>
			<h2>{translate('greeting', { name: user.name })}</h2>
			<ul>
				{paths.map(({ name, key }) => (
					<li key={name}>
						<LocalizedLink name={name} lang={lang}>
							{translate(key || name)}
						</LocalizedLink>
					</li>
				))}{' '}
			</ul>
		</div>
	);
};

export default HomeComponent;
