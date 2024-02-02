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
	consentGroupTooltip: 'This will determine if a guardian must be involved with consents.',
	guardianEmailAddressTooltip: 'The guardian will receive an invitation to this account.',
	guardianPhoneNumberTooltip: 'If we contact them, it will be for health updates and consent.',
	participantEmailAddressTooltip: 'The patient will receive an invitation to this account.',
	participantFirstNameTooltip: 'As it appears on their health card.',
	participantLastNameTooltip: 'As it appears on their health card.',
	participantPhoneNumberTooltip:
		'If we contact the participant, it will be for health updates and consent.',
	participantPreferredNameTooltip: 'What would the participant like to be called when contacted.',
} satisfies Record<string, string>;

export type FormTooltipsDictionary = Record<keyof typeof dictionary, string>;

export default dictionary;
