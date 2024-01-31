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
import { ValidLanguage } from 'src/i18n';
import { ConsentReviewSignFormDictionary } from 'src/i18n/locales/en/consentReviewSignForm';
import ReviewInfoCard from 'src/components/common/ReviewInfoCard';

export const ConsentReviewSignRequest = z.object({ stub: z.string().min(1) });
export type ConsentReviewSignRequest = z.infer<typeof ConsentReviewSignRequest>;

const stubData = {
	preferredName: 'Homer Simpson',
	genderIdentity: 'Man',
	dateOfBirth: '09/25/1975',
};

const ConsentReviewSignForm = ({
	currentLang,
	formDict,
}: {
	currentLang: ValidLanguage;
	formDict: ConsentReviewSignFormDictionary;
}) => {
	// setup react-hook-form
	const methods = useForm<ConsentReviewSignRequest>({
		mode: 'onBlur',
		resolver: zodResolver(ConsentReviewSignRequest),
	});

	const { handleSubmit, register } = methods;

	const onSubmit: SubmitHandler<ConsentReviewSignRequest> = (data, event) => {
		event?.preventDefault();
		console.log('form data', data);

		// go to next page
	};

	const cardProps = {
		editText: formDict.edit,
		linkLang: currentLang,
	};

	const releaseHealthData = [
		{
			label: formDict.preferredName,
			value: stubData.preferredName,
		},
		{ label: formDict.genderIdentity, value: stubData.genderIdentity },
		{ label: formDict.dateOfBirth, value: stubData.dateOfBirth },
	];

	return (
		<>
			<ReviewInfoCard
				boxColor="green"
				fields={releaseHealthData}
				name="consent-1"
				required
				title={formDict.releaseHealthDataTitle}
				{...cardProps}
			>
				<>
					<b>{formDict.agree}</b> {formDict.releaseHealthDataDescription}
				</>
			</ReviewInfoCard>

			{/* E-SIGNATURE */}
			<FormProvider {...methods}>
				<Form onSubmit={handleSubmit(onSubmit)}>
					{/* TODO add e-signature, remove this input */}
					<input {...register('stub')} />
				</Form>
			</FormProvider>
		</>
	);
};

export default ConsentReviewSignForm;
