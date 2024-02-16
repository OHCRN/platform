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
import formText from './formText';

const {
	clinicianTitleOrRoleTooltip,
	familyHistoryOfCancerTooltip,
	molecularLabNameTooltip,
	ohipCheckboxText,
	ohipTooltip,
	participantFirstNameTooltip,
	participantLastNameTooltip,
	participantMiddleNameTooltip,
	participantPreferredNameTooltip,
	primaryCancerDiagnosisTooltip,
	residentialPostalCodeTooltip,
	sexAssignedAtBirthTooltip,
} = formTooltips;

const { selectPlaceholder } = formText;

const dictionary = {
	clinicianTitleOrRoleTooltip,
	dateOfBirthTooltip: 'Nous en avons besoin pour demander vos informations cliniques.',
	deIdentifiedResearch:
		"J'accepte d'utiliser les données de mon registre dans le cadre de recherches anonymisées (y compris l'affichage de données agrégées sur le site Web de l'OHCRN et la recherche facilitée par un lien longitudinal avec des bases de données administratives sur la santé.) ",
	deIdentifiedResearchLink:
		'Apprenez-en davantage sur la confidentialité et les informations anonymisées.',
	familyHistoryOfCancerTooltip,
	molecularLabNameTooltip,
	ohipCheckboxText,
	ohipTooltip,
	participantFirstNameTooltip,
	participantLastNameTooltip,
	participantMiddleNameTooltip,
	participantPreferredNameTooltip,
	primaryCancerDiagnosisTooltip,
	releaseAndUpdateData:
		"J'accepte la publication et la mise à jour des données cliniques et génétiques obtenues auprès des institutions concernées et fournies par le patient, qui seront stockées au sein de l'OHCRN.",
	residentialPostalCodeTooltip,
	sectionDescription:
		'Pour rendre cela possible, nous aurons besoin des informations suivantes de votre part :',
	sectionDescription2:
		'L’OHCRN est ouvert aux participants ayant subi des tests génétiques. Veuillez nous indiquer où vos tests ont été effectués :',
	selectPlaceholder,
	sexAssignedAtBirthTooltip,
} satisfies ConsentReleaseDataTextDictionary;

export default dictionary;
