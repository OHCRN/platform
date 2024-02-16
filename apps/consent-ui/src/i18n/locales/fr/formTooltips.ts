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
	clinicianTitleOrRoleTooltip:
		"Veuillez fournir le nom du clinicien qui a ordonné vos tests génétiques ou du clinicien principal qui s'occupe de vos soins cliniques.",
	consentGroupTooltip: 'Cela déterminera si un tuteur doit être impliqué dans les consentements.',
	dateOfBirthTooltip:
		'Nous en avons besoin pour demander les informations cliniques du participant.',
	dateOfBirthTooltip2: 'Nous en avons besoin pour demander vos informations cliniques.',
	familyHistoryOfCancerTooltip:
		'Sélectionnez oui uniquement si le membre de la famille est : un parent, un frère ou une sœur, un enfant, une tante/un oncle ou des grands-parents.',
	guardianEmailAddressTooltip: 'Le tuteur recevra une invitation à ce compte.',
	guardianPhoneNumberTooltip:
		'Si nous les contactons, ce sera pour des mises à jour de santé et un consentement.',
	molecularLabNameTooltip:
		'Veuillez indiquer le nom du laboratoire qui a effectué vos tests génétiques, si vous le connaissez.',
	ohipCheckboxText: "Je n'ai pas de carte Santé de l'Ontario.",
	ohipTooltip:
		'Saisissez les 10 premiers chiffres de votre carte santé verte. Nous en avons besoin pour accéder à vos rapports de laboratoire.',
	participantEmailAddressTooltip: 'Le patient recevra une invitation sur ce compte.',
	participantFirstNameTooltip: 'Tel qu’il apparaît sur leur carte Santé.',
	participantLastNameTooltip: 'Tel qu’il apparaît sur leur carte Santé.',
	participantMiddleNameTooltip: 'Tel qu’il apparaît sur leur carte Santé.',
	participantPhoneNumberTooltip:
		'Si nous contactons le participant, ce sera pour des mises à jour de santé et son consentement.',
	participantPreferredNameTooltip:
		"Comment le participant aimerait-il être appelé lorsqu'il est contacté ?",
	primaryCancerDiagnosisTooltip:
		'Vous pouvez sélectionner plusieurs cancers pour lesquels vous avez reçu un diagnostic.',
	residentialPostalCodeTooltip:
		'Nous en avons besoin pour demander vos informations cliniques, celles-ci ne sont pas utilisées pour vous identifier ou identifier votre lieu de résidence.',
	sexAssignedAtBirthTooltip:
		'Le sexe attribué à la naissance peut aider à améliorer notre compréhension des causes et des risques de cancer.',
} satisfies FormTooltipsDictionary;

export default dictionary;
