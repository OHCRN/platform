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

import { RegisterPageDictionary } from 'src/i18n/locales/en/registerPage';

const dictionary = {
	alreadyRegistered: 'Déjà enregistré?',
	enrollInOhcrn:
		"Inscrivez-vous au registre de l'OHCRN et contribuez à faire progresser la recherche sur le syndrome du cancer héréditaire. Seules les personnes ayant subi des tests génétiques pour un syndrome de cancer héréditaire peuvent participer.",
	ifClinician: 'Si vous êtes clinicien :',
	login: 'Se connecter',
	participantRegistration: 'Inscription des participants',
	registerPatients: 'Enregistrez vos patients ici',
	registerYourself: 'Inscrivez-vous en tant que participant',
} satisfies RegisterPageDictionary;

export default dictionary;
