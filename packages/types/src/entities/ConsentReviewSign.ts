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
import { ConsentReleaseDataResponse } from './ConsentReleaseData.js';
import { ConsentResearchParticipationResponse } from './ConsentResearchParticipation.js';
import { ConsentRecontactBase, hasRequiredSecondaryContactInfo } from './ConsentRecontact.js';

const {
	RELEASE_DATA__DE_IDENTIFIED,
	RESEARCH_PARTICIPATION__FUTURE_RESEARCH,
	RECONTACT__FUTURE_RESEARCH,
} = ConsentQuestionId.enum;

export const ConsentReviewSignResponse = z.object({
	releaseOfHealthData: ConsentReleaseDataResponse.omit({
		[RELEASE_DATA__DE_IDENTIFIED]: true,
	}),
	deIdentifiedResearchParticipation: ConsentReleaseDataResponse.pick({
		[RELEASE_DATA__DE_IDENTIFIED]: true,
	}),
	optionalDecentralizedBiobank: ConsentResearchParticipationResponse.pick({
		[RESEARCH_PARTICIPATION__FUTURE_RESEARCH]: true,
	}),
	optionalReleaseOfContactInformation: ConsentResearchParticipationResponse.omit({
		[RESEARCH_PARTICIPATION__FUTURE_RESEARCH]: true,
	}),
	optionalRecontact: ConsentRecontactBase.pick({
		[RECONTACT__FUTURE_RESEARCH]: true,
	}),
	optionalSecondaryContact: ConsentRecontactBase.omit({
		[RECONTACT__FUTURE_RESEARCH]: true,
	}).refine((input) => {
		const {
			RECONTACT__SECONDARY_CONTACT,
			secondaryContactFirstName,
			secondaryContactLastName,
			secondaryContactPhoneNumber,
		} = input;

		return hasRequiredSecondaryContactInfo({
			requireSecondaryContactInfo: RECONTACT__SECONDARY_CONTACT,
			secondaryContactFirstName,
			secondaryContactLastName,
			secondaryContactPhoneNumber,
		});
	}),
});

export type ConsentReviewSignResponse = z.infer<typeof ConsentReviewSignResponse>;
export const ConsentReviewSignResponseSchema: SchemaObject =
	generateSchema(ConsentReviewSignResponse);
