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
import urlJoin from 'url-join';

import routesByLocale from '@/i18n/routes/routesByLocale.json';
import { defaultLanguage } from '@/i18n/settings';

import { LocalizedLinkProps } from './types';

const LocalizedLink = ({
	name,
	params,
	lang,
	className,
	children,
	...rest
}: LocalizedLinkProps) => {
	let locale = lang;
	const localeRoutes = routesByLocale[lang];
	if (!localeRoutes) {
		console.error(`No routes found for locale "${lang}"`);
		locale = defaultLanguage;
	}

	let routePath = localeRoutes[name];
	if (!routePath) {
		console.error(`No route found for name "${name}"`);
		routePath = '/';
	}

	let href = routePath;
	if (params) {
		Object.keys(params).forEach((param) => {
			href = href.replace(new RegExp(':' + param, 'g'), (params as any)[param]);
		});
	}

	return (
		<Link href={urlJoin(locale, href)} className={className} {...rest}>
			{children}
		</Link>
	);
};

export default LocalizedLink;
