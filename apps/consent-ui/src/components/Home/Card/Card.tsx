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

import { ValidLanguage, getTranslation } from '@/i18n';
import PatientIcon from '@/components/SVGIcons/Family';
import DoctorIcon from '@/components/SVGIcons/Doctor';
import RightArrow from '@/components/SVGIcons/Arrow';
import Chevron from '@/components/SVGIcons/Chevron';

import styles from './Card.module.scss';
import CardLink from './CardLink';

const Card = async ({ currentLang }: { currentLang: ValidLanguage }) => {
	const translate = await getTranslation(currentLang, 'landing-page');
	return (
		<div className={styles.card}>
			<h2>{translate('join-ohcrn')}</h2>
			<p>
				<b>{translate('join-ohcrn-description')}</b>
			</p>
			{/* mobile view */}
			<CardLink
				path={'register'}
				currentLang={currentLang}
				Icon={PatientIcon}
				classes={styles.mobileCardBtn}
				iconClasses={styles.patientIcon}
			>
				<strong>{translate('participants-register-today')}</strong>
				<RightArrow classes={styles.arrow} />
			</CardLink>
			<CardLink
				path={'invite'}
				currentLang={currentLang}
				Icon={DoctorIcon}
				classes={styles.mobileCardBtn}
				iconClasses={styles.doctorIcon}
			>
				<strong>{translate('clinicians-register-today')}</strong>
				<RightArrow classes={styles.arrow} />
			</CardLink>
			{/* tablet/desktop view */}
			<CardLink
				path={'register'}
				currentLang={currentLang}
				Icon={PatientIcon}
				classes={styles.tabletCardBtn}
				iconClasses={styles.patientIcon}
			>
				<span>
					{translate('long-participants-register-today')}{' '}
					<strong>{translate('register-yourself-today')}</strong>
				</span>
				<Chevron classes={styles.chevron} />
			</CardLink>
			<CardLink
				path={'invite'}
				currentLang={currentLang}
				Icon={DoctorIcon}
				classes={styles.tabletCardBtn}
				iconClasses={styles.doctorIcon}
			>
				<span>
					{translate('long-clinicians-register-today')}{' '}
					<strong>{translate('register-patient-today')}</strong>
				</span>
				<Chevron classes={styles.chevron} />
			</CardLink>
		</div>
	);
};

export default Card;
