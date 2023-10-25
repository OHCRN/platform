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

import { FooterDictionary } from 'src/i18n/locales/en/footer';

const dictionary = {
	'oicr-logo-alt': 'Link to OICR Home',
	'instagram-logo-alt': 'Link to Instagram',
	'twitter-logo-alt': 'Link to Twitter',
	'on-govt-logo-alt': 'Link to Ontario Government Home',
	'overture-alt': 'Link to Overture Home',
	'github-alt': 'Link to GitHub',
	about: 'à Propos de OHCRN',
	help: "Centre d'Aide",
	contact: 'Contacter',
	privacy: 'Politique de Confidentialité',
	terms: 'Termes & Conditions',
	copyright: '© {{ year }} Ontario Hereditary Cancer Research Network. Tous droits réservés.',
	'ohcrn-registry': 'Registre OHCRN {{ registryVersion }}',
	'powered-by': 'Propulsé par',
	api: 'API {{ apiVersion }}',
} satisfies FooterDictionary;

export default dictionary;