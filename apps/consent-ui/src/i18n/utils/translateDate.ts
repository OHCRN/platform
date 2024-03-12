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

import { format as formatDate } from 'date-fns';

import { ValidLanguage } from '..';

// English rules:
// - Month before day
const dateFormatEn = {
	numerical: 'MM/dd/y', // 12/03/2024
};

// French rules:
// - Day before month
const dateFormatFr = {
	numerical: 'dd/MM/y', // 03/12/2024
} satisfies typeof dateFormatEn;

const dateFormat: Record<ValidLanguage, typeof dateFormatEn> = {
	en: dateFormatEn,
	fr: dateFormatFr,
};

type DateFormat = keyof typeof dateFormatEn;

type TranslateDate = (date: Date, lang: ValidLanguage, format: DateFormat) => string;

/** Convert a Date object into human-readable format, translated and formatted for the given language.
 * @param date Date
 * @param lang ValidLanguage
 * @param format DateFormat
 * @returns string
 * @example translateDate(new Date('12/04/2024'), 'fr', 'numerical');
 * // returns '04/12/2024'
 */
export const translateDate: TranslateDate = (date, lang, format = 'numerical') => {
	const translatedDate = formatDate(date, dateFormat[lang][format]);
	return translatedDate;
};
