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

import { RegisterFormTextDictionary } from '../en/registerFormText';

import formTooltips from './formTooltips';
import formText from './formText';

const { back, goToStep, indicatesRequiredField, next, stepCurrentOfTotal } = formText;
const {
	dateOfBirthTooltip,
	participantFirstNameTooltip,
	participantLastNameTooltip,
	participantPhoneNumberTooltip,
	participantPreferredNameTooltip,
} = formTooltips;

const dictionary = {
	afterRegistering:
		"Après votre inscription, nous devrons collecter certains consentements et données importants. Vous aurez accès à la mise à jour de vos dossiers de participants, mais si vous avez besoin d'aide, nous pouvons vous contacter.",
	back,
	consentContactDescription:
		"J'accepte qu'un membre de l'équipe d'étude de l'OHCRN puisse me contacter pour plus d'informations et obtenir des consentements.",
	createAccount: 'Créer un compte',
	dateOfBirthTooltip,
	enterInfo: "S'il vous plaît entrer vos informations ci-dessous:",
	enterParticipantInfo: 'Veuillez saisir les informations du participant ci-dessous :',
	goToStep,
	indicatesRequiredField,
	next,
	participantFirstNameTooltip,
	participantLastNameTooltip,
	participantPhoneNumberTooltip,
	participantPreferredNameTooltip,
	questions: "Des questions? Consultez le centre d'aide pour plus d'informations sur l'OHCRN.",
	registeringForSomeoneElse: "Vous vous inscrivez au nom de quelqu'un d'autre ?",
	stepCurrentOfTotal,
} satisfies RegisterFormTextDictionary;

export default dictionary;
