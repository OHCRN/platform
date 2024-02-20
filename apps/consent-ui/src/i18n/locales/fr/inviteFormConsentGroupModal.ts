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

import { InviteFormConsentGroupModalDictionary } from '../en/inviteFormConsentGroupModal';

const dictionary = {
	actionButtonText: 'OK',
	adultConsent: 'Consentement adulte',
	adultConsentPoint1: '18 ans ou plus',
	adultConsentPoint2: 'a la capacité de donner son consentement',
	adultConsentSubstitute: "Consentement d'un adulte, recours à un mandataire spécial",
	adultConsentSubstitutePoint1: '18 ans ou plus',
	adultConsentSubstitutePoint2: "n'a pas la capacité de donner son consentement",
	adultConsentSubstitutePoint3:
		"la décision au nom d'autrui donne le consentement au nom du participant",
	adultConsentSubstitutePoint4: 'documentation disponible pour aider le mandataire spécial',
	guardianConsent: "Consentement du tuteur d'un mineur",
	guardianConsentAssent: "Consentement du tuteur d'un mineur (y compris le consentement)",
	guardianConsentAssentPoint1: 'le plus souvent entre 12 et 15 ans',
	guardianConsentAssentPoint2: 'évalué par le clinicien étant en mesure de donner son assentiment',
	guardianConsentAssentPoint3: 'consentement fourni par un parent ou un tuteur',
	guardianConsentPoint1: 'consentement fourni par le parent ou le tuteur',
	guardianConsentPoint2: 'évalué par leur clinicien comme ne nécessitant pas de consentement',
	guardianConsentPoint3: 'le plus souvent moins de 12 ans',
	title: 'Groupes de consentement',
	youngAdultConsent: 'Consentement du jeune adulte',
	youngAdultConsentPoint1: 'le plus souvent entre 16 et 18 ans',
	youngAdultConsentPoint2:
		'évalué par leur clinicien comme ayant la capacité de donner leur consentement',
} satisfies InviteFormConsentGroupModalDictionary;

export default dictionary;
