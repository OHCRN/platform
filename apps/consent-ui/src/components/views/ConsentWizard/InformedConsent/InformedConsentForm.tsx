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

import Link from 'next/link';
import { InformedConsentRequest } from 'types/entities';
import { Form, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import CheckboxFieldSet from 'src/components/common/Form/fieldsets/CheckboxFieldSet';
import { OHCRN_EMAIL } from 'src/constants';
import { InformedConsentFormDictionary } from 'src/i18n/locales/en/informedConsentForm';
import FormSection from 'src/components/common/Form/FormSection';
import { FormErrorsDictionary } from 'src/i18n/locales/en/formErrors';
import Button from 'src/components/common/Button';

const InformedConsentForm = ({
	errorsDict,
	formDict,
}: {
	errorsDict: FormErrorsDictionary;
	formDict: InformedConsentFormDictionary;
}) => {
	// setup react-hook-forms
	const methods = useForm<InformedConsentRequest>({
		resolver: zodResolver(InformedConsentRequest),
	});
	const {
		formState: { errors },
		handleSubmit,
	} = methods;

	const onSubmit: SubmitHandler<InformedConsentRequest> = (data, event) => {
		event?.preventDefault();

		console.log({ data });
	};

	return (
		<FormProvider {...methods}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FormSection>
					<CheckboxFieldSet
						description={
							<>
								{formDict.readUnderstand1}
								<Link href={`mailto:${OHCRN_EMAIL}`}>{OHCRN_EMAIL}</Link>
								{formDict.readUnderstand2}
							</>
						}
						error={errors.INFORMED_CONSENT__READ_AND_UNDERSTAND?.type && errorsDict.required}
						name="INFORMED_CONSENT__READ_AND_UNDERSTAND"
						required
					/>
					<Button type="submit">submit</Button>
				</FormSection>
			</Form>
			{/* put in prev/next buttons */}
		</FormProvider>
	);
};

export default InformedConsentForm;
