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

import { NanoId } from './NanoId.js';
import { ConsentQuestionId } from './ConsentQuestion.js';

export const ParticipantResponse = z.object({
	id: NanoId,
	consentQuestionId: ConsentQuestionId,
	participantId: NanoId,
	response: z.boolean(),
});

export type ParticipantResponse = z.infer<typeof ParticipantResponse>;

export const ParticipantResponseArray = z.array(ParticipantResponse);
export type ParticipantResponseArray = z.infer<typeof ParticipantResponseArray>;
export const ParticipantResponseArraySchema: SchemaObject =
	generateSchema(ParticipantResponseArray);

const SORT_ORDERS = ['asc', 'desc'] as const;
export const SortOrder = z.enum(SORT_ORDERS);
export type SortOrder = z.infer<typeof SortOrder>;
export const SortOrderSchema: SchemaObject = generateSchema(SortOrder);

export const ParticipantResponsesRequest = ParticipantResponse.pick({
	consentQuestionId: true,
	participantId: true,
}).extend({
	sortOrder: SortOrder.default('desc'),
});

export type ParticipantResponsesRequest = z.infer<typeof ParticipantResponsesRequest>;
