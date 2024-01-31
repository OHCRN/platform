/*
 * Copyright (c) 2024 The Ontario Institute for Cancer Research. All rights reserved
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
import { ConsentStepRoute } from 'src/components/common/Link/types';

import styles from './ConsentStepsNavigation.module.scss';
import PreviousButton from './PreviousButton';
import NextCompleteButton from './NextCompleteButton';
import { getNextPrevConsentSteps } from './useGoToNextConsentStep';

/**
 * Place this component inside a Form component with an onSubmit handler.
 * The next/complete button triggers the submit event.
 */

const ConsentStepsNavigation = ({
	currentLang,
	currentStep,
}: {
	currentLang: ValidLanguage;
	currentStep: ConsentStepRoute;
}) => {
	const { nextRoute, prevRoute } = getNextPrevConsentSteps(currentStep);

	const translate = getTranslation(currentLang);

	return (
		<div className={styles.navWrapper}>
			<div className={styles.buttonWrapper}>
				{prevRoute && (
					<PreviousButton currentLang={currentLang} prevRoute={prevRoute}>
						{translate('formText', 'previous')}
					</PreviousButton>
				)}
			</div>
			<div className={clsx(styles.buttonWrapper, styles.next)}>
				<NextCompleteButton>
					{translate('formText', nextRoute ? 'next' : 'complete')}
				</NextCompleteButton>
			</div>
		</div>
	);
};

export default ConsentStepsNavigation;
