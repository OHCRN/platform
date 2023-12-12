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

import Link from 'next/link';
import { CONSENT_GROUPS } from 'types/entities';

import { FormLabelsDictionary } from 'src/i18n/locales/en/formLabels';
import { FormErrorsDictionary } from 'src/i18n/locales/en/formErrors';
import ClinicianInviteFormComponent from 'src/components/views/Invite/ClinicianInviteForm';
import {
	ClinicianInviteFormTextDictionary,
	ConsentGroupOption,
} from 'src/components/views/Invite/ClinicianInviteForm/types';
import { getTranslation, ValidLanguage } from 'src/i18n';

const Invite = async ({ currentLang }: { currentLang: ValidLanguage }) => {
	const translate = getTranslation(currentLang);

	const errorsDict: FormErrorsDictionary = {
		required: translate('formErrors', 'required'),
	};

	const labelsDict = {
		consentGroup: translate('formLabels', 'consentGroup'),
		firstName: translate('formLabels', 'firstName'),
		lastName: translate('formLabels', 'lastName'),
		preferredName: translate('formLabels', 'preferredName'),
		email: translate('formLabels', 'email'),
		phone: translate('formLabels', 'phone'),
		clinicianFirstName: translate('formLabels', 'clinicianFirstName'),
		clinicianInstitutionalEmailAddress: translate(
			'formLabels',
			'clinicianInstitutionalEmailAddress',
		),
		clinicianLastName: translate('formLabels', 'clinicianLastName'),
		clinicianTitleOrRole: translate('formLabels', 'clinicianTitleOrRole'),
		consentContact: translate('formLabels', 'consentContact'),
		guardianEmail: translate('formLabels', 'guardianEmail'),
		guardianName: translate('formLabels', 'guardianName'),
		guardianPhone: translate('formLabels', 'guardianPhone'),
		guardianRelationship: translate('formLabels', 'guardianRelationship'),
	} satisfies FormLabelsDictionary;

	const textDict: ClinicianInviteFormTextDictionary = {
		consentContactDescription: translate('clinicianInviteForm', 'consentContactDescription'),
		clinicianInformation: translate('clinicianInviteForm', 'clinicianInformation'),
		indicatesRequiredField: translate('forms', 'indicatesRequiredField'),
		patientInformation: translate('clinicianInviteForm', 'patientInformation'),
		selectPlaceholder: translate('forms', 'selectPlaceholder'),
		uploadFileDescription1: translate('clinicianInviteForm', 'uploadFileDescription1'),
		uploadFileDescription2: translate('clinicianInviteForm', 'uploadFileDescription2'),
		uploadFileLink: translate('clinicianInviteForm', 'uploadFileLink'),
	};

	const consentGroupOptions: ConsentGroupOption[] = CONSENT_GROUPS.map((group) => ({
		label: translate('consentGroup', group),
		value: group,
	}));

	return (
		<div>
			<h2>{translate('common', 'invite')}</h2>
			<Link href={`/${currentLang}`}>{translate('common', 'home')}</Link>
			<ClinicianInviteFormComponent
				consentGroupOptions={consentGroupOptions}
				errorsDict={errorsDict}
				labelsDict={labelsDict}
				textDict={textDict}
			/>
		</div>
	);
};

export default Invite;
