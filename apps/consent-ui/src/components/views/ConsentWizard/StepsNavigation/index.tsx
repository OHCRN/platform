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

import { ConsentCategory } from 'types/entities';

import { ValidLanguage } from 'src/i18n';

import styles from './StepsNavigation.module.scss';

const stepsInOrder = [
	ConsentCategory.enum.INFORMED_CONSENT,
	ConsentCategory.enum.CONSENT_RELEASE_DATA,
	ConsentCategory.enum.CONSENT_RESEARCH_PARTICIPATION,
	ConsentCategory.enum.CONSENT_RECONTACT,
	ConsentCategory.enum.CONSENT_REVIEW_SIGN,
];

const StepsNavigation = ({
	// currentLang,
	currentStep,
}: {
	currentLang: ValidLanguage;
	currentStep: ConsentCategory;
}) => {
	const stepIndex = stepsInOrder.indexOf(currentStep);
	const prevStep = stepsInOrder[stepIndex - 1];
	const nextStep = stepsInOrder[stepIndex + 1];

	return (
		<div className={styles.wrapper}>
			<div className={styles.prevWrapper}>{prevStep && 'prev'}</div>
			<div className={styles.nextWrapper}>{nextStep ? 'next' : 'complete'}</div>
		</div>
	);
};

export default StepsNavigation;
