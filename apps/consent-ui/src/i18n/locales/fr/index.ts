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

import registerFormStep1TextDictionary from 'src/i18n/locales/fr/registerFormStep1Text';
import registerFormStep2TextDictionary from 'src/i18n/locales/fr/registerFormStep2Text';
import ancestryDictionary from 'src/i18n/locales/fr/ancestry';
import assetUrlsDictionary from 'src/i18n/locales/fr/assetUrls';
import birthSexDictionary from 'src/i18n/locales/fr/birthSex';
import commonDictionary from 'src/i18n/locales/fr/common';
import consentCategoryDictionary from 'src/i18n/locales/fr/consentCategory';
import consentCompleteNotificationDictionary from 'src/i18n/locales/fr/consentCompleteNotification';
import consentGroupDictionary from 'src/i18n/locales/fr/consentGroup';
import consentInProgressNotificationDictionary from 'src/i18n/locales/fr/consentInProgressNotification';
import consentRecontactDictionary from 'src/i18n/locales/fr/consentRecontact';
import consentReleaseDataDictionary from 'src/i18n/locales/fr/consentReleaseData';
import consentResearchParticipationDictionary from 'src/i18n/locales/fr/consentResearchParticipation';
import consentReviewSignFormDictionary from 'src/i18n/locales/fr/consentReviewSignForm';
import consentReviewSignPageDictionary from 'src/i18n/locales/fr/consentReviewSignPage';
import consentWizardDictionary from 'src/i18n/locales/fr/consentWizard';
import dashboardDictionary from 'src/i18n/locales/fr/dashboard';
import emailVerifiedNotificationDictionary from 'src/i18n/locales/fr/emailVerifiedNotification';
import en from 'src/i18n/locales/en/index';
import footerDictionary from 'src/i18n/locales/fr/footer';
import formErrorsDictionary from 'src/i18n/locales/fr/formErrors';
import formLabelsDictionary from 'src/i18n/locales/fr/formLabels';
import formTextDictionary from 'src/i18n/locales/fr/formText';
import formTooltipsDictionary from 'src/i18n/locales/fr/formTooltips';
import genderDictionary from 'src/i18n/locales/fr/gender';
import geneticsClinicDictionary from 'src/i18n/locales/fr/geneticsClinic';
import headerDictionary from 'src/i18n/locales/fr/header';
import historyOfCancerDictionary from 'src/i18n/locales/fr/historyOfCancer';
import informedConsentDictionary from 'src/i18n/locales/fr/informedConsent';
import informedConsentFormDictionary from 'src/i18n/locales/fr/informedConsentForm';
import informedConsentPageDictionary from 'src/i18n/locales/fr/informedConsentPage';
import inviteFormConsentGroupModalDictionary from 'src/i18n/locales/fr/inviteFormConsentGroupModal';
import inviteFormLabelsDictionary from 'src/i18n/locales/fr/inviteFormLabels';
import inviteFormPageDictionary from 'src/i18n/locales/fr/inviteFormPage';
import inviteFormTextDictionary from 'src/i18n/locales/fr/inviteFormText';
import landingPageDictionary from 'src/i18n/locales/fr/landingPage';
import molecularLabDictionary from 'src/i18n/locales/fr/molecularLab';
import provinceDictionary from 'src/i18n/locales/fr/province';
import registerFormStep1LabelsDictionary from 'src/i18n/locales/fr/registerFormStep1Labels';
import registerFormStep2LabelsDictionary from 'src/i18n/locales/fr/registerFormStep2Labels';
import registerFormTextDictionary from 'src/i18n/locales/fr/registerFormText';
import registerPageDictionary from 'src/i18n/locales/fr/registerPage';

const dictionaries = {
	ancestry: ancestryDictionary,
	assetUrls: assetUrlsDictionary,
	birthSex: birthSexDictionary,
	common: commonDictionary,
	consentCategory: consentCategoryDictionary,
	consentCompleteNotification: consentCompleteNotificationDictionary,
	consentGroup: consentGroupDictionary,
	consentInProgressNotification: consentInProgressNotificationDictionary,
	consentRecontact: consentRecontactDictionary,
	consentReleaseData: consentReleaseDataDictionary,
	consentResearchParticipation: consentResearchParticipationDictionary,
	consentReviewSignForm: consentReviewSignFormDictionary,
	consentReviewSignPage: consentReviewSignPageDictionary,
	consentWizard: consentWizardDictionary,
	dashboard: dashboardDictionary,
	emailVerifiedNotification: emailVerifiedNotificationDictionary,
	footer: footerDictionary,
	formTooltips: formTooltipsDictionary,
	formErrors: formErrorsDictionary,
	formLabels: formLabelsDictionary,
	formText: formTextDictionary,
	gender: genderDictionary,
	geneticsClinic: geneticsClinicDictionary,
	header: headerDictionary,
	historyOfCancer: historyOfCancerDictionary,
	informedConsent: informedConsentDictionary,
	informedConsentForm: informedConsentFormDictionary,
	informedConsentPage: informedConsentPageDictionary,
	inviteFormConsentGroupModal: inviteFormConsentGroupModalDictionary,
	inviteFormLabels: inviteFormLabelsDictionary,
	inviteFormPage: inviteFormPageDictionary,
	inviteFormText: inviteFormTextDictionary,
	landingPage: landingPageDictionary,
	molecularLab: molecularLabDictionary,
	province: provinceDictionary,
	registerFormStep1Labels: registerFormStep1LabelsDictionary,
	registerFormStep1Text: registerFormStep1TextDictionary,
	registerFormStep2Labels: registerFormStep2LabelsDictionary,
	registerFormStep2Text: registerFormStep2TextDictionary,
	registerFormText: registerFormTextDictionary,
	registerPage: registerPageDictionary,
} satisfies typeof en;

export default dictionaries;
