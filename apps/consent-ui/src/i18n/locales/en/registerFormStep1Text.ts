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

import formTooltips from './formTooltips';
import formText from './formText';

const { next } = formText;
const {
	dateOfBirthTooltip,
	participantFirstNameTooltip,
	participantLastNameTooltip,
	participantPhoneNumberTooltip,
	participantPreferredNameTooltip,
} = formTooltips;

const dictionary = {
	afterRegistering:
		'After registering, we will need to collect some important consents and data. You will have access to update your participant records, but should you require assistance, we may contact you.',
	dateOfBirthTooltip,
	enterInfo: 'Please enter your information below:',
	enterParticipantInfo: "Please enter the participant's information below:",
	next,
	participantFirstNameTooltip,
	participantLastNameTooltip,
	participantPhoneNumberTooltip,
	participantPreferredNameTooltip,
	questions: 'Questions? Visit the help centre for more information on OHCRN.',
	registeringForSomeoneElse: 'Are you registering on behalf of someone else?',
} satisfies Record<string, string>;

export type RegisterFormStep1TextDictionary = Record<keyof typeof dictionary, string>;

export default dictionary;
