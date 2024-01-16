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

import { getTranslation, ValidLanguage } from 'src/i18n';
import inviteBg from 'src/public/invite-bg.jpg';
import RegistrationForm from 'src/components/views/Register/RegistrationForm';
import SideImageLayout from 'src/components/layouts/SideImageLayout';
import LinkButton from 'src/components/common/Button/LinkButton';
import { RegisterFormLabelsDictionary } from 'src/i18n/locales/en/registerFormLabels';
import { RegisterFormTextDictionary } from 'src/i18n/locales/en/registerFormText';
import { FormErrorsDictionary } from 'src/i18n/locales/en/formErrors';

const Register = async ({ currentLang }: { currentLang: ValidLanguage }) => {
	const translate = getTranslation(currentLang);

	const errorsDict: FormErrorsDictionary = {
		required: translate('formErrors', 'required'),
	};

	const labelsDict: RegisterFormLabelsDictionary = {
		confirmPassword: translate('registerFormLabels', 'confirmPassword'),
		consentContact: translate('registerFormLabels', 'consentContact'),
		dateOfBirth: translate('registerFormLabels', 'dateOfBirth'),
		email: translate('registerFormLabels', 'email'),
		firstName: translate('registerFormLabels', 'firstName'),
		lastName: translate('registerFormLabels', 'lastName'),
		no: translate('registerFormLabels', 'no'),
		password: translate('registerFormLabels', 'password'),
		phone: translate('registerFormLabels', 'phone'),
		preferredName: translate('registerFormLabels', 'preferredName'),
		yes: translate('registerFormLabels', 'yes'),
		yourName: translate('registerFormLabels', 'yourName'),
		yourPhone: translate('registerFormLabels', 'yourPhone'),
		yourRelationship: translate('registerFormLabels', 'yourRelationship'),
	};

	const textDict: RegisterFormTextDictionary = {
		afterRegistering: translate('registerFormText', 'afterRegistering'),
		back: translate('registerFormText', 'back'),
		consentContact: translate('registerFormText', 'consentContact'),
		createAccount: translate('registerFormText', 'createAccount'),
		dateOfBirthTooltip: translate('registerFormText', 'dateOfBirthTooltip'),
		enterInfo: translate('registerFormText', 'enterInfo'),
		enterParticipantInfo: translate('registerFormText', 'enterParticipantInfo'),
		goToStep: translate('registerFormText', 'goToStep'),
		indicatesRequiredField: translate('registerFormText', 'indicatesRequiredField'),
		next: translate('registerFormText', 'next'),
		participantFirstNameTooltip: translate('registerFormText', 'participantFirstNameTooltip'),
		participantLastNameTooltip: translate('registerFormText', 'participantLastNameTooltip'),
		participantPhoneNumberTooltip: translate('registerFormText', 'participantPhoneNumberTooltip'),
		participantPreferredNameTooltip: translate(
			'registerFormText',
			'participantPreferredNameTooltip',
		),
		questions: translate('registerFormText', 'questions'),
		registeringForSomeoneElse: translate('registerFormText', 'registeringForSomeoneElse'),
		stepXofY1: translate('registerFormText', 'stepXofY1'),
		stepXofY2: translate('registerFormText', 'stepXofY2'),
	};

	return (
		<SideImageLayout
			currentLang={currentLang}
			desktopHeaderImage={inviteBg}
			desktopNavAction={{
				bottomText: translate('registerPage', 'registerPatients'),
				topText: translate('registerPage', 'ifClinician'),
				url: 'invite',
			}}
			desktopNavButton={{
				description: translate('registerPage', 'registerYourself'),
				// TODO add link to login page
				// https://github.com/OHCRN/platform/issues/359
				button: <LinkButton href="">{translate('registerPage', 'login')}</LinkButton>,
			}}
			mainSubtitle={translate('registerPage', 'enrollInOhcrn')}
			mainTitle={translate('registerPage', 'registerYourself')}
			navTitle={translate('registerPage', 'participantRegistration')}
		>
			<RegistrationForm
				currentLang={currentLang}
				errorsDict={errorsDict}
				labelsDict={labelsDict}
				textDict={textDict}
			/>
		</SideImageLayout>
	);
};

export default Register;
