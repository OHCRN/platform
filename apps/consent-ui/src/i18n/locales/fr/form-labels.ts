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

const dictionary = {
	'clinician-first-name': 'Prénom du clinicien',
	'clinician-institutional-email-address': 'Adresse e-mail institutionnelle du clinicien',
	'clinician-last-name': 'Surnom du clinicien',
	'clinician-role': 'Rôle du clinicien',
	'clinician-title': 'Titre du clinicien',
	'consent-contact': 'Consentement à être contacté',
	'consent-group': 'Groupe de consentement',
	'first-name': 'Prénom',
	'guardian-email': 'Addresse e-mail du gardien',
	'guardian-name': 'Nom du gardien',
	'guardian-phone': 'Numéro de téléphone du gardien',
	'guardian-relationship': 'Relation du gardien avec le participant',
	'last-name': 'Nom de famille',
	'preferred-name': 'Nom préféré',
	email: 'Adresse e-mail',
	phone: 'Numéro de téléphone',
} satisfies Record<string, string>;

export type FormsDictionary = Record<keyof typeof dictionary, string>;

export default dictionary;
