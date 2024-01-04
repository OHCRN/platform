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

import { CONSENT_GROUPS } from 'types/entities';

import inviteBg from 'src/public/invite-bg.jpg';
import SideImageLayout from 'src/components/layouts/SideImageLayout';
import { getTranslation, ValidLanguage } from 'src/i18n';
import { FormErrorsDictionary } from 'src/i18n/locales/en/formErrors';
import ClinicianInviteFormComponent from 'src/components/views/Invite/ClinicianInviteForm';
import { ConsentGroupOption } from 'src/components/views/Invite/ClinicianInviteForm/types';
import { InviteFormLabelsDictionary } from 'src/i18n/locales/en/inviteFormLabels';
import { InviteFormTextDictionary } from 'src/i18n/locales/en/inviteFormText';
import { InviteFormConsentGroupModalDictionary } from 'src/i18n/locales/en/inviteFormConsentGroupModal';

const Invite = async ({ currentLang }: { currentLang: ValidLanguage }) => {
	const translate = getTranslation(currentLang);

	const pageDict = {
		clinicianPatientRegistration: translate('inviteFormPage', 'clinicianPatientRegistration'),
		ifParticipant: translate('inviteFormPage', 'ifParticipant'),
		inviteYourPatients: translate('inviteFormPage', 'inviteYourPatients'),
		registerHere: translate('inviteFormPage', 'registerHere'),
		registerYourPatient: translate('inviteFormPage', 'registerYourPatient'),
	};

	const errorsDict: FormErrorsDictionary = {
		required: translate('formErrors', 'required'),
	};

	// TODO replace this object with translate namespace function https://github.com/OHCRN/platform/issues/313
	const labelsDict: InviteFormLabelsDictionary = {
		clinicianFirstName: translate('inviteFormLabels', 'clinicianFirstName'),
		clinicianInstitutionalEmailAddress: translate(
			'inviteFormLabels',
			'clinicianInstitutionalEmailAddress',
		),
		consentGroup: translate('inviteFormLabels', 'consentGroup'),
		email: translate('inviteFormLabels', 'email'),
		firstName: translate('inviteFormLabels', 'firstName'),
		lastName: translate('inviteFormLabels', 'lastName'),
		preferredName: translate('inviteFormLabels', 'preferredName'),
		clinicianLastName: translate('inviteFormLabels', 'clinicianLastName'),
		clinicianTitleOrRole: translate('inviteFormLabels', 'clinicianTitleOrRole'),
		consentContact: translate('inviteFormLabels', 'consentContact'),
		guardianEmail: translate('inviteFormLabels', 'guardianEmail'),
		guardianName: translate('inviteFormLabels', 'guardianName'),
		guardianPhone: translate('inviteFormLabels', 'guardianPhone'),
		guardianRelationship: translate('inviteFormLabels', 'guardianRelationship'),
		phone: translate('inviteFormLabels', 'phone'),
	};

	// TODO replace this object with translate namespace function https://github.com/OHCRN/platform/issues/313
	const textDict: InviteFormTextDictionary = {
		afterRegistering: translate('inviteFormText', 'afterRegistering'),
		clinicianInstitutionalEmailAddressCallout: translate(
			'inviteFormText',
			'clinicianInstitutionalEmailAddressCallout',
		),
		clinicianInformation: translate('inviteFormText', 'clinicianInformation'),
		consentContactDescription: translate('inviteFormText', 'consentContactDescription'),
		consentGroupCallout: translate('inviteFormText', 'consentGroupCallout'),
		enterGuardianInfo: translate('inviteFormText', 'enterGuardianInfo'),
		guardianEmailAddressCallout: translate('inviteFormText', 'guardianEmailAddressCallout'),
		guardianPhoneNumberCallout: translate('inviteFormText', 'guardianPhoneNumberCallout'),
		indicatesRequiredField: translate('inviteFormText', 'indicatesRequiredField'),
		learnMoreConsentGroups: translate('inviteFormText', 'learnMoreConsentGroups'),
		participantEmailAddressCallout: translate('inviteFormText', 'participantEmailAddressCallout'),
		participantFirstNameCallout: translate('inviteFormText', 'participantFirstNameCallout'),
		participantLastNameCallout: translate('inviteFormText', 'participantLastNameCallout'),
		participantPhoneNumberCallout: translate('inviteFormText', 'participantPhoneNumberCallout'),
		participantPreferredNameCallout: translate('inviteFormText', 'participantPreferredNameCallout'),
		patientInformation: translate('inviteFormText', 'patientInformation'),
		selectPlaceholder: translate('inviteFormText', 'selectPlaceholder'),
		uploadFileDescription1: translate('inviteFormText', 'uploadFileDescription1'),
		uploadFileDescription2: translate('inviteFormText', 'uploadFileDescription2'),
		uploadFileLink: translate('inviteFormText', 'uploadFileLink'),
		submit: translate('inviteFormText', 'submit'),
	};

	const consentGroupOptions: ConsentGroupOption[] = CONSENT_GROUPS.map((group) => ({
		label: translate('consentGroup', group),
		value: group,
	}));

	const consentGroupModalDict: InviteFormConsentGroupModalDictionary = {
		adultConsent: translate('inviteFormConsentGroupModal', 'adultConsent'),
		adultConsentPoint1: translate('inviteFormConsentGroupModal', 'adultConsentPoint1'),
		adultConsentPoint2: translate('inviteFormConsentGroupModal', 'adultConsentPoint2'),
		adultConsentSubstitute: translate('inviteFormConsentGroupModal', 'adultConsentSubstitute'),
		adultConsentSubstitutePoint1: translate(
			'inviteFormConsentGroupModal',
			'adultConsentSubstitutePoint1',
		),
		adultConsentSubstitutePoint2: translate(
			'inviteFormConsentGroupModal',
			'adultConsentSubstitutePoint2',
		),
		adultConsentSubstitutePoint3: translate(
			'inviteFormConsentGroupModal',
			'adultConsentSubstitutePoint3',
		),
		adultConsentSubstitutePoint4: translate(
			'inviteFormConsentGroupModal',
			'adultConsentSubstitutePoint4',
		),
		consentGroups: translate('inviteFormConsentGroupModal', 'consentGroups'),
		guardianConsent: translate('inviteFormConsentGroupModal', 'guardianConsent'),
		guardianConsentAssent: translate('inviteFormConsentGroupModal', 'guardianConsentAssent'),
		guardianConsentAssentPoint1: translate(
			'inviteFormConsentGroupModal',
			'guardianConsentAssentPoint1',
		),
		guardianConsentAssentPoint2: translate(
			'inviteFormConsentGroupModal',
			'guardianConsentAssentPoint2',
		),
		guardianConsentAssentPoint3: translate(
			'inviteFormConsentGroupModal',
			'guardianConsentAssentPoint3',
		),
		guardianConsentPoint1: translate('inviteFormConsentGroupModal', 'guardianConsentPoint1'),
		guardianConsentPoint2: translate('inviteFormConsentGroupModal', 'guardianConsentPoint2'),
		guardianConsentPoint3: translate('inviteFormConsentGroupModal', 'guardianConsentPoint3'),
		youngAdultConsent: translate('inviteFormConsentGroupModal', 'youngAdultConsent'),
		youngAdultConsentPoint1: translate('inviteFormConsentGroupModal', 'youngAdultConsentPoint1'),
		youngAdultConsentPoint2: translate('inviteFormConsentGroupModal', 'youngAdultConsentPoint2'),
	};

	return (
		<SideImageLayout
			currentLang={currentLang}
			desktopHeaderImage={inviteBg}
			desktopNavAction={{
				bottomText: pageDict.registerHere,
				topText: pageDict.ifParticipant,
				url: 'register',
			}}
			mainSubtitle={pageDict.inviteYourPatients}
			mainTitle={pageDict.registerYourPatient}
			navTitle={pageDict.clinicianPatientRegistration}
		>
			<ClinicianInviteFormComponent
				consentGroupOptions={consentGroupOptions}
				consentGroupModalDict={consentGroupModalDict}
				errorsDict={errorsDict}
				labelsDict={labelsDict}
				textDict={textDict}
			/>
		</SideImageLayout>
	);
};

export default Invite;
