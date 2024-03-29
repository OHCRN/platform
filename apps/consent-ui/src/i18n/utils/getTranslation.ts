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
import 'server-only';

import dictionaries from 'src/i18n/locales';
import { GetTranslation, TranslateKey, TranslateNamespace } from 'src/i18n/types';

import { replaceParams } from './replaceParams';

/**
 * @param language ValidLanguage
 * @exports {translate, translateNamespace}
 */
export const getTranslation: GetTranslation = (language) => {
	const dictionary = dictionaries[language];

	/**
	 * Translate one key from a namespace.
	 * @param namespace
	 * @param key
	 * @param params
	 * @returns string
	 * @example
	 * <span>{translate('common', 'copyright', { year: 2024 })}</span>
	 * // returns 'Copyright 2024'
	 */
	const translate: TranslateKey = (namespace, key, params): string => {
		// TODO: consider throwing error if translation not a string/undefined
		// Decide whether to have a UI error handler for this, and whether failure is at full page or component level
		// warning log and `|| ''` is currently provided as a stopgap
		if (!(dictionary && namespace && key)) {
			console.warn(`Missing translation in ${language} dictionary!`);
		}
		const translation = `${dictionary[namespace][key] || ''}`;
		return replaceParams(translation, params);
	};

	/**
	 * Translate an entire namespace, e.g. to collect all translations
	 *  for a client component, such as a form.
	 * @param namespace
	 * @example
	 * const formDict = translateNamespace('myFormDictionary');
	 * <MyForm formDict={formDict} />
	 */
	const translateNamespace: TranslateNamespace = (namespace) => {
		if (!(dictionary && namespace)) {
			console.warn(`Missing translation in ${language} dictionary!`);
		}
		return dictionary[namespace];
	};

	return { translate, translateNamespace };
};
