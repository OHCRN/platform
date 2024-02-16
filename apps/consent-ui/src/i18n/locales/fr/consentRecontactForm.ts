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

import { ConsentRecontactFormDictionary } from 'src/i18n/locales/en/consentRecontactForm';

import formLabels from './formLabels';

const { firstName, lastName, phone, yes, no } = formLabels;

const dictionary = {
	firstName,
	lastName,
	no,
	phone,
	phoneDescription: 'Si nous les contactons, ce sera uniquement pour des mises à jour sanitaires.',
	recontactFutureResearchDesc:
		"J'accepte que mon médecin de l'étude, ou un membre de l'équipe d'étude, puisse me contacter à l'avenir et/ou fournir mes coordonnées à l'équipe de recherche pour de futures études de recherche et essais cliniques, le cas échéant.",
	recontactFutureResearchTitle: 'Recontact facultatif',
	recontactSecondaryContactDesc:
		"J'accepte que mon médecin de l'étude, ou un membre de l'équipe d'étude, puisse contacter mon plus proche parent ou mon contact secondaire pour obtenir des mises à jour de mes informations de santé si les tentatives pour me contacter n'ont pas abouti.",
	recontactSecondaryContactTitle: 'Contact secondaire en option',
	secondaryContactFormDescription:
		'Veuillez fournir les informations requises suivantes pour votre plus proche parent.',
	yes,
} satisfies ConsentRecontactFormDictionary;

export default dictionary;
