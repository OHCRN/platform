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

import { ConsentReleaseDataTextDictionary } from 'src/i18n/locales/en/consentReleaseDataText';

import formTooltips from './formTooltips';

const {
	participantFirstNameTooltip,
	participantLastNameTooltip,
	participantMiddleNameTooltip,
	participantPreferredNameTooltip,
	residentialPostalCodeTooltip,
	clinicianTitleOrRoleTooltip,
} = formTooltips;

const dictionary = {
	releaseAndUpdateData:
		"J'accepte la publication et la mise à jour des données cliniques et génétiques obtenues auprès des institutions concernées et fournies par le patient, qui seront stockées au sein de l'OHCRN.",
	deIdentifiedResearch:
		"J'accepte d'utiliser les données de mon registre dans le cadre de recherches anonymisées (y compris l'affichage de données agrégées sur le site Web de l'OHCRN et la recherche facilitée par un lien longitudinal avec des bases de données administratives sur la santé.) ",
	deIdentifiedResearchLink:
		'Apprenez-en davantage sur la confidentialité et les informations anonymisées.',
	sectionDescription:
		'Pour rendre cela possible, nous aurons besoin des informations suivantes de votre part :',
	participantFirstNameTooltip,
	participantLastNameTooltip,
	participantMiddleNameTooltip,
	participantPreferredNameTooltip,
	ohipTooltip:
		'Saisissez les 10 premiers chiffres de votre carte santé verte. Nous en avons besoin pour accéder à vos rapports de laboratoire.',
	ohipCheckboxText: "Je n'ai pas de carte Santé de l'Ontario.",
	dateOfBirthTooltip: 'Nous en avons besoin pour demander vos informations cliniques.',
	sexAssignedAtBirthTooltip:
		'Le sexe attribué à la naissance peut aider à améliorer notre compréhension des causes et des risques de cancer.',
	primaryCancerDiagnosisTooltip:
		'Vous pouvez sélectionner plusieurs cancers pour lesquels vous avez reçu un diagnostic.',
	familyHistoryOfCancerTooltip:
		'Sélectionnez oui uniquement si le membre de la famille est : un parent, un frère ou une sœur, un enfant, une tante/un oncle ou des grands-parents.',
	residentialPostalCodeTooltip,
	sectionDescription2:
		'L’OHCRN est ouvert aux participants ayant subi des tests génétiques. Veuillez nous indiquer où vos tests ont été effectués :',
	clinicianTitleOrRoleTooltip,
	molecularLabNameTooltip:
		'Veuillez indiquer le nom du laboratoire qui a effectué vos tests génétiques, si vous le connaissez.',
} satisfies ConsentReleaseDataTextDictionary;

export default dictionary;
