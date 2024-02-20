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

import assetUrlsDictionary from './assetUrls';

const { studyConsentPdf } = assetUrlsDictionary;

const dictionary = {
	description1:
		'Please carefully review the OHCRN Study Information and Informed Consent. You can also ',
	description2:
		' for review. If you have any questions or concerns please contact the OHCRN study team at ',
	description3:
		"If you are completing this form on behalf of someone else, 'you' or 'me' refers to your child or the person you are completing the form on behalf of; 'we' means the doctors and other study staff.",
	downloadConsentPdf: 'Download Consent PDF',
	linkText: 'download the study information and informed consent PDF',
	studyConsentPdf,
	title: 'OHCRN Study Information and Informed Consent',
} satisfies Record<string, string>;

export type InformedConsentPageDictionary = Record<keyof typeof dictionary, string>;

export default dictionary;
