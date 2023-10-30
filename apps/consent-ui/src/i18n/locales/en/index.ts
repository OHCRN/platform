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
import informedConsentDictionary from './informed-consent';
import consentReleaseDataDictionary from './consent-release-data';
import consentResearchParticipationDictionary from './consent-research-participation';
import consentRecontactDictionary from './consent-recontact';
import consentReviewSignDictionary from './consent-review-sign';
import dashboardDictionary from './dashboard';
import footerDictionary from './footer';
import genderDictionary from './gender';
import geneticsClinicDictionary from './genetics-clinic';
import headerDictionary from './header';
import inviteDictionary from './invite';
import landingPageDictionary from './landing-page';
import provinceDictionary from './province';
import registerDictionary from './register';

const dictionaries = {
	ancestry: ancestryDictionary,
	'birth-sex': birthSexDictionary,
	common: commonDictionary,
	'informed-consent': informedConsentDictionary,
	'consent-release-data': consentReleaseDataDictionary,
	'consent-research-participation': consentResearchParticipationDictionary,
	'consent-recontact': consentRecontactDictionary,
	'consent-review-sign': consentReviewSignDictionary,
	dashboard: dashboardDictionary,
	footer: footerDictionary,
	gender: genderDictionary,
	'genetics-clinic': geneticsClinicDictionary,
	header: headerDictionary,
	invite: inviteDictionary,
	'landing-page': landingPageDictionary,
	province: provinceDictionary,
	register: registerDictionary,
};

export default dictionaries;