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

import { expect } from 'chai';
import { z } from 'zod';

import {
	ConsentQuestionId,
	ResearchParticipationRequest,
	ResearchParticipationResponse,
} from '../../src/entities/index.js';

describe('ResearchParticipationRequest', () => {
	it('Must use a boolean', () => {
		expect(
			ResearchParticipationRequest.safeParse({
				[ConsentQuestionId.enum.RESEARCH_PARTICIPATION__CONTACT_INFORMATION]: z.boolean(),
				[ConsentQuestionId.enum.RESEARCH_PARTICIPATION__FUTURE_RESEARCH]: z.boolean(),
			}).success,
		).true;
		expect(
			ResearchParticipationRequest.safeParse({
				[ConsentQuestionId.enum.RESEARCH_PARTICIPATION__CONTACT_INFORMATION]:
					'Laborum pariatur commodo',
				[ConsentQuestionId.enum.RESEARCH_PARTICIPATION__FUTURE_RESEARCH]: 67,
			}).success,
		).false;
		expect(
			ResearchParticipationRequest.safeParse({
				[ConsentQuestionId.enum.RESEARCH_PARTICIPATION__CONTACT_INFORMATION]: null,
				[ConsentQuestionId.enum.RESEARCH_PARTICIPATION__FUTURE_RESEARCH]: null,
			}).success,
		).false;
		expect(
			ResearchParticipationRequest.safeParse({
				[ConsentQuestionId.enum.RESEARCH_PARTICIPATION__CONTACT_INFORMATION]: undefined,
				[ConsentQuestionId.enum.RESEARCH_PARTICIPATION__FUTURE_RESEARCH]: undefined,
			}).success,
		).false;
	});
});

describe('ResearchParticipationResponse', () => {
	it('Must use a boolean', () => {
		expect(
			ResearchParticipationResponse.safeParse({
				[ConsentQuestionId.enum.RESEARCH_PARTICIPATION__CONTACT_INFORMATION]: z.boolean(),
				[ConsentQuestionId.enum.RESEARCH_PARTICIPATION__FUTURE_RESEARCH]: z.boolean(),
			}).success,
		).true;
		expect(
			ResearchParticipationResponse.safeParse({
				[ConsentQuestionId.enum.RESEARCH_PARTICIPATION__CONTACT_INFORMATION]:
					'Laborum pariatur commodo',
				[ConsentQuestionId.enum.RESEARCH_PARTICIPATION__FUTURE_RESEARCH]: 67,
			}).success,
		).false;
		expect(
			ResearchParticipationResponse.safeParse({
				[ConsentQuestionId.enum.RESEARCH_PARTICIPATION__CONTACT_INFORMATION]: null,
				[ConsentQuestionId.enum.RESEARCH_PARTICIPATION__FUTURE_RESEARCH]: null,
			}).success,
		).false;
		expect(
			ResearchParticipationResponse.safeParse({
				[ConsentQuestionId.enum.RESEARCH_PARTICIPATION__CONTACT_INFORMATION]: undefined,
				[ConsentQuestionId.enum.RESEARCH_PARTICIPATION__FUTURE_RESEARCH]: undefined,
			}).success,
		).false;
	});
});
