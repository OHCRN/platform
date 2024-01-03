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

import { FormCalloutsDictionary } from '../en/formCallouts';

const dictionary = {
	clinicianInstitutionalEmailAddressCallout:
		'Nous en avons besoin pour confirmer votre autorité à enregistrer des patients.',
	consentGroupCallout: 'Cela déterminera si un tuteur doit être impliqué dans les consentements.',
	guardianEmailAddressCallout: 'Le tuteur recevra une invitation à ce compte.',
	guardianPhoneNumberCallout:
		'Si nous les contactons, ce sera pour des mises à jour de santé et un consentement.',
	participantEmailAddressCallout: 'Le patient recevra une invitation sur ce compte.',
	participantFirstNameCallout:
		"Inscrivez le prénom du participant tel qu'il apparaît sur sa carte Santé.",
	participantLastNameCallout:
		"Entrez le nom de famille du participant tel qu'il apparaît sur sa carte Santé.",
	participantPhoneNumberCallout:
		'Si nous les contactons, ce sera pour des mises à jour de santé et un consentement.',
	participantPreferredNameCallout:
		"Comment le participant aimerait-il être appelé lorsqu'il est contacté ?",
} satisfies FormCalloutsDictionary;

export default dictionary;
