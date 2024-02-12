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

import { FormTooltipsDictionary } from '../en/formTooltips';

const dictionary = {
	clinicianInstitutionalEmailAddressTooltip:
		'Nous en avons besoin pour confirmer votre autorité à enregistrer des patients.',
	consentGroupTooltip: 'Cela déterminera si un tuteur doit être impliqué dans les consentements.',
	dateOfBirthTooltip:
		'Nous en avons besoin pour demander les informations cliniques du participant.',
	guardianEmailAddressTooltip: 'Le tuteur recevra une invitation à ce compte.',
	guardianPhoneNumberTooltip:
		'Si nous les contactons, ce sera pour des mises à jour de santé et un consentement.',
	participantEmailAddressTooltip: 'Le patient recevra une invitation sur ce compte.',
	participantFirstNameTooltip: 'Tel qu’il apparaît sur leur carte Santé.',
	participantMiddleNameTooltip: 'Tel qu’il apparaît sur leur carte Santé.',
	participantLastNameTooltip: 'Tel qu’il apparaît sur leur carte Santé.',
	participantPhoneNumberTooltip:
		'Si nous contactons le participant, ce sera pour des mises à jour de santé et son consentement.',
	participantPreferredNameTooltip:
		"Comment le participant aimerait-il être appelé lorsqu'il est contacté ?",
	postalCodeTooltip:
		'Nous en avons besoin pour demander vos informations cliniques, celles-ci ne sont pas utilisées pour vous identifier ou identifier votre lieu de résidence.',
	clinicianTitleOrRoleTooltip:
		"Veuillez fournir le nom du clinicien qui a ordonné vos tests génétiques ou du clinicien principal qui s'occupe de vos soins cliniques.",
} satisfies FormTooltipsDictionary;

export default dictionary;
