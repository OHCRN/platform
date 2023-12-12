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
import clinicianInviteFormDictionary from './clinician-invite-form';
import commonDictionary from './common';
import consentCategoryDictionary from './consentCategory';
import consentGroupDictionary from './consentGroup';
import consentRecontactDictionary from './consentRecontact';
import consentReleaseDataDictionary from './consentReleaseData';
import consentResearchParticipationDictionary from './consentResearchParticipation';
import consentReviewSignDictionary from './consentReviewSign';
import dashboardDictionary from './dashboard';
import footerDictionary from './footer';
import formsDictionary from './forms';
import formLabelsDictionary from './form-labels';
import formErrorsDictionary from './form-errors';
import genderDictionary from './gender';
import geneticsClinicDictionary from './geneticsClinic';
import headerDictionary from './header';
import informedConsentDictionary from './informedConsent';
import landingPageDictionary from './landingPage';
import molecularLabDictionary from './molecularLab';
import provinceDictionary from './province';
import registerDictionary from './register';
import historyOfCancerDictionary from './historyOfCancer';

const dictionaries = {
	ancestry: ancestryDictionary,
	birthSex: birthSexDictionary,
	'clinician-invite-form': clinicianInviteFormDictionary,
	common: commonDictionary,
	consentCategory: consentCategoryDictionary,
	consentGroup: consentGroupDictionary,
	consentReleaseData: consentReleaseDataDictionary,
	consentResearchParticipation: consentResearchParticipationDictionary,
	consentRecontact: consentRecontactDictionary,
	consentReviewSign: consentReviewSignDictionary,
	dashboard: dashboardDictionary,
	footer: footerDictionary,
	forms: formsDictionary,
	'form-errors': formErrorsDictionary,
	'form-labels': formLabelsDictionary,
	gender: genderDictionary,
	geneticsClinic: geneticsClinicDictionary,
	header: headerDictionary,
	historyOfCancer: historyOfCancerDictionary,
	informedConsent: informedConsentDictionary,
	landingPage: landingPageDictionary,
	molecularLab: molecularLabDictionary,
	province: provinceDictionary,
	register: registerDictionary,
};

export default dictionaries;
