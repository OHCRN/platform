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

import { useRouter } from 'next/navigation';

import { ValidLanguage } from 'src/i18n';
import { getLocalizedRoute } from 'src/components/common/Link/utils';
import { CONSENT_STEP_ROUTES, ConsentStepRoute } from 'src/components/common/Link/types';

export const getNextPrevConsentSteps = (currentStep: ConsentStepRoute) => {
	const currentStepIndex = CONSENT_STEP_ROUTES.indexOf(currentStep);
	const prevRoute = CONSENT_STEP_ROUTES[currentStepIndex - 1];
	const nextRoute = CONSENT_STEP_ROUTES[currentStepIndex + 1];
	return { nextRoute, prevRoute };
};

const useGoToNextConsentStep = (currentLang: ValidLanguage, currentStep: ConsentStepRoute) => {
	const router = useRouter();
	const { nextRoute } = getNextPrevConsentSteps(currentStep);

	// no nextRoute? currently on last step -> go to dashboard
	return () => router.push(getLocalizedRoute(currentLang, nextRoute || 'dashboard'));
};

export default useGoToNextConsentStep;
