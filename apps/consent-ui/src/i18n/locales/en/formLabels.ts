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
	ancestry: 'Ancestry',
	cancerDiagnosis: 'Cancer Diagnosis',
	clinician: 'Clinician',
	clinicianFirstName: 'Clinician First Name',
	clinicianInstitutionalEmailAddress: 'Clinician Institutional Email Address',
	clinicianLastName: 'Clinician Last Name',
	clinicianTitleOrRole: 'Clinician Title/Role',
	confirmPassword: 'Confirm Password',
	consentContact: 'Consent to be Contacted',
	consentGroup: 'Consent Group',
	dateOfBirth: 'Date of Birth',
	email: 'Email Address',
	familyHistoryOfCancer: 'Family History of Cancer',
	firstName: 'First Name',
	genderIdentity: 'Gender Identity',
	geneticsClinic: 'Genetics Clinic',
	guardianEmail: "Guardian's Email Address",
	guardianName: "Guardian's Name",
	guardianPhone: "Guardian's Phone Number",
	guardianRelationship: "Guardian's Relationship to Participant",
	lastName: 'Last Name',
	molecularLab: 'Molecular Lab',
	nameOnOhip: 'Name on OHIP Card',
	no: 'No',
	ohipNumber: 'OHIP #',
	password: 'Password',
	personalHistoryOfCancer: 'Personal History of Cancer',
	phone: 'Phone Number',
	postalCode: 'Postal Code',
	preferredName: 'Preferred Name',
	secondaryContact: 'Secondary Contact',
	sexAssignedAtBirth: 'Sex Assigned at Birth',
	yes: 'Yes',
	yourName: 'Your Name',
	yourPhone: 'Your Phone Number',
	yourRelationship: 'Your Relationship to Participant',
} satisfies Record<string, string>;

export type FormLabelsDictionary = Record<keyof typeof dictionary, string>;

export default dictionary;
