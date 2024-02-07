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

import { ConsentResearchParticipationFormDictionary } from 'src/i18n/locales/en/consentResearchParticipationForm';

import formLabels from '../en/formLabels';

const { yes, no } = formLabels;

const dictionary = {
	researchParticipationFutureResearchTitle:
		"Consentement facultatif pour permettre la collecte d'échantillons précédemment collectés pour de futures recherches inconnues",
	researchParticipationFutureResearchTitleDesc:
		"J'accepte que mes échantillons précédemment collectés puissent être inclus dans la biobanque décentralisée et utilisés pour des études de recherche futures inconnues.",
	researchParticipationContactInformationTitle:
		'Publication facultative des coordonnées des registres du cancer approuvés existants',
	researchParticipationContactInformationDesc:
		"J'accepte que mon médecin de l'étude, ou un membre de l'équipe d'étude, puisse fournir mes coordonnées et les résultats de mes tests génétiques à un registre du cancer existant, le cas échéant. ",
	researchParticipationContactInformationDescLink:
		'Cliquez ici pour consulter la liste actuelle des registres du cancer approuvés.',
	yes,
	no,
} satisfies ConsentResearchParticipationFormDictionary;

export default dictionary;
