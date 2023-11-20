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

import { ConsentWizardDictionary } from '../en/consent-wizard';

const dictionary = {
	heading: 'OHCRN Formulaires de consentement',
	subheading:
		"Pour être pleinement inscrit à l'OHCRN, veuillez remplir tous les champs obligatoires et soumettre le formulaire.",
	INFORMED_CONSENT: '1. Consentement éclairé',
	CONSENT_RELEASE_DATA: '2. Consentement à la divulgation de données',
	CONSENT_RESEARCH_PARTICIPATION: '3. Consentement à la participation à la recherche',
	CONSENT_RECONTACT: '4. Consentement à la reprise de contact',
	CONSENT_REVIEW_SIGN: '5. Examen et signature',
	'mobile-progress-header': 'Étape {{currentStep}} sur {{stepCount}}',
	'tablet-progress-header': 'Étape {{step}}',
} satisfies ConsentWizardDictionary;

export default dictionary;
