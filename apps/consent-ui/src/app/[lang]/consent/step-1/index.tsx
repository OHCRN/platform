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
import { ConsentCategory } from 'common';

import { getTranslation, ValidLanguage } from '@/i18n';
import LocalizedLink from '@/components/Link/LocalizedLink';
import { RouteName } from '@/components/Link/types';

// TODO: for demoing localized named links, consent form sections will be routed to properly in a later ticket
export const PathList = ({
	section,
	translate,
	lang,
}: {
	section: ConsentCategory;
	translate: any;
	lang: ValidLanguage;
}) => {
	const paths: { name: RouteName; key?: string }[] = [
		{ name: 'consent-1', key: ConsentCategory.enum.INFORMED_CONSENT },
		{ name: 'consent-2', key: ConsentCategory.enum.CONSENT_RELEASE_DATA },
		{ name: 'consent-3', key: ConsentCategory.enum.CONSENT_RESEARCH_PARTICIPATION },
		{ name: 'consent-4', key: ConsentCategory.enum.CONSENT_RECONTACT },
		{ name: 'consent-5', key: ConsentCategory.enum.CONSENT_REVIEW_SIGN },
	];
	return (
		<ul>
			{paths.map(({ name, key }) => (
				<li key={name} className={key === section ? 'font-bold' : ''}>
					<LocalizedLink name={name} lang={lang}>
						{translate(key)}
					</LocalizedLink>
				</li>
			))}
		</ul>
	);
};

const ConsentForms = async ({
	lang,
	section,
}: {
	lang: ValidLanguage;
	section: ConsentCategory;
}) => {
	const translate = await getTranslation(lang);
	return (
		<div>
			<h2>{translate(section)}</h2>
			<PathList section={section} translate={translate} lang={lang} />
			<Link href={`/${lang}`}>{translate('home')}</Link>
		</div>
	);
};

export default ConsentForms;
