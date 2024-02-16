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

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import Form from 'src/components/common/Form';
import { ConsentStepRouteEnum } from 'src/components/common/Link/types';
import { ValidLanguage } from 'src/i18n';
import { useNotification } from 'src/components/providers/NotificationProvider';

import useGoToNextConsentStep from '../ConsentStepsNavigation/useGoToNextConsentStep';
import ConsentStepsNavigation from '../ConsentStepsNavigation';

export const ConsentReviewSignRequest = z.object({ stub: z.string().min(1) });
export type ConsentReviewSignRequest = z.infer<typeof ConsentReviewSignRequest>;

const currentConsentStep = ConsentStepRouteEnum.enum['consent-5'];

interface ConsentReviewSignFormProps {
	currentLang: ValidLanguage;
}

const ConsentReviewSignForm = ({ currentLang }: ConsentReviewSignFormProps) => {
	const { showNotification } = useNotification();

	const methods = useForm<ConsentReviewSignRequest>({
		mode: 'onBlur',
		resolver: zodResolver(ConsentReviewSignRequest),
	});

	const { handleSubmit, register } = methods;

	const goToNextConsentStep = useGoToNextConsentStep(currentLang, currentConsentStep);

	const onSubmit: SubmitHandler<ConsentReviewSignRequest> = (_data, event) => {
		event?.preventDefault();

		// go to dashboard after successful API request
		showNotification({ page: 'dashboard', notification: 'consentComplete' });
		goToNextConsentStep();
	};

	return (
		<FormProvider {...methods}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				{/* TODO e-signature https://github.com/OHCRN/platform/issues/155 
					 this page has to use a react-hook-form form for the step navigation to work */}
				<label htmlFor="stub" style={{ display: 'inline-block', margin: '1rem 0' }}>
					mock form <input {...register('stub')} id="stub" style={{ border: '1px solid grey' }} />
				</label>

				<ConsentStepsNavigation currentLang={currentLang} currentStep={currentConsentStep} />
			</Form>
		</FormProvider>
	);
};

export default ConsentReviewSignForm;
