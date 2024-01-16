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

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Name, PhoneNumber } from 'types/entities';

import { ValidLanguage } from 'src/i18n';
import { FormErrorsDictionary } from 'src/i18n/locales/en/formErrors';
import { RegisterFormLabelsDictionary } from 'src/i18n/locales/en/registerFormLabels';
import { RegisterFormTextDictionary } from 'src/i18n/locales/en/registerFormText';
import Form from 'src/components/common/Form';
import FormSection from 'src/components/common/Form/FormSection';
import TextFieldSet from 'src/components/common/Form/fieldsets/TextFieldSet';
import LocalizedLink from 'src/components/common/Link/LocalizedLink';

// TODO replace stubs with consent API types when they're implemented. ticket TBA
const RegisterRequestStub = z.object({
	dateOfBirth: z.string(), // TEMP
	participantFirstName: Name,
	participantLastName: Name,
	participantPhoneNumber: PhoneNumber,
	participantPreferredName: Name,
	substituteName: Name,
	substitutePhone: PhoneNumber,
	substituteRelationship: Name,
	useSubstituteDecisionMaker: z.boolean(),
});
type RegisterRequestStub = z.infer<typeof RegisterRequestStub>;

const RegistrationForm = ({
	currentLang,
	errorsDict,
	labelsDict,
	textDict,
}: {
	currentLang: ValidLanguage;
	errorsDict: FormErrorsDictionary;
	labelsDict: RegisterFormLabelsDictionary;
	textDict: RegisterFormTextDictionary;
}) => {
	// setup react-hook-forms
	const methods = useForm<RegisterRequestStub>({
		resolver: zodResolver(RegisterRequestStub),
	});

	const {
		formState: { errors },
		handleSubmit,
	} = methods;

	const onSubmit: SubmitHandler<RegisterRequestStub> = (data, event) => {
		event?.preventDefault();
		console.log(data);
	};

	return (
		<FormProvider {...methods}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FormSection>
					{/* TODO implement radio button https://github.com/OHCRN/platform/issues/366 */}
					{textDict.registeringForSomeoneElse} {labelsDict.yes} {labelsDict.no}
				</FormSection>
				{/* TODO make this section optional/conditional as part of #366 */}
				<FormSection variant="grey">
					<p>{textDict.enterInfo}</p>
					<TextFieldSet
						error={errors.substituteName?.type && errorsDict.required}
						label={labelsDict.yourName || ''}
						name="substituteName"
						required
						withNarrowDesktopLayout
					/>
					<TextFieldSet
						error={errors.substitutePhone?.type && errorsDict.required}
						label={labelsDict.yourPhone || ''}
						name="substitutePhone"
						required
						withNarrowDesktopLayout
					/>
					<TextFieldSet
						error={errors.substituteRelationship?.type && errorsDict.required}
						label={labelsDict.yourPhone || ''}
						name="substituteRelationship"
						required
						withNarrowDesktopLayout
					/>
				</FormSection>
				<FormSection>
					<p>{textDict.enterParticipantInfo}</p>
					<TextFieldSet
						error={errors.participantFirstName?.type && errorsDict.required}
						label={labelsDict.firstName || ''}
						name="participantFirstName"
						required
						tooltipContent={textDict.participantFirstNameTooltip}
						withNarrowDesktopLayout
					/>
					<TextFieldSet
						error={errors.participantLastName?.type && errorsDict.required}
						label={labelsDict.lastName || ''}
						name="participantLastName"
						required
						tooltipContent={textDict.participantLastNameTooltip}
						withNarrowDesktopLayout
					/>
					<TextFieldSet
						error={errors.participantPreferredName?.type && errorsDict.required}
						label={labelsDict.preferredName || ''}
						name="participantPreferredName"
						tooltipContent={textDict.participantPreferredNameTooltip}
						withNarrowDesktopLayout
					/>
					<TextFieldSet
						error={errors.participantPhoneNumber?.type && errorsDict.required}
						label={labelsDict.phone || ''}
						name="participantPhoneNumber"
						required
						tooltipContent={textDict.participantPhoneNumberTooltip}
						withNarrowDesktopLayout
					/>
					{/* TODO implement date input */}
					<TextFieldSet
						error={errors.dateOfBirth?.type && errorsDict.required}
						label={labelsDict.dateOfBirth || ''}
						name="dateOfBirth"
						required
						tooltipContent={textDict.dateOfBirthTooltip}
						withNarrowDesktopLayout
					/>
					<p>{textDict.afterRegistering}</p>
					{/* TODO add link to help centre https://github.com/OHCRN/platform/issues/367 */}
					<LocalizedLink name={'home'} linkLang={currentLang}>
						{textDict.questions}
					</LocalizedLink>
				</FormSection>
			</Form>
		</FormProvider>
	);
};

export default RegistrationForm;
