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

import { RegisterFormStep1LabelsDictionary } from 'src/i18n/locales/en/registerFormStep1Labels';
import { RegisterFormStep2LabelsDictionary } from 'src/i18n/locales/en/registerFormStep2Labels';
import { getTranslation, ValidLanguage } from 'src/i18n';
import RegisterForm from 'src/components/views/Register/RegisterForm';
import SideImageLayout from 'src/components/layouts/SideImageLayout';
import LinkButton from 'src/components/common/Button/LinkButton';
import { RegisterFormTextDictionary } from 'src/i18n/locales/en/registerFormText';
import { FormErrorsDictionary } from 'src/i18n/locales/en/formErrors';
import registerBg from 'src/../public/assets/images/register-bg.jpg';
import { RegisterFormStep1TextDictionary } from 'src/i18n/locales/en/registerFormStep1Text';
import { RegisterFormStep2TextDictionary } from 'src/i18n/locales/en/registerFormStep2Text';

const Register = async ({ currentLang }: { currentLang: ValidLanguage }) => {
	const translate = getTranslation(currentLang);

	const errorsDict: FormErrorsDictionary = {
		required: translate('formErrors', 'required'),
	};

	const step1LabelsDict: RegisterFormStep1LabelsDictionary = {
		dateOfBirth: translate('registerFormStep1Labels', 'dateOfBirth'),
		firstName: translate('registerFormStep1Labels', 'firstName'),
		lastName: translate('registerFormStep1Labels', 'lastName'),
		no: translate('registerFormStep1Labels', 'no'),
		phone: translate('registerFormStep1Labels', 'phone'),
		preferredName: translate('registerFormStep1Labels', 'preferredName'),
		yes: translate('registerFormStep1Labels', 'yes'),
		yourName: translate('registerFormStep1Labels', 'yourName'),
		yourPhone: translate('registerFormStep1Labels', 'yourPhone'),
		yourRelationship: translate('registerFormStep1Labels', 'yourRelationship'),
	};

	const step2LabelsDict: RegisterFormStep2LabelsDictionary = {
		confirmPassword: translate('registerFormStep2Labels', 'confirmPassword'),
		consentContact: translate('registerFormStep2Labels', 'consentContact'),
		email: translate('registerFormStep2Labels', 'email'),
		password: translate('registerFormStep2Labels', 'password'),
	};

	const textDict: RegisterFormTextDictionary = {
		indicatesRequiredField: translate('registerFormText', 'indicatesRequiredField'),
		stepCurrentOfTotal: translate('registerFormText', 'stepCurrentOfTotal'),
	};

	const step1textDict: RegisterFormStep1TextDictionary = {
		afterRegistering: translate('registerFormStep1Text', 'afterRegistering'),
		dateOfBirthTooltip: translate('registerFormStep1Text', 'dateOfBirthTooltip'),
		enterInfo: translate('registerFormStep1Text', 'enterInfo'),
		enterParticipantInfo: translate('registerFormStep1Text', 'enterParticipantInfo'),
		goToStep: translate('registerFormStep1Text', 'goToStep'),
		isGuardianDescription: translate('registerFormStep1Text', 'isGuardianDescription'),
		next: translate('registerFormStep1Text', 'next'),
		participantFirstNameTooltip: translate('registerFormStep1Text', 'participantFirstNameTooltip'),
		participantLastNameTooltip: translate('registerFormStep1Text', 'participantLastNameTooltip'),
		participantPhoneNumberTooltip: translate(
			'registerFormStep1Text',
			'participantPhoneNumberTooltip',
		),
		participantPreferredNameTooltip: translate(
			'registerFormStep1Text',
			'participantPreferredNameTooltip',
		),
		questions: translate('registerFormStep1Text', 'questions'),
		registeringForSomeoneElse: translate('registerFormStep1Text', 'registeringForSomeoneElse'),
	};

	const step2textDict: RegisterFormStep2TextDictionary = {
		afterRegistering: translate('registerFormStep2Text', 'afterRegistering'),
		back: translate('registerFormStep2Text', 'back'),
		consentContactDescription: translate('registerFormStep2Text', 'consentContactDescription'),
		createAccount: translate('registerFormStep2Text', 'createAccount'),
		goToStep: translate('registerFormStep2Text', 'goToStep'),
		indicatesRequiredField: translate('registerFormStep2Text', 'indicatesRequiredField'),
		stepCurrentOfTotal: translate('registerFormStep2Text', 'stepCurrentOfTotal'),
	};

	return (
		<SideImageLayout
			currentLang={currentLang}
			desktopHeaderImage={registerBg}
			desktopNavAction={{
				bottomText: translate('registerPage', 'registerPatients'),
				topText: translate('registerPage', 'ifClinician'),
				url: 'invite',
			}}
			desktopNavButton={{
				description: translate('registerPage', 'alreadyRegistered'),
				// TODO add link to login page
				// https://github.com/OHCRN/platform/issues/359
				button: <LinkButton href="">{translate('registerPage', 'login')}</LinkButton>,
			}}
			mainSubtitle={translate('registerPage', 'enrollInOhcrn')}
			mainTitle={translate('registerPage', 'registerYourself')}
			navTitle={translate('registerPage', 'participantRegistration')}
		>
			<RegisterForm
				currentLang={currentLang}
				errorsDict={errorsDict}
				step1LabelsDict={step1LabelsDict}
				step1TextDict={step1textDict}
				step2LabelsDict={step2LabelsDict}
				step2TextDict={step2textDict}
				textDict={textDict}
			/>
		</SideImageLayout>
	);
};

export default Register;
