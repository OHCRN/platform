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

import { z } from 'zod';

import { Name, OptionalName, OptionalPhoneNumber, PhoneNumber } from './fields/index.js';

export const GuardianBaseFields = z.object({
	guardianEmailAddress: z.string().email().optional(),
	guardianName: OptionalName,
	guardianPhoneNumber: OptionalPhoneNumber,
	guardianRelationship: OptionalName,
});

export type GuardianBaseFields = z.infer<typeof GuardianBaseFields>;

// export as plain object to work with zod .extend()
export const GuardianNullableResponseFields = {
	guardianName: Name.nullable().transform((input) => input ?? undefined),
	guardianPhoneNumber: PhoneNumber.nullable().transform((input) => input ?? undefined),
	guardianEmailAddress: z
		.string()
		.email()
		.nullable()
		.transform((input) => input ?? undefined),
	guardianRelationship: Name.nullable().transform((input) => input ?? undefined),
};
