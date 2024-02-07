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

import { ConsentResearchParticipationPageDictionary } from 'src/i18n/locales/en/consentResearchParticipationPage';

import assetUrls from './assetUrls';

const { studyConsentPdf } = assetUrls;

const dictionary = {
	heading: 'Consentement pour la participation à la recherche',
	subheading:
		"Cette partie du formulaire de consentement concerne les études facultatives auxquelles vous pouvez choisir de participer. En participant à ces études facultatives, nous espérons que les résultats aideront d'autres personnes atteintes d'un cancer héréditaire à l'avenir. \n\nParticiper à ces études facultatives est votre choix. Vous pouvez toujours participer au registre principal de l’OHCRN même si vous dites « non » aux études facultatives. Des informations supplémentaires sur les études facultatives peuvent être trouvées dans les informations sur l'étude et le document de consentement éclairé. ",
	subheadingLink: "l'étude et le document de consentement éclairé.",
	studyConsentPdf,
	smallText:
		'Veuillez sélectionner votre réponse ci-dessous pour indiquer si vous souhaitez ou non participer à chaque étude facultative. Vous pouvez modifier votre consentement à tout moment:',
} satisfies ConsentResearchParticipationPageDictionary;

export default dictionary;
