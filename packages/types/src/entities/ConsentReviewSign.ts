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

import { ConsentQuestionId } from './ConsentQuestion.js';

export const ConsentReviewSignResponse = z.object({
	[ConsentQuestionId.enum.RELEASE_DATA__CLINICAL_AND_GENETIC]: z.object({
		// TODO: use schema from step 2
	}),
	[ConsentQuestionId.enum.RELEASE_DATA__DE_IDENTIFIED]: z.boolean(),
	[ConsentQuestionId.enum.RESEARCH_PARTICIPATION__FUTURE_RESEARCH]: z.boolean(),
	[ConsentQuestionId.enum.RESEARCH_PARTICIPATION__CONTACT_INFORMATION]: z.boolean(),
	[ConsentQuestionId.enum.RECONTACT__FUTURE_RESEARCH]: z.boolean(),
	[ConsentQuestionId.enum.RECONTACT__SECONDARY_CONTACT]: z
		.object({
			// TODO: use schema from step 4
		})
		.optional(), // if this data is not defined, they did not consent
});

export type ConsentReviewSignResponse = z.infer<typeof ConsentReviewSignResponse>;
export const ConsentReviewSignResponseSchema: SchemaObject =
	generateSchema(ConsentReviewSignResponse);
