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

import { GetDictionary, GetTranslation } from '@/i18n/types';
import { defaultLanguage, defaultNamespace } from '@/i18n/settings';

// these will only reload on page refresh (server only) or lang change
const dictionaries: GetDictionary = {
	en: (namespace) =>
		import(`../locales/en/${namespace}.json`).then((module) => {
			return module.default;
		}),
	fr: (namespace) =>
		import(`../locales/fr/${namespace}.json`).then((module) => {
			return module.default;
		}),
};

export const getTranslation: GetTranslation = async (
	language = defaultLanguage,
	namespace = defaultNamespace,
) => {
	const dictionary = await dictionaries[language](namespace);
	return (key: string, params?: { [key: string]: string | number }) => {
		let translation = dictionary[key];
		// TODO: use this for nested keys, not sure if we will use this approach? namespaces may be sufficient
		// .split('.')
		// .reduce((obj, key) => obj && obj[key], dictionary);

		// Use Object.hasOwn() to check instead of !translation to prevent false negatives for empty strings
		if (!Object.hasOwn(dictionary, key)) {
			// TODO: add error handling/default values for missing translations
			console.error(
				`Could not find "${language}" translation for key "${key}" in namespace "${namespace}"`,
			);
			return key;
		}
		// for interpolation
		if (params && Object.entries(params).length) {
			Object.entries(params).forEach(([key, value]) => {
				translation = translation!.replace(`{{ ${key} }}`, String(value));
			});
		}
		return translation;
	};
};
