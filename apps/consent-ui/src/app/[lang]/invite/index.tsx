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
import ClinicianInviteForm from 'src/components/ClinicianInviteForm';
import {
	ClinicianInviteFormErrorDictionary,
	ClinicianInviteFormTextDictionary,
} from 'src/components/ClinicianInviteForm/types';
import { getTranslation, ValidLanguage } from 'src/i18n';
import {
	// SelectFormFieldsDictionary,
	TextFormFieldsDictionary,
} from 'src/components/Form/types';

const ClinicianRegistration = async ({ currentLang }: { currentLang: ValidLanguage }) => {
	const translate = getTranslation(currentLang);

	// translations for form fields.
	// keys / form field names need to match up with the clinician invite API
	const textFieldsDict: TextFormFieldsDictionary = {
		firstName: {
			name: 'firstName',
			fieldType: 'text',
			textInputType: 'text',
			label: translate('forms', 'first-name-label'),
			required: true,
		},
		lastName: {
			name: 'lastName',
			fieldType: 'text',
			textInputType: 'text',
			label: translate('forms', 'last-name-label'),
			required: true,
		},
		preferredName: {
			name: 'preferredName',
			fieldType: 'text',
			textInputType: 'text',
			label: translate('forms', 'preferred-name-label'),
			required: false,
		},
		phoneNumber: {
			name: 'phone-number',
			fieldType: 'text',
			textInputType: 'tel',
			label: translate('forms', 'phone-label'),
			required: true,
		},
		email: {
			name: 'email',
			fieldType: 'text',
			textInputType: 'email',
			label: translate('forms', 'email-label'),
			required: true,
		},
	};

	// const selectFieldsDict: SelectFormFieldsDictionary = {
	// 	consentGroup: {
	// 		name: 'consentGroup',
	// 		fieldType: 'select',
	// 		label: translate('forms', 'consent-group-label'),
	// 		required: true,
	// 		options: Object.values(ConsentGroup).map((group: ConsentGroup) => ({
	// 			label: translate('consent-group', group),
	// 			value: `${group}`,
	// 		})),
	// 	},
	// };

	// translations for standalone text in the form
	const textDict: ClinicianInviteFormTextDictionary = {
		'patient-information': translate('clinician-invite-form', 'patient-information'),
		'indicates-required-field': translate('forms', 'indicates-required-field'),
		'select-placeholder': translate('forms', 'select-placeholder'),
	};

	const errorDict: ClinicianInviteFormErrorDictionary = {
		required: translate('form-errors', 'required'),
	};

	return (
		<div>
			<h2>{translate('common', 'invite')}</h2>
			<Link href={`/${currentLang}`}>{translate('common', 'home')}</Link>
			<ClinicianInviteForm
				errorDict={errorDict}
				// selectFieldsDict={selectFieldsDict}
				textDict={textDict}
				textFieldsDict={textFieldsDict}
			/>
		</div>
	);
};

export default ClinicianRegistration;
