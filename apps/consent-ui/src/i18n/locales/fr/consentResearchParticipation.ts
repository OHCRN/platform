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

import { ConsentResearchParticipationDictionary } from 'src/i18n/locales/en/consentResearchParticipation';

const dictionary = {
	heading: 'Consentement pour la participation à la recherche',
	subheading:
		"Cette partie du formulaire de consentement concerne les études facultatives auxquelles vous pouvez choisir de participer. En participant à ces études facultatives, nous espérons que les résultats aideront d'autres personnes atteintes d'un cancer héréditaire à l'avenir. \n\nParticiper à ces études facultatives est votre choix. Vous pouvez toujours participer au registre principal de l’OHCRN même si vous dites « non » aux études facultatives. Des informations supplémentaires sur les études facultatives peuvent être trouvées dans les informations sur l'étude et le document de consentement éclairé. ",
	subheadingLink: "l'étude et le document de consentement éclairé.",
	label:
		'Veuillez sélectionner votre réponse ci-dessous pour indiquer si vous souhaitez ou non participer à chaque étude facultative. Vous pouvez modifier votre consentement à tout moment:',
	RESEARCH_PARTICIPATION__FUTURE_RESEARCH_TITLE:
		"Consentement facultatif pour permettre la collecte d'échantillons précédemment collectés pour de futures recherches inconnues",
	RESEARCH_PARTICIPATION__FUTURE_RESEARCH_DESC:
		"J'accepte que mes échantillons précédemment collectés puissent être inclus dans la biobanque décentralisée et utilisés pour des études de recherche futures inconnues.",
	RESEARCH_PARTICIPATION__CONTACT_INFORMATION_TITLE:
		'Publication facultative des coordonnées des registres du cancer approuvés existants.',
	RESEARCH_PARTICIPATION__CONTACT_INFORMATION_DESC:
		"J'accepte que mon médecin de l'étude, ou un membre de l'équipe d'étude, puisse fournir mes coordonnées et les résultats de mes tests génétiques à un registre du cancer existant, le cas échéant. ",
	RESEARCH_PARTICIPATION__CONTACT_INFORMATION_DESC_LINK:
		'Cliquez ici pour consulter la liste actuelle des registres du cancer approuvés.',
	yesText: 'Oui',
	noText: 'Non',
} satisfies ConsentResearchParticipationDictionary;

export default dictionary;
