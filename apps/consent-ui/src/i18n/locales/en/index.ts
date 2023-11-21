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
import birthSexDictionary from './birth-sex';
import commonDictionary from './common';
import clinicianInviteFormDictionary from './clinician-invite-form';
import consentCategoryDictionary from './consent-category';
import consentGroupDictionary from './consent-group';
import consentRecontactDictionary from './consent-recontact';
import consentReleaseDataDictionary from './consent-release-data';
import consentResearchParticipationDictionary from './consent-research-participation';
import consentReviewSignDictionary from './consent-review-sign';
import dashboardDictionary from './dashboard';
import footerDictionary from './footer';
import formsDictionary from './forms';
import formLabelsDictionary from './form-labels';
import formErrorsDictionary from './form-errors';
import genderDictionary from './gender';
import geneticsClinicDictionary from './genetics-clinic';
import headerDictionary from './header';
import informedConsentDictionary from './informed-consent';
import landingPageDictionary from './landing-page';
import molecularLabDictionary from './molecular-lab';
import provinceDictionary from './province';
import registerDictionary from './register';
import historyOfCancerDictionary from './history-of-cancer';

const dictionaries = {
	ancestry: ancestryDictionary,
	'birth-sex': birthSexDictionary,
	'clinician-invite-form': clinicianInviteFormDictionary,
	common: commonDictionary,
	'consent-category': consentCategoryDictionary,
	'consent-group': consentGroupDictionary,
	'consent-release-data': consentReleaseDataDictionary,
	'consent-research-participation': consentResearchParticipationDictionary,
	'consent-recontact': consentRecontactDictionary,
	'consent-review-sign': consentReviewSignDictionary,
	dashboard: dashboardDictionary,
	footer: footerDictionary,
	forms: formsDictionary,
	'form-errors': formErrorsDictionary,
	'form-labels': formLabelsDictionary,
	gender: genderDictionary,
	'genetics-clinic': geneticsClinicDictionary,
	header: headerDictionary,
	'history-of-cancer': historyOfCancerDictionary,
	'informed-consent': informedConsentDictionary,
	'landing-page': landingPageDictionary,
	'molecular-lab': molecularLabDictionary,
	province: provinceDictionary,
	register: registerDictionary,
};

export default dictionaries;
