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
import Card from 'src/components/common/Card';
import ProgressHeader from 'src/components/common/ProgressHeader';
import PaddedContainer from 'src/components/common/PaddedContainer';
import BackToDashboard from 'src/components/common/BackToDashboard';
import ConsentResearchParticipation from 'src/components/views/ConsentWizard/ConsentResearchParticipation';

import styles from './ConsentWizard.module.scss';
import ConsentReviewSign from './ConsentReviewSign';
import InformedConsent from './InformedConsent';
import ConsentRecontact from './ConsentRecontact';

const {
	INFORMED_CONSENT,
	CONSENT_RELEASE_DATA,
	CONSENT_RESEARCH_PARTICIPATION,
	CONSENT_RECONTACT,
	CONSENT_REVIEW_SIGN,
} = ConsentCategory.enum;

const { COMPLETE, INCOMPLETE } = ConsentStatus.enum;

const ConsentWizard = async ({
	currentLang,
	currentStep,
}: {
	currentLang: ValidLanguage;
	currentStep: ConsentCategory;
}) => {
	const { translate } = getTranslation(currentLang);

	// TODO: return consent wizard progress from consent-api
	const progress: ConsentWizardProgress = {
		[INFORMED_CONSENT]: COMPLETE,
		[CONSENT_RELEASE_DATA]: INCOMPLETE,
		[CONSENT_RESEARCH_PARTICIPATION]: INCOMPLETE,
		[CONSENT_RECONTACT]: INCOMPLETE,
		[CONSENT_REVIEW_SIGN]: INCOMPLETE,
	};

	const progressHeaderSteps = Object.keys(progress).map((key) => {
		const step = ConsentCategory.parse(key);
		return {
			name: translate('consentWizard', step),
			isComplete: progress[step] === COMPLETE,
			inProgress: step === currentStep,
		};
	});

	return (
		<PaddedContainer>
			<BackToDashboard currentLang={currentLang} />
			<div className={styles.wizard}>
				<div className={styles.header}>
					<h1>{translate('consentWizard', 'heading')}</h1>
					<p>{translate('consentWizard', 'subheading')}</p>
				</div>
				<Card dropShadow="sm" className={styles['consent-form']}>
					<ProgressHeader currentLang={currentLang} steps={progressHeaderSteps} />
					<hr className={styles.divider} />
					<div className={styles.content}>
						{/* TODO: add consent form for each section */}
						{currentStep === INFORMED_CONSENT && <InformedConsent currentLang={currentLang} />}
						{currentStep === CONSENT_RELEASE_DATA && <></>}
						{currentStep === CONSENT_RESEARCH_PARTICIPATION && (
							<ConsentResearchParticipation currentLang={currentLang} />
						)}
						{currentStep === CONSENT_RECONTACT && <ConsentRecontact currentLang={currentLang} />}
						{currentStep === CONSENT_REVIEW_SIGN && <ConsentReviewSign currentLang={currentLang} />}
					</div>
				</Card>
			</div>
		</PaddedContainer>
	);
};

export default ConsentWizard;
