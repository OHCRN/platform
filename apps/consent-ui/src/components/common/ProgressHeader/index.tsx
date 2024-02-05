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
import { Fragment } from 'react';

import { ValidLanguage, getTranslation } from 'src/i18n';
import Success from 'src/components/common/Icons/Success';
import InProgress from 'src/components/common/Icons/InProgress';
import Incomplete from 'src/components/common/Icons/Incomplete';

import styles from './ProgressHeader.module.scss';

type Step = {
	name: string;
	isComplete: boolean;
	inProgress?: boolean;
};

const ProgressHeader = async ({
	currentLang,
	steps,
}: {
	currentLang: ValidLanguage;
	steps: Step[];
}) => {
	const currentStep = steps.findIndex((step) => step.inProgress) + 1;
	const translate = getTranslation(currentLang);
	return (
		<>
			{/* Tablet and Desktop screens */}
			<div className={styles.header}>
				{steps.map((step, index) => (
					<Fragment key={step.name}>
						<div className={styles.step}>
							{step.inProgress ? (
								<InProgress className={styles['in-progress']} />
							) : step.isComplete ? (
								<Success className={styles.success} />
							) : (
								<Incomplete className={styles.incomplete} />
							)}
							<span className={styles['desktop-step-name']}>{step.name}</span>
							<span className={styles['tablet-step-name']}>
								{translate('consentWizard', 'tabletProgressHeader', { step: index + 1 })}
							</span>
						</div>
						{index != steps.length - 1 && (
							<hr className={clsx(styles.divider, step.isComplete && styles['completed-step'])} />
						)}
					</Fragment>
				))}
			</div>
			{/* Mobile screens */}
			<div className={styles['mobile-header']}>
				<InProgress className={styles['in-progress']} />
				<span className={styles['mobile-step-name']}>
					{translate('consentWizard', 'mobileProgressHeader', {
						currentStep,
						stepCount: steps.length,
					})}
				</span>
			</div>
		</>
	);
};

export default ProgressHeader;
