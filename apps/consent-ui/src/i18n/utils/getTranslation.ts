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
import { REGEX_FLAG_GLOBAL } from 'types/entities';

import { GetSingleTranslation, GetTranslation } from 'src/i18n/types';
import dictionaries from 'src/i18n/locales';

/**
 * ```
 * Util function that takes the parameters object passed in to the function returned from getTranslation()
 * and replaces the key in the translated string with the value of that key
 * Regex will ignore whitespace between the {{/}} and the tag, so {{key}} and {{ key }} and all other permutations of spaces are matched
 * Uses the global regex flag to ensure each instance of an argument key in a string is replaced
 *
 * ```
 * @param original
 * @param replacements
 * @returns string
 * @example
 * const dict = {
 * 	common: {
 * 		'sampleSentence': 'Translated this string on a {{dayOfWeek}} in {{ dayOfMonth }}.'
 * 	}
 * }
 * const translate = getTranslation('en')
 * translate('common', 'sampleSentence', { dayOfWeek: 'Thursday', dayOfMonth: 'October' }) would call replaceParams as:
 * replaceParams('Translated this string on a {{dayOfWeek}} in {{ dayOfMonth }}.', { dayOfWeek: 'Thursday', dayOfMonth: 'October' } )
 * // returns 'Translated this string on a Thursday in October.'
 */
const replaceParams = (
	original: string,
	replacements?: Record<string, string | number>,
): string => {
	return Object.entries(replacements || {}).reduce((acc, [key, value]) => {
		const tagRegex = new RegExp(`{{[\\s]*${key}[\\s]*}}`, REGEX_FLAG_GLOBAL);
		return acc.replace(tagRegex, String(value));
	}, original);
};

// TODO: is there a way to enforce this function for server side use only?
export const getTranslation: GetTranslation = (language) => {
	const dictionary = dictionaries[language];
	const translate: GetSingleTranslation = (namespace, key, params) => {
		// TODO: consider throwing error if translation not a string/undefined
		// Decide whether to have a UI error handler for this, and whether failure is at full page or component level
		// warning log and `|| ''` is currently provided as a stopgap
		if (!(dictionary && dictionary[namespace] && dictionary[namespace][key])) {
			console.warn(`Missing translation in ${language} dictionary!`);
		}
		const translation = `${dictionary[namespace][key] || ''}`;
		return replaceParams(translation, params);
	};

	return translate;
};
