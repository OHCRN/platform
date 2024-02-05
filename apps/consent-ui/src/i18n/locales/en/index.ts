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

import ancestryDictionary from './ancestry';
import birthSexDictionary from './birthSex';
import commonDictionary from './common';
import consentCategoryDictionary from './consentCategory';
import consentCompleteNotificationDictionary from './consentCompleteNotification';
import consentGroupDictionary from './consentGroup';
import consentInProgressNotificationDictionary from './consentInProgressNotification';
import consentRecontactDictionary from './consentRecontact';
import consentReleaseDataDictionary from './consentReleaseData';
import consentResearchParticipationDictionary from './consentResearchParticipation';
import consentReviewSignDictionary from './consentReviewSign';
import consentWizardDictionary from './consentWizard';
import dashboardDictionary from './dashboard';
import emailVerifiedNotificationDictionary from './emailVerifiedNotification';
import footerDictionary from './footer';
import formErrorsDictionary from './formErrors';
import formLabelsDictionary from './formLabels';
import formTextDictionary from './formText';
import formTooltipsDictionary from './formTooltips';
import genderDictionary from './gender';
import geneticsClinicDictionary from './geneticsClinic';
import headerDictionary from './header';
import historyOfCancerDictionary from './historyOfCancer';
import informedConsentDictionary from './informedConsent';
import inviteFormConsentGroupModalDictionary from './inviteFormConsentGroupModal';
import inviteFormLabelsDictionary from './inviteFormLabels';
import inviteFormPageDictionary from './inviteFormPage';
import inviteFormTextDictionary from './inviteFormText';
import inviteSentNotificationDictionary from './inviteSentNotification';
import landingPageDictionary from './landingPage';
import molecularLabDictionary from './molecularLab';
import provinceDictionary from './province';
import registerFormStep1LabelsDictionary from './registerFormStep1Labels';
import registerFormStep1TextDictionary from './registerFormStep1Text';
import registerFormStep2LabelsDictionary from './registerFormStep2Labels';
import registerFormStep2TextDictionary from './registerFormStep2Text';
import registerFormTextDictionary from './registerFormText';
import registerPageDictionary from './registerPage';

const dictionaries = {
	ancestry: ancestryDictionary,
	birthSex: birthSexDictionary,
	common: commonDictionary,
	consentCategory: consentCategoryDictionary,
	consentCompleteNotification: consentCompleteNotificationDictionary,
	consentGroup: consentGroupDictionary,
	consentInProgressNotification: consentInProgressNotificationDictionary,
	consentRecontact: consentRecontactDictionary,
	consentReleaseData: consentReleaseDataDictionary,
	consentResearchParticipation: consentResearchParticipationDictionary,
	consentReviewSign: consentReviewSignDictionary,
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
	inviteFormConsentGroupModal: inviteFormConsentGroupModalDictionary,
	inviteFormLabels: inviteFormLabelsDictionary,
	inviteFormPage: inviteFormPageDictionary,
	inviteFormText: inviteFormTextDictionary,
	inviteSentNotification: inviteSentNotificationDictionary,
	landingPage: landingPageDictionary,
	molecularLab: molecularLabDictionary,
	province: provinceDictionary,
	registerFormStep1Labels: registerFormStep1LabelsDictionary,
	registerFormStep1Text: registerFormStep1TextDictionary,
	registerFormStep2Labels: registerFormStep2LabelsDictionary,
	registerFormStep2Text: registerFormStep2TextDictionary,
	registerFormText: registerFormTextDictionary,
	registerPage: registerPageDictionary,
};

export default dictionaries;
