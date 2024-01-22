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

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { ClinicianInviteRequest } from 'types/consentApi';

import { FormErrorsDictionary } from 'src/i18n/locales/en/formErrors';
import Form from 'src/components/common/Form';
import { InviteFormTextDictionary } from 'src/i18n/locales/en/inviteFormText';
import { InviteFormLabelsDictionary } from 'src/i18n/locales/en/inviteFormLabels';
import FormSection from 'src/components/common/Form/FormSection';
import Button from 'src/components/common/Button';
import layoutStyles from 'src/components/layouts/SideImageLayout/SideImageLayout.module.scss';
import { ValidLanguage } from 'src/i18n';

import RadioFieldSet from '.';

const styles = Object.assign({}, layoutStyles);

const TestFormComponent = ({
	// consentGroupOptions,
	// currentLang,
	// errorsDict,
	// labelsDict,
	textDict,
}: {
	// consentGroupOptions: ConsentGroupOption[];
	currentLang: ValidLanguage;
	errorsDict: FormErrorsDictionary;
	labelsDict: InviteFormLabelsDictionary;
	textDict: InviteFormTextDictionary;
}) => {
	// setup react-hook-forms
	const methods = useForm<ClinicianInviteRequest>({
		resolver: zodResolver(ClinicianInviteRequest),
	});

	const {
		formState: { errors },
		handleSubmit,
	} = methods;

	const onSubmit: SubmitHandler<ClinicianInviteRequest> = (data, event) => {
		event?.preventDefault();
	};

	return (
		<FormProvider {...methods}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FormSection>
					<RadioFieldSet
						name="consentGroup"
						description={'Random description'}
						error={errors.consentGroup?.message}
						required
						title={'Random title'}
						yesLabel={'Yes'}
						noLabel={'No'}
					/>
				</FormSection>

				<FormSection>
					<Button type="submit" className={styles.submitButton}>
						{textDict.submit}
					</Button>
				</FormSection>
			</Form>
		</FormProvider>
	);
};

export default TestFormComponent;
