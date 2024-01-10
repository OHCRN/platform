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

import SideImageLayout from 'src/components/layouts/SideImageLayout';
import { translateNamespace, getTranslation, ValidLanguage } from 'src/i18n';
import inviteBg from 'src/public/invite-bg.jpg';
import ClinicianInviteFormComponent from 'src/components/views/Invite/ClinicianInviteForm';
import { ConsentGroupOption } from 'src/components/views/Invite/ClinicianInviteForm/types';

const Invite = async ({ currentLang }: { currentLang: ValidLanguage }) => {
	const translate = getTranslation(currentLang);

	const pageDict = translateNamespace({
		currentLang,
		namespace: 'invite',
	});

	const errorsDict = translateNamespace({
		currentLang,
		namespace: 'formErrors',
	});

	const labelsDict = translateNamespace({
		currentLang,
		namespace: 'inviteFormLabels',
	});

	const textDict = translateNamespace({
		currentLang,
		namespace: 'inviteFormText',
	});

	const consentGroupOptions: ConsentGroupOption[] = CONSENT_GROUPS.map((group) => ({
		label: translate('consentGroup', group),
		value: group,
	}));

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
				errorsDict={errorsDict}
				labelsDict={labelsDict}
				textDict={textDict}
			/>
		</SideImageLayout>
	);
};

export default Invite;
