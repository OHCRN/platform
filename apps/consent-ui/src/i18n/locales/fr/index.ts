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

import birthSexDictionary from 'src/i18n/locales/fr/birthSex';
import consentCategoryDictionary from 'src/i18n/locales/fr/consentCategory';
import consentGroupDictionary from 'src/i18n/locales/fr/consentGroup';
import consentRecontactDictionary from 'src/i18n/locales/fr/consentRecontact';
import consentReleaseDataDictionary from 'src/i18n/locales/fr/consentReleaseData';
import consentResearchParticipationDictionary from 'src/i18n/locales/fr/consentResearchParticipation';
import consentReviewSignDictionary from 'src/i18n/locales/fr/consentReviewSign';
import geneticsClinicDictionary from 'src/i18n/locales/fr/geneticsClinic';
import informedConsentDictionary from 'src/i18n/locales/fr/informedConsent';
import landingPageDictionary from 'src/i18n/locales/fr/landingPage';
import molecularLabDictionary from 'src/i18n/locales/fr/molecularLab';
import historyOfCancerDictionary from 'src/i18n/locales/fr/historyOfCancer';
import dashboardDictionary from 'src/i18n/locales/fr/dashboard';
import footerDictionary from 'src/i18n/locales/fr/footer';
import genderDictionary from 'src/i18n/locales/fr/gender';
import headerDictionary from 'src/i18n/locales/fr/header';
import inviteDictionary from 'src/i18n/locales/fr/invite';
import provinceDictionary from 'src/i18n/locales/fr/province';
import registerDictionary from 'src/i18n/locales/fr/register';
import commonDictionary from 'src/i18n/locales/fr/common';
import ancestryDictionary from 'src/i18n/locales/fr/ancestry';
import en from 'src/i18n/locales/en/index';

const dictionaries = {
	ancestry: ancestryDictionary,
	birthSex: birthSexDictionary,
	common: commonDictionary,
	consentCategory: consentCategoryDictionary,
	consentGroup: consentGroupDictionary,
	consentReleaseData: consentReleaseDataDictionary,
	consentResearchParticipation: consentResearchParticipationDictionary,
	consentRecontact: consentRecontactDictionary,
	consentReviewSign: consentReviewSignDictionary,
	dashboard: dashboardDictionary,
	footer: footerDictionary,
	gender: genderDictionary,
	geneticsClinic: geneticsClinicDictionary,
	header: headerDictionary,
	historyOfCancer: historyOfCancerDictionary,
	informedConsent: informedConsentDictionary,
	invite: inviteDictionary,
	landingPage: landingPageDictionary,
	molecularLab: molecularLabDictionary,
	province: provinceDictionary,
	register: registerDictionary,
} satisfies typeof en;

export default dictionaries;
