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
import clsx from 'clsx';

import { ValidLanguage, getTranslation } from 'src/i18n';
import PatientIcon from 'src/components/common/Icons/Family';
import DoctorIcon from 'src/components/common/Icons/Doctor';
import RightArrow from 'src/components/common/Icons/Arrow';
import Chevron from 'src/components/common/Icons/Chevron';
import Card from 'src/components/common/Card';
import CardLink from 'src/components/common/Card/CardLink';

import styles from './LandingPageCard.module.scss';

const LandingPageCard = async ({ currentLang }: { currentLang: ValidLanguage }) => {
	const translate = getTranslation(currentLang);
	return (
		<Card dropShadow="none" className={styles['landing-page-card']}>
			<h2>{translate('landingPage', 'joinOhcrn')}</h2>
			<p>
				<b>{translate('landingPage', 'joinOhcrnDescription')}</b>
			</p>

			{/* mobile view */}
			<CardLink name={'register'} currentLang={currentLang} className={styles.mobile}>
				<PatientIcon className={clsx(styles.patientIcon, styles.icon)} />
				<strong>{translate('landingPage', 'participantsRegisterToday')}</strong>
				<RightArrow className={clsx(styles.arrow, styles.icon)} />
			</CardLink>

			<CardLink name={'invite'} currentLang={currentLang} className={styles.mobile}>
				<DoctorIcon className={clsx(styles.doctorIcon, styles.icon)} />
				<strong>{translate('landingPage', 'cliniciansRegisterToday')}</strong>
				<RightArrow className={clsx(styles.arrow, styles.icon)} />
			</CardLink>

			{/* tablet/desktop view */}
			<CardLink name={'register'} currentLang={currentLang} className={styles.tablet}>
				<PatientIcon className={clsx(styles.patientIcon, styles.icon)} />
				<span>
					{translate('landingPage', 'longParticipantsRegisterToday')}{' '}
					<strong>{translate('landingPage', 'registerYourselfToday')}</strong>
				</span>
				<Chevron className={clsx(styles.chevron, styles.icon)} />
			</CardLink>

			<CardLink name={'invite'} currentLang={currentLang} className={styles.tablet}>
				<DoctorIcon className={clsx(styles.doctorIcon, styles.icon)} />
				<span>
					{translate('landingPage', 'longCliniciansRegisterToday')}{' '}
					<strong>{translate('landingPage', 'registerPatientToday')}</strong>
				</span>
				<Chevron className={clsx(styles.chevron, styles.icon)} />
			</CardLink>
		</Card>
	);
};

export default LandingPageCard;
