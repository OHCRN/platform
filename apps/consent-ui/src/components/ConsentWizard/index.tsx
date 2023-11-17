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
		[ConsentCategory.enum.INFORMED_CONSENT]: ConsentStatus.enum.COMPLETE,
		[ConsentCategory.enum.CONSENT_RELEASE_DATA]: ConsentStatus.enum.INCOMPLETE,
		[ConsentCategory.enum.CONSENT_RESEARCH_PARTICIPATION]: ConsentStatus.enum.INCOMPLETE,
		[ConsentCategory.enum.CONSENT_RECONTACT]: ConsentStatus.enum.INCOMPLETE,
		[ConsentCategory.enum.CONSENT_REVIEW_SIGN]: ConsentStatus.enum.INCOMPLETE,
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
			<div className={styles.header}>
				<h3>{translate('consent-wizard', 'heading')}</h3>
				<p>{translate('consent-wizard', 'subheading')}</p>
			</div>
			<Card dropShadow="sm">
				<ProgressHeader steps={progressHeaderSteps} />
				<hr className={styles.divider} />
				<div>
					<h3 className="mb-4">OHCRN Study Information and Informed Consent</h3>
					<p className="leading-[1.75rem]">
						Please carefully review the OHCRN Study Information and Informed Consent. You can also{' '}
						<a className="text-other-500">
							download the study information and informed consent pdf
						</a>{' '}
						for review. If you have any questions or concerns please contact the OHCRN study team at{' '}
						<a className="text-other-500" href="mailto:OHCRN@oicr.on.ca">
							OHCRN@oicr.on.ca
						</a>{' '}
						If you are completing this form on behalf of someone else, ‘you’ or ‘me’ refers to your
						child or the person you are completing the form on behalf of; ‘we’ means the doctors and
						other study staff.
					</p>
				</div>
			</Card>
		</NavigationBack>
	);
};

export default ConsentWizard;
