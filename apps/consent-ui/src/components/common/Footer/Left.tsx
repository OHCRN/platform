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

import OICRLogo from 'src/../public/assets/images/oicr.svg';
import InstagramLogo from 'src/../public/assets/images/instagram.svg';
import TwitterLogo from 'src/../public/assets/images/twitter.svg';
import { TranslationFunction } from 'src/i18n';

import styles from './Footer.module.scss';

const Left = ({ translate }: { translate: TranslationFunction }) => {
	return (
		<div className={styles.left}>
			<Link href="#" className={styles.icon}>
				<Image alt={translate('footer', 'oicrLogoAlt')} className={styles.oicr} src={OICRLogo} />
			</Link>
			<div className={styles.mediaIcons}>
				<Link href="#" className={styles.icon}>
					<Image
						alt={translate('footer', 'instagramLogoAlt')}
						className={styles.instagram}
						src={InstagramLogo}
					/>
				</Link>
				<Link href="#" className={styles.icon}>
					<Image
						alt={translate('footer', 'twitterLogoAlt')}
						className={styles.twitter}
						src={TwitterLogo}
					/>
				</Link>
			</div>
		</div>
	);
};

export default Left;
