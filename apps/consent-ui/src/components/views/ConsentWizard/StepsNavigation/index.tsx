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

import { ValidLanguage } from 'src/i18n';

import styles from './StepsNavigation.module.scss';
import PreviousButton from './PreviousButton';
import { CONSENT_STEP_ROUTES, ConsentStepRoute } from './types';

const StepsNavigation = ({
	currentLang,
	currentStep,
}: {
	currentLang: ValidLanguage;
	currentStep: ConsentStepRoute;
}) => {
	const currentStepIndex = CONSENT_STEP_ROUTES.indexOf(currentStep);
	const prevRoute = CONSENT_STEP_ROUTES[currentStepIndex - 1] || undefined;
	// const nextRoute = CONSENT_STEP_ROUTES[currentStepIndex + 1] || undefined;

	return (
		<div className={styles.wrapper}>
			<div className={styles.prevWrapper}>
				{prevRoute && (
					<PreviousButton currentLang={currentLang} prevRoute={prevRoute}>
						Previous
					</PreviousButton>
				)}
			</div>
			<div className={styles.nextWrapper}>next/complete</div>
		</div>
	);
};

export default StepsNavigation;
