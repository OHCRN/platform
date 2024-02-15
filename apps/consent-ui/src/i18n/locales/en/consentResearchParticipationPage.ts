/*
 * Copyright (c) 2024 The Ontario Institute for Cancer Research. All rights reserved
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

import assetUrls from './assetUrls';

const { studyConsentPdf } = assetUrls;

const dictionary = {
	heading: 'Consent for Research Participation',
	smallText:
		'Please select you answer below to show if you would or would not like to take part in each optional study. You can change your consent at any time:',
	studyConsentPdf,
	subheading:
		'This part of the consent form is about optional studies that you can choose to take part in. By taking part in these optional studies, we hope the results will help other people with hereditary cancer in the future. ',
	subheading2:
		'Participating in these optional studies is your choice. You can still take part in the main OHCRN registry even if you say “no” to the optional studies. Additional information about the optional studies can be found in the ',
	subheadingLink: 'study information and informed consent document.',
} satisfies Record<string, string>;

export type ConsentResearchParticipationPageDictionary = Record<keyof typeof dictionary, string>;

export default dictionary;
