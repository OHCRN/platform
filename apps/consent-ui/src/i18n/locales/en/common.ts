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

import { ConsentCategory } from 'types/entities';

const dictionary = {
	home: 'Homepage',
	register: 'Participant Registration',
	dashboard: 'Dashboard',
	consent: 'Consent Forms',
	invite: 'Clinician Invite',
	'consent-forms': 'Consent Forms',
	[ConsentCategory.enum.INFORMED_CONSENT]: 'Informed Consent',
	[ConsentCategory.enum.CONSENT_RELEASE_DATA]: 'Consent to Data Release ',
	[ConsentCategory.enum.CONSENT_RESEARCH_PARTICIPATION]: 'Consent to Research Participation ',
	[ConsentCategory.enum.CONSENT_RECONTACT]: 'Consent to Recontact',
	[ConsentCategory.enum.CONSENT_REVIEW_SIGN]: 'Review and Sign',
	YES: 'Yes',
	NO: 'No',
	UNKNOWN: 'Unknown',
} as const;

export type CommonDictionaryKey = keyof typeof dictionary;
export type CommonDictionary = { [k in CommonDictionaryKey]: string };

export default dictionary;
