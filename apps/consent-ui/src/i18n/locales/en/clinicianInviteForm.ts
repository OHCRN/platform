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

const dictionary = {
	title: 'Clinician Patient Registration',
	mainTitle: 'Register Your Patient',
	mainDescription: 'Invite your patients to participate in the OHCRN registry.',
	patientInformation: 'Patient Information',
	consentGroupTooltip: 'This will determine if a guardian must be involved with consents.',
	phoneTooltip: 'If we contact them, it will be for health updates and consent.',
	emailTooltip: 'The patient will receive an invitation to this account.',
	'after-registering':
		'After registering, we will need to collect some important consents and data. Your patient will have access to update their records, but should they require assistance, we may contact them.',
	consentContactDescription:
		'I have obtained verbal consent that my patient can be contacted by a member of the OHCRN study team for further information and consents.',
	clinicianInformation: 'Clinician Information',
	clinicianEmailTooltip: 'We require this to confirm your authority to register patients.',
	enterGuardianInfo: "Please enter the guardian's information below:",
	uploadFileDescription1:
		'The participant is part of the "Guardian Consent of a Minor (including Assent)" group. Please ',
	'upload-file-link': 'download a copy of the assent form',
	uploadFileDescription2:
		' and have your participant (who is a minor) read and sign the assent form. Use the upload button below to submit a completed assent form signed by the minor.',
	uploadFileLink: '#',
} satisfies Record<string, string>;

export type ClinicianInviteFormDictionary = Record<keyof typeof dictionary, string>;

export default dictionary;
