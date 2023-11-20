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

import { ConsentCategory, ConsentStatus, ConsentWizardProgress } from 'types/entities';

import { getTranslation, ValidLanguage } from 'src/i18n';
import Card from 'src/components/Card';
import ProgressHeader from 'src/components/ProgressHeader';
import NavigationBack from 'src/components/NavigationBack';

import styles from './ConsentWizard.module.scss';

const {
	INFORMED_CONSENT,
	CONSENT_RELEASE_DATA,
	CONSENT_RESEARCH_PARTICIPATION,
	CONSENT_RECONTACT,
	CONSENT_REVIEW_SIGN,
} = ConsentCategory.enum;

const ConsentWizard = async ({
	currentLang,
	currentStep,
}: {
	currentLang: ValidLanguage;
	currentStep: ConsentCategory;
}) => {
	const translate = getTranslation(currentLang);

	// TODO: return consent wizard progress from consent-api
	const progress: ConsentWizardProgress = {
		[INFORMED_CONSENT]: ConsentStatus.enum.COMPLETE,
		[CONSENT_RELEASE_DATA]: ConsentStatus.enum.INCOMPLETE,
		[CONSENT_RESEARCH_PARTICIPATION]: ConsentStatus.enum.INCOMPLETE,
		[CONSENT_RECONTACT]: ConsentStatus.enum.INCOMPLETE,
		[CONSENT_REVIEW_SIGN]: ConsentStatus.enum.INCOMPLETE,
	};

	const progressHeaderSteps = Object.keys(progress).map((key) => {
		const step = ConsentCategory.parse(key);
		return {
			name: translate('consent-wizard', step),
			isComplete: progress[step] === ConsentStatus.enum.COMPLETE,
			inProgress: step === currentStep,
		};
	});

	return (
		<NavigationBack
			currentLang={currentLang}
			backLabel={translate('common', 'back-to-dashboard')}
			backLinkName={'dashboard'}
		>
			<div className={styles.wizard}>
				<div className={styles.header}>
					<h3>{translate('consent-wizard', 'heading')}</h3>
					<p>{translate('consent-wizard', 'subheading')}</p>
				</div>
				<Card dropShadow="sm" className={styles['consent-form']}>
					<ProgressHeader steps={progressHeaderSteps} />
					<hr className={styles.divider} />
					<div className={styles.content}>
						{/* TODO: add consent form for each section */}
						{currentStep === INFORMED_CONSENT && <></>}
						{currentStep === CONSENT_RELEASE_DATA && <></>}
						{currentStep === CONSENT_RESEARCH_PARTICIPATION && <></>}
						{currentStep === CONSENT_RECONTACT && <></>}
						{currentStep === CONSENT_REVIEW_SIGN && <></>}
					</div>
				</Card>
			</div>
		</NavigationBack>
	);
};

export default ConsentWizard;
