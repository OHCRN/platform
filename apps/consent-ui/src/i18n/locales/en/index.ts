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
import clinicianInviteDictionary from './clinician-invite';
import commonDictionary from './common';
import consentCategoryDictionary from './consentCategory';
import consentGroupDictionary from './consentGroup';
import consentRecontactDictionary from './consentRecontact';
import consentReleaseDataDictionary from './consentReleaseData';
import consentResearchParticipationDictionary from './consentResearchParticipation';
import consentReviewSignDictionary from './consentReviewSign';
import dashboardDictionary from './dashboard';
import footerDictionary from './footer';
import genderDictionary from './gender';
import geneticsClinicDictionary from './geneticsClinic';
import headerDictionary from './header';
import historyOfCancerDictionary from './historyOfCancer';
import informedConsentDictionary from './informedConsent';
import inviteDictionary from './invite';
import landingPageDictionary from './landingPage';
import molecularLabDictionary from './molecularLab';
import provinceDictionary from './province';
import registerDictionary from './register';

const dictionaries = {
	ancestry: ancestryDictionary,
	birthSex: birthSexDictionary,
	clinicianInvite: clinicianInviteDictionary,
	common: commonDictionary,
	consentCategory: consentCategoryDictionary,
	consentGroup: consentGroupDictionary,
	consentRecontact: consentRecontactDictionary,
	consentReleaseData: consentReleaseDataDictionary,
	consentResearchParticipation: consentResearchParticipationDictionary,
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
};

export default dictionaries;
