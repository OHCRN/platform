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
import Image from 'next/image';

import { ValidLanguage, getTranslation } from '@/i18n';
import PatientIcon from '@/public/family.svg';
import DoctorIcon from '@/public/doctor.svg';
import Chevron from '@/public/chevron.svg';
import RightArrow from '@/components/icons/arrow';
import LocalizedLink from '@/components/Link/LocalizedLink';

import styles from './Card.module.scss';
import CardButton from './CardButton';

const Card = async ({ currentLang }: { currentLang: ValidLanguage }) => {
	const translate = await getTranslation(currentLang, 'landing-page');
	return (
		<div className={styles.card}>
			<h3>{translate('join-ohcrn')}</h3>
			<p>
				<b>{translate('join-ohcrn-description')}</b>
			</p>
			{/* mobile view */}
			<CardButton Icon={PatientIcon} classes={styles.mobileCardBtn}>
				<LocalizedLink name={'register'} linkLang={currentLang}>
					{translate('participants-register-today')}
					<RightArrow />
				</LocalizedLink>
			</CardButton>
			<CardButton Icon={DoctorIcon} classes={styles.mobileCardBtn}>
				<LocalizedLink name={'invite'} linkLang={currentLang}>
					{translate('clinicians-register-today')}
					<RightArrow />
				</LocalizedLink>
			</CardButton>
			{/* tablet/desktop view */}
			<CardButton Icon={PatientIcon} classes={styles.tabletCardBtn}>
				<span>
					{translate('long-participants-register-today')}{' '}
					<LocalizedLink name={'register'} linkLang={currentLang}>
						{translate('register-yourself-today')}
					</LocalizedLink>
				</span>
				<Image src={Chevron} alt="Chevron" />
			</CardButton>
			<CardButton Icon={DoctorIcon} classes={styles.tabletCardBtn}>
				<span>
					{translate('long-clinicians-register-today')}{' '}
					<LocalizedLink name={'invite'} linkLang={currentLang}>
						{translate('register-patient-today')}
					</LocalizedLink>
				</span>
				<Image src={Chevron} alt="Chevron" />
			</CardButton>
		</div>
	);
};

export default Card;
