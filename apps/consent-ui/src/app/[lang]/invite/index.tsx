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
import ClinicianInviteFormEl from 'src/components/ClinicianInviteForm';
import {
	ClinicianInviteFormTextDictionary,
	ConsentGroupOption,
} from 'src/components/ClinicianInviteForm/types';
import { getTranslation, ValidLanguage } from 'src/i18n';
// import { FormErrorsDictionary } from 'src/i18n/locales/en/form-errors';
import { FormsDictionary } from 'src/i18n/locales/en/forms';
import { ConsentGroup } from 'types/entities';

const ClinicianRegistration = async ({ currentLang }: { currentLang: ValidLanguage }) => {
	const translate = getTranslation(currentLang);

	// const errorDict: Partial<FormErrorsDictionary> = {
	// 	required: translate('form-errors', 'required'),
	// };

	const fieldsDict: Partial<FormsDictionary> = {
		'first-name-label': translate('forms', 'first-name-label'),
		'last-name-label': translate('forms', 'last-name-label'),
		'preferred-name-label': translate('forms', 'preferred-name-label'),
		'phone-label': translate('forms', 'phone-label'),
		'email-label': translate('forms', 'email-label'),
	};

	const textDict: ClinicianInviteFormTextDictionary = {
		'patient-information': translate('clinician-invite-form', 'patient-information'),
		'indicates-required-field': translate('forms', 'indicates-required-field'),
		'select-placeholder': translate('forms', 'select-placeholder'),
	};

	const consentGroupOptions: ConsentGroupOption[] = [
		ConsentGroup.enum.ADULT_CONSENT,
		ConsentGroup.enum.ADULT_CONSENT_SUBSTITUTE_DECISION_MAKER,
		ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR,
		ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT,
		ConsentGroup.enum.YOUNG_ADULT_CONSENT,
	].map((group) => ({
		label: translate('consent-group', group),
		value: group,
	}));

	return (
		<div>
			<h2>{translate('common', 'invite')}</h2>
			<Link href={`/${currentLang}`}>{translate('common', 'home')}</Link>
			<ClinicianInviteFormEl
				consentGroupOptions={consentGroupOptions}
				fieldsDict={fieldsDict}
				textDict={textDict}
			/>
		</div>
	);
};

export default ClinicianRegistration;
