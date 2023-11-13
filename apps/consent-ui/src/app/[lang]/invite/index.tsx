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
import { ConsentGroup } from 'types/entities';
import ClinicianInviteForm from 'src/components/ClinicianInviteForm';
import {
	ClinicianInviteFormErrorDictionary,
	ClinicianInviteFormFieldsDictionary,
	ClinicianInviteFormTextDictionary,
	ConsentGroupOption,
} from 'src/components/ClinicianInviteForm/types';
import { getTranslation, ValidLanguage } from 'src/i18n';

const ClinicianRegistration = async ({ currentLang }: { currentLang: ValidLanguage }) => {
	const translate = getTranslation(currentLang);

	// translations for form fields.
	// keys / form field names need to match up with the clinician invite API
	const fieldDict: ClinicianInviteFormFieldsDictionary = {
		firstName: {
			label: translate('forms', 'first-name-label'),
			type: 'text',
			required: true,
		},
		lastName: {
			label: translate('forms', 'last-name-label'),
			type: 'text',
			required: true,
		},
		preferredName: {
			label: translate('forms', 'preferred-name-label'),
			type: 'text',
			required: false,
		},
		phoneNumber: {
			label: translate('forms', 'phone-label'),
			type: 'tel',
			required: true,
		},
		email: {
			label: translate('forms', 'email-label'),
			type: 'email',
			required: true,
		},
		consentGroup: {
			label: translate('forms', 'consent-group-label'),
			type: 'select',
			required: true,
		},
	};

	// translations for consent group dropdown options
	const consentGroupOptions: ConsentGroupOption[] = Object.values(ConsentGroup).map(
		(group: ConsentGroup) => ({
			label: translate('consent-group', group),
			value: `${group}`,
		}),
	);

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
				consentGroupOptions={consentGroupOptions}
				errorDict={errorDict}
				fieldDict={fieldDict}
				textDict={textDict}
			/>
		</div>
	);
};

export default ClinicianRegistration;
