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

import { z } from 'zod';
import { generateSchema } from '@anatine/zod-openapi';
import type { SchemaObject } from 'openapi3-ts/oas31';

import { ConsentQuestionId, Name, PhoneNumber } from './index.js';

export const ConsentRecontactBase = z
	.object({
		[ConsentQuestionId.enum.RECONTACT__FUTURE_RESEARCH]: z.boolean(),
		[ConsentQuestionId.enum.RECONTACT__SECONDARY_CONTACT]: z.boolean(),
		secondaryContactFirstName: Name.optional(),
		secondaryContactLastName: Name.optional(),
		secondaryContactPhoneNumber: PhoneNumber.optional(),
	})
	.refine((input) => {
		const requireSecondaryContactInfo =
			input[ConsentQuestionId.enum.RECONTACT__SECONDARY_CONTACT] === true;
		const allSecondaryContactInfoDefined =
			input.secondaryContactFirstName !== undefined &&
			input.secondaryContactLastName !== undefined &&
			input.secondaryContactPhoneNumber !== undefined;
		return requireSecondaryContactInfo ? allSecondaryContactInfoDefined : true;
	});

export const ConsentRecontactRequest = ConsentRecontactBase;
export type ConsentRecontactRequest = z.infer<typeof ConsentRecontactRequest>;
export const ConsentRecontactRequestSchema: SchemaObject = generateSchema(ConsentRecontactRequest);

export const ConsentRecontactResponse = ConsentRecontactBase;
export type ConsentRecontactResponse = z.infer<typeof ConsentRecontactResponse>;
export const ConsentRecontactResponseSchema: SchemaObject =
	generateSchema(ConsentRecontactResponse);
