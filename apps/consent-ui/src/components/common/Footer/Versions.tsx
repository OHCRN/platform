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

import packageJson from 'src/../package.json';
import OvertureLogo from 'src/../public/assets/images/overture.svg';
import GithubLogo from 'src/../public/assets/images/github.svg';
import { ValidLanguage, getTranslation, replaceParams } from 'src/i18n';

import APIVersion from './APIVersion';
import styles from './Footer.module.scss';

const Versions = async ({ currentLang }: { currentLang: ValidLanguage }) => {
	const { translateNamespace } = getTranslation(currentLang);
	const textDict = translateNamespace('footer');

	return (
		<div className={styles.versions}>
			<div className={styles.credit}>
				<span>
					<b>{textDict.poweredBy}: </b>
				</span>
				<Link href="#" className={clsx(styles.icon, styles.overture)}>
					<Image src={OvertureLogo} alt={textDict.overtureAlt} />
				</Link>
				<Link href="#" className={styles.icon}>
					<Image src={GithubLogo} alt={textDict.githubAlt} />
				</Link>
			</div>
			<div className={styles.copyright}>
				<span>{replaceParams(textDict.copyright, { year: new Date().getFullYear() })} </span>
				<span>
					{replaceParams(textDict.copyright, { registryVersion: packageJson.version })} -{' '}
				</span>
				<Suspense fallback={<span />}>
					<APIVersion currentLang={currentLang} />
				</Suspense>
			</div>
		</div>
	);
};

export default Versions;
