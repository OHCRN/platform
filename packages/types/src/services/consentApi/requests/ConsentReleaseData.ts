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
import { generateSchema } from '@anatine/zod-openapi';
import type { SchemaObject } from 'openapi3-ts/oas31';

import { hasRequiredOhipInfo } from '../../../common/index.js';
import { ConsentReleaseDataBase, OhipInfo } from '../../../entities/index.js';
import { ConsentQuestionId } from '../../../entities/ConsentQuestion.js';

const { RELEASE_DATA__CLINICAL_AND_GENETIC, RELEASE_DATA__DE_IDENTIFIED } = ConsentQuestionId.enum;

export const ConsentReleaseDataRequest = z.intersection(
	ConsentReleaseDataBase.extend({
		[RELEASE_DATA__CLINICAL_AND_GENETIC]: z.literal(true),
		[RELEASE_DATA__DE_IDENTIFIED]: z.literal(true),
	}),
	OhipInfo.refine(hasRequiredOhipInfo),
);
export type ConsentReleaseDataRequest = z.infer<typeof ConsentReleaseDataRequest>;
export const ConsentReleaseDataRequestSchema: SchemaObject =
	generateSchema(ConsentReleaseDataRequest);
