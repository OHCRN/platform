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

import en from 'src/i18n/locales/en/index';
import birthSexDictionary from 'src/i18n/locales/fr/birth-sex';
import commonDictionary from 'src/i18n/locales/fr/common';
import informedConsentDictionary from 'src/i18n/locales/fr/informed-consent';
import clinicianInviteFormDictionary from 'src/i18n/locales/fr/clinician-invite-form';
import consentReleaseDataDictionary from 'src/i18n/locales/fr/consent-release-data';
import consentResearchParticipationDictionary from 'src/i18n/locales/fr/consent-research-participation';
import consentRecontactDictionary from 'src/i18n/locales/fr/consent-recontact';
import consentReviewSignDictionary from 'src/i18n/locales/fr/consent-review-sign';
import dashboardDictionary from 'src/i18n/locales/fr/dashboard';
import footerDictionary from 'src/i18n/locales/fr/footer';
import formsDictionary from 'src/i18n/locales/fr/forms';
import formErrorsDictionary from 'src/i18n/locales/fr/form-errors';
import genderDictionary from 'src/i18n/locales/fr/gender';
import geneticsClinicDictionary from 'src/i18n/locales/fr/genetics-clinic';
import headerDictionary from 'src/i18n/locales/fr/header';
import inviteDictionary from 'src/i18n/locales/fr/invite';
import landingPageDictionary from 'src/i18n/locales/fr/landing-page';
import provinceDictionary from 'src/i18n/locales/fr/province';
import registerDictionary from 'src/i18n/locales/fr/register';
import ancestryDictionary from 'src/i18n/locales/fr/ancestry';

const dictionaries = {
	ancestry: ancestryDictionary,
	'birth-sex': birthSexDictionary,
	'clinician-invite-form': clinicianInviteFormDictionary,
	common: commonDictionary,
	'informed-consent': informedConsentDictionary,
	'consent-release-data': consentReleaseDataDictionary,
	'consent-research-participation': consentResearchParticipationDictionary,
	'consent-recontact': consentRecontactDictionary,
	'consent-review-sign': consentReviewSignDictionary,
	dashboard: dashboardDictionary,
	footer: footerDictionary,
	'form-errors': formErrorsDictionary,
	forms: formsDictionary,
	gender: genderDictionary,
	'genetics-clinic': geneticsClinicDictionary,
	header: headerDictionary,
	invite: inviteDictionary,
	'landing-page': landingPageDictionary,
	province: provinceDictionary,
	register: registerDictionary,
} satisfies typeof en;

export default dictionaries;
