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

import ClinicianInviteFormComponent from 'src/components/ClinicianInviteForm';
import {
	ClinicianInviteFormTextDictionary,
	ConsentGroupOption,
} from 'src/components/ClinicianInviteForm/types';
import { getTranslation, ValidLanguage } from 'src/i18n';
import { FormLabelsDictionary } from 'src/i18n/locales/en/form-labels';
import { FormErrorsDictionary } from 'src/i18n/locales/en/form-errors';

const ClinicianRegistration = async ({ currentLang }: { currentLang: ValidLanguage }) => {
	const translate = getTranslation(currentLang);

	const errorsDict: FormErrorsDictionary = {
		required: translate('form-errors', 'required'),
	};

	const labelsDict: Partial<FormLabelsDictionary> = {
		'consent-group': translate('form-labels', 'consent-group'),
		'first-name': translate('form-labels', 'first-name'),
		'last-name': translate('form-labels', 'last-name'),
		'preferred-name': translate('form-labels', 'preferred-name'),
		email: translate('form-labels', 'email'),
		phone: translate('form-labels', 'phone'),
		'clinician-first-name': translate('form-labels', 'clinician-first-name'),
		'clinician-institutional-email-address': translate(
			'form-labels',
			'clinician-institutional-email-address',
		),
		'clinician-last-name': translate('form-labels', 'clinician-last-name'),
		'clinician-title-or-role': translate('form-labels', 'clinician-title-or-role'),
		'consent-contact': translate('form-labels', 'consent-contact'),
		'guardian-email': translate('form-labels', 'guardian-email'),
		'guardian-name': translate('form-labels', 'guardian-name'),
		'guardian-phone': translate('form-labels', 'guardian-phone'),
		'guardian-relationship': translate('form-labels', 'guardian-relationship'),
	};

	const textDict: ClinicianInviteFormTextDictionary = {
		'consent-contact-description': translate(
			'clinician-invite-form',
			'consent-contact-description',
		),
		'indicates-required-field': translate('forms', 'indicates-required-field'),
		'patient-information': translate('clinician-invite-form', 'patient-information'),
		'select-placeholder': translate('forms', 'select-placeholder'),
		'upload-file-description-1': translate('clinician-invite-form', 'upload-file-description-1'),
		'upload-file-description-2': translate('clinician-invite-form', 'upload-file-description-2'),
		'upload-file-link': translate('clinician-invite-form', 'upload-file-link'),
	};

	const consentGroupOptions: ConsentGroupOption[] = CONSENT_GROUPS.map((group) => ({
		label: translate('consent-group', group),
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

export default ClinicianRegistration;
