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
import Image from 'next/image';
import clsx from 'clsx';
import { Suspense } from 'react';

import packageJson from '@/../package.json';
import GithubLogo from '@/public/github.svg';
import OvertureLogo from '@/public/overture.svg';
import { ValidLanguage, getTranslation } from '@/i18n';
import { getAPIStatus } from '@/services/api';

import styles from './Footer.module.scss';

// keep this in a separate component so the Versions component renders everything else
// and isn't waiting on the getAPIStatus() Promise to resolve
const APIVersion = async ({ currentLang }: { currentLang: ValidLanguage }) => {
	const translate = await getTranslation(currentLang, 'footer');
	const { version: apiVersion } = await getAPIStatus();
	return <span>{translate('api', { apiVersion })}</span>;
};

const Versions = async ({ currentLang }: { currentLang: ValidLanguage }) => {
	const translate = await getTranslation(currentLang, 'footer');
	return (
		<div className={styles.versions}>
			<div className={styles.credit}>
				<span>
					<b>{translate('powered-by')}: </b>
				</span>
				<Link href="#" className={clsx(styles.icon, styles.overture)}>
					<Image src={OvertureLogo} alt={translate('overture-alt')} />
				</Link>
				<Link href="#" className={styles.icon}>
					<Image src={GithubLogo} alt={translate('github-alt')} />
				</Link>
			</div>
			<div className={styles.copyright}>
				<span>{translate('copyright')} </span>
				<span>{translate('ohcrn-registry', { registryVersion: packageJson.version })} - </span>
				<Suspense fallback={<span />}>
					<APIVersion currentLang={currentLang} />
				</Suspense>
			</div>
		</div>
	);
};

export default Versions;
