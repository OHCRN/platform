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

import { ConsentResearchParticipationDictionary } from 'src/i18n/locales/en/consentResearchParticipation';

// MAKE FRENCH TRANSLATIONS HERE
const dictionary = {
	heading: 'Consent for Research Participation',
	subheading:
		'This part of the consent form is about optional studies that you can choose to take part in.  By taking part in these optional studies, we hope the results will help other people with hereditary cancer in the future. \n\nParticipating in these optional studies is your choice.  You can still take part in the main OHCRN registry even if you say “no” to the optional studies.  Additional information about the optional studies can be found in the ',
	subheadingLink: 'study information and informed consent document.',
	label:
		'Please select you answer below to show if you would or would not like to take part in each optional study. You can change your consent at any time:',
	RESEARCH_PARTICIPATION__FUTURE_RESEARCH_TITLE:
		'Optional consent to allow collection of previously collected samples for future unknown research',
	RESEARCH_PARTICIPATION__FUTURE_RESEARCH_DESC:
		'I agree that my previously collected samples may be included in the decentralized biobank and used for unknown future research studies.',
	RESEARCH_PARTICIPATION__CONTACT_INFORMATION_TITLE:
		'Optional release of contact information to existing approved cancer registries.',
	RESEARCH_PARTICIPATION__CONTACT_INFORMATION_DESC:
		'I agree that my study doctor, or someone on the study team, may provide my contact information and genetic test results to an existing cancer registry, if applicable. ',
	RESEARCH_PARTICIPATION__CONTACT_INFORMATION_DESC_LINK:
		'Click here to view current list of approved cancer registries.', // wanted to keep the type as string for when we do translations
	yesText: 'Yes',
	noText: 'No',
} satisfies ConsentResearchParticipationDictionary;

export default dictionary;
