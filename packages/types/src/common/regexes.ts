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

import z from 'zod';

import { NANOID_LENGTH, OHIP_NUMBER_LENGTH, PHONE_NUMBER_LENGTH } from './lengthConstraints.js';
import { EmptyStringOrWhitespace } from './String.js';

// TODO: separate name into two fields with + without whitespace, include French chars in both
export const NAME_REGEX = /^[A-Za-z\s]+$/;
export const NANOID_REGEX = new RegExp(`^[A-Za-z0-9]{${NANOID_LENGTH}}$`);
export const OHIP_NUMBER_REGEX = new RegExp(`^[0-9]{${OHIP_NUMBER_LENGTH}}$`);
export const PHONE_NUMBER_REGEX = new RegExp(`^[0-9]{${PHONE_NUMBER_LENGTH}}$`);
export const POSTAL_CODE_REGEX = /^[A-Za-z][0-9][A-Za-z][0-9][A-Za-z][0-9]$/;

export const REGEX_FLAG_GLOBAL = 'g';

/**
 * Make a Zod schema for a regular expression, for required fields.
 */
export const getRegexSchema = (regex: RegExp) => {
	const regexSchema = z.string().trim().regex(regex);
	return regexSchema;
};

/**
 * Make a Zod schema for a regular expression, for optional fields in the API.
 * The resulting schema will allow inputs that match the regex, and undefined values.
 */
export const getRegexOptionalAPISchema = (regex: RegExp) => {
	const regexOptionalAPISchema = getRegexSchema(regex).optional();
	return regexOptionalAPISchema;
};

/**
 * Makes a Zod schema for a regular expression, for optional fields in the UI.
 * Allows fields that match the regex, undefined values, and
 * empty or whitespace-only strings, because empty HTML inputs contain empty strings
 * rather than undefined values.
 */
export const getRegexOptionalUISchema = (regex: RegExp) => {
	const regexOptionalUISchema = getRegexSchema(regex).or(EmptyStringOrWhitespace).optional();
	return regexOptionalUISchema;
};
