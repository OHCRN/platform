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

import { ConsentReviewSignFormDictionary } from 'src/i18n/locales/en/consentReviewSignForm';

import common from './common';
import formLabels from './formLabels';

const { edit } = common;
const {
	ancestry,
	cancerDiagnosis,
	clinician,
	dateOfBirth,
	familyHistoryOfCancer,
	genderIdentity,
	geneticsClinic,
	molecularLab,
	nameOnOhip,
	ohipNumber,
	personalHistoryOfCancer,
	phone,
	postalCode,
	preferredName,
	secondaryContact,
	sexAssignedAtBirth,
} = formLabels;

const dictionary = {
	agree: "J'accepte",
	ancestry,
	biobankTitle: 'Biobank décentralisée en option',
	biobankDescription:
		'que mes échantillons précédemment collectés (échantillons de tissus/sang/ADN) peuvent être utilisés pour des études de recherche futures inconnues.',
	cancerDiagnosis,
	clinician,
	dateOfBirth,
	deidentifiedParticipationTitle: 'Participation à la recherche anonymisée',
	deidentifiedParticipationDescription:
		"de participer à des recherches anonymisées (y compris des projets de recherche approuvés par l'éthique et des recherches facilitées par des liens longitudinaux avec des bases de données administratives sur la santé).",
	deidentifiedParticipationLink: 'Learn more about privacy and de-identified information.',
	doNotAgree: "Je n'accepte pas",
	edit,
	familyHistoryOfCancer,
	genderIdentity,
	geneticsClinic,
	molecularLab,
	nameOnOhip,
	ohipNumber,
	personalHistoryOfCancer,
	phone,
	postalCode,
	preferredName,
	recontactTitle: 'Recontact facultatif',
	recontactDescription:
		"que mon médecin de l'étude, ou un membre de l'équipe d'étude, puisse me contacter, moi ou mon médecin, par e-mail ou par téléphone au sujet d'études de recherche, d'essais cliniques et d'enquêtes futurs inconnus.",
	releaseContactTitle: 'Divulgation facultative des coordonnées',
	releaseContactDescription:
		"que l'OHCRN puisse fournir mes coordonnées et les résultats de mes tests génétiques à un registre du cancer existant, le cas échéant.",
	releaseContactLink:
		'Cliquez ici pour consulter la liste actuelle des registres du cancer approuvés.',
	releaseHealthDataTitle: 'Publication des données de santé',
	releaseHealthDataDescription:
		"la publication et la mise à jour des données cliniques et génétiques obtenues auprès des institutions concernées et fournies par le patient, qui seront stockées au sein de l'OHCRN.",
	secondaryContact,
	secondaryContactTitle: 'Contact secondaire en option',
	secondaryContactDescription:
		"que mon médecin de l'étude, ou un membre de l'équipe d'étude, puisse contacter mon plus proche parent ou mon contact secondaire pour obtenir des mises à jour de vos informations de santé si les tentatives pour vous contacter n'ont pas abouti.",
	sexAssignedAtBirth,
} satisfies ConsentReviewSignFormDictionary;

export default dictionary;
