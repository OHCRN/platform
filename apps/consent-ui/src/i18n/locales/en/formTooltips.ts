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

const dictionary = {
	clinicianInstitutionalEmailAddressTooltip:
		'We require this to confirm your authority to register patients.',
	clinicianTitleOrRoleTooltip:
		'Please provide the name of the clinician that ordered your genetic testing, or the main clinician handling your clinical care.',
	consentGroupTooltip: 'This will determine if a guardian must be involved with consents.',
	dateOfBirthTooltip: "We require this to request participant's clinical information.",
	dateOfBirthTooltip2: 'We require this to request your clinical information.',
	familyHistoryOfCancerTooltip:
		'Select yes only if the family member is: parent, sibling, child, aunt/uncle, or grandparents.',
	guardianEmailAddressTooltip: 'The guardian will receive an invitation to this account.',
	guardianPhoneNumberTooltip: 'If we contact them, it will be for health updates and consent.',
	molecularLabNameTooltip:
		'Please provide the name of the lab that did your genetic testing, if you know this.',
	ohipCheckboxText: 'I do not have an Ontario health card.',
	ohipTooltip:
		'Enter the first 10 digits of your green health card. We require this in order to access your lab reports.',
	participantEmailAddressTooltip: 'The patient will receive an invitation to this account.',
	participantFirstNameTooltip: 'As it appears on their health card.',
	participantLastNameTooltip: 'As it appears on their health card.',
	participantMiddleNameTooltip: 'As it appears on their health card.',
	participantPhoneNumberTooltip:
		'If we contact the participant, it will be for health updates and consent.',
	participantPreferredNameTooltip: 'What would the participant like to be called when contacted.',
	primaryCancerDiagnosisTooltip: 'You may select multiple cancers you have been diagnosed with.',
	residentialPostalCodeTooltip:
		'We require this to request your clinical information, this is not used to identify you or your location of residence.',
	sexAssignedAtBirthTooltip:
		'Sex assigned at birth can help improve our understanding of cancer causes and risks.',
} satisfies Record<string, string>;

export type FormTooltipsDictionary = Record<keyof typeof dictionary, string>;

export default dictionary;
