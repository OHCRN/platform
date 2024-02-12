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

import { ConsentRecontactPageDictionary } from 'src/i18n/locales/en/consentRecontactPage';

import assetUrlsDictionary from './assetUrls';

const { studyConsentPdf } = assetUrlsDictionary;

const dictionary = {
	smallText:
		'Veuillez sélectionner votre réponse ci-dessous pour indiquer si vous souhaitez ou non participer à chaque étude facultative. Vous pouvez modifier votre consentement à tout moment:',
	studyConsentPdf,
	subheading:
		"Cette partie du formulaire de consentement concerne le consentement futur facultatif à être recontacté. Vous pouvez choisir d'être recontacté au sujet de futures études de recherche, essais cliniques, enquêtes et pour discuter de la collecte d'échantillons biologiques supplémentaires. \n\n Vous pouvez toujours participer au registre principal de l’OHCRN même si vous dites « non » à un futur contact. Des informations supplémentaires sur le consentement à être recontacté peuvent être trouvées dans les ",
	subheadingLink: "informations sur l'étude et le document de consentement éclairé.",
	title: 'Consentement facultatif à être recontacté',
} satisfies ConsentRecontactPageDictionary;

export default dictionary;
