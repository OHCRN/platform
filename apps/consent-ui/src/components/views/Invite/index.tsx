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

import InviteBackground from 'src/../public/assets/images/invite-bg.jpg';
import SideImageLayout from 'src/components/layouts/SideImageLayout';
import { translateAll, getTranslation, ValidLanguage } from 'src/i18n';
import ClinicianInviteFormComponent from 'src/components/views/Invite/ClinicianInviteForm';
import { ConsentGroupOption } from 'src/components/views/Invite/ClinicianInviteForm/types';
import { InviteFormPageDictionary } from 'src/i18n/locales/en/inviteFormPage';
import { InviteFormLabelsDictionary } from 'src/i18n/locales/en/inviteFormLabels';
import { InviteFormTextDictionary } from 'src/i18n/locales/en/inviteFormText';
import { FormErrorsDictionary } from 'src/i18n/locales/en/formErrors';

const Invite = async ({ currentLang }: { currentLang: ValidLanguage }) => {
	const { translate } = getTranslation(currentLang);
	// change to `const { translate, translateAll }`

	// return value of translateAll should conform to a dictionary type
	// so that these dictionaries can be passed down as props with specific types
	const pageDict = translateAll<InviteFormPageDictionary>(currentLang, 'inviteFormPage');
	const errorsDict = translateAll<FormErrorsDictionary>(currentLang, 'formErrors');
	const labelsDict = translateAll<InviteFormLabelsDictionary>(currentLang, 'inviteFormLabels');
	const textDict = translateAll<InviteFormTextDictionary>(currentLang, 'inviteFormText');

	const consentGroupOptions: ConsentGroupOption[] = CONSENT_GROUPS.map((group) => ({
		label: translate('consentGroup', group),
		value: group,
	}));

	return (
		<SideImageLayout
			currentLang={currentLang}
			desktopHeaderImage={InviteBackground}
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
				currentLang={currentLang}
				errorsDict={errorsDict}
				labelsDict={labelsDict}
				textDict={textDict}
			/>
		</SideImageLayout>
	);
};

export default Invite;
