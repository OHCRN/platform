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

// TODO: separate name into two fields with + without whitespace, include French chars in both
export const NAME_REGEX = /^[A-Za-z\s]+$/;
export const NANOID_REGEX = new RegExp(`^[A-Za-z0-9]{${NANOID_LENGTH}}$`);
export const OHIP_NUMBER_REGEX = new RegExp(`^[0-9]{${OHIP_NUMBER_LENGTH}}$`);
export const PHONE_NUMBER_REGEX = new RegExp(`^[0-9]{${PHONE_NUMBER_LENGTH}}$`);
export const POSTAL_CODE_REGEX = /^[A-Za-z][0-9][A-Za-z][0-9][A-Za-z][0-9]$/;

export const REGEX_FLAG_GLOBAL = 'g';

/** check for empty strings or whitespace */
const EmptyString = z.string().trim().max(0);

/**
 * Makes a Zod schema for regexes, that enforces a string type and trims whitespace.
 * Also handles optional field validation for UI (allows empty strings and whitespace)
 * and API (doesn't allow empty strings or whitespace).
 * @param regex regular expression
 * @example getRegexSchema(NAME_REGEX).optionalUI
 */
export const getRegexSchema = (regex: RegExp) => {
	const regexSchema = z.string().trim().regex(regex);
	return {
		optionalAPI: regexSchema.optional(),
		optionalUI: regexSchema.or(EmptyString).optional(),
		required: regexSchema,
	};
};
