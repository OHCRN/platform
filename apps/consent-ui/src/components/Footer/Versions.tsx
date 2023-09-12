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
import { Version } from 'common/src/service/Health';

import GithubLogo from '@/public/github.svg';
import OvertureLogo from '@/public/overture.svg';
import { ValidLanguage, getTranslation } from '@/i18n';
import getAPIVersion from '@/hooks/getAPIVersion';

import styles from './Footer.module.scss';

const Versions = async ({ lang }: { lang: ValidLanguage }) => {
	const translate = await getTranslation(lang, 'footer');

	const { error, isLoading, response } = await getAPIVersion();
	const apiVersionResponse: Version =
		!error && !isLoading && response ? response.data : { version: '' };
	const apiVersion = apiVersionResponse.version;

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
				<span>
					{/* TODO: fix hardcoded version */}
					{translate('ohcrn-registry', { registryVersion: '0.1.0' })} -{' '}
				</span>
				<span>{translate('api', { apiVersion })}</span>
			</div>
		</div>
	);
};

export default Versions;
