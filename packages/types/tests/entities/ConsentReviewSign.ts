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

import {
	ConsentQuestionId,
	InformedConsentRequest,
} from '../../src/entities/index.js';

describe('ConsentReviewSignResponse', () => {
	it('Must provide valid fields', () => {
		expect(
			InformedConsentRequest.safeParse({
				[ConsentQuestionId.enum.RELEASE_DATA__CLINICAL_AND_GENETIC]: {},
				[ConsentQuestionId.enum.RELEASE_DATA__DE_IDENTIFIED]: true,
				[ConsentQuestionId.enum.RESEARCH_PARTICIPATION__FUTURE_RESEARCH]: true,
				[ConsentQuestionId.enum.RESEARCH_PARTICIPATION__CONTACT_INFORMATION]: false,
				[ConsentQuestionId.enum.RECONTACT__FUTURE_RESEARCH]: true,
				[ConsentQuestionId.enum.RECONTACT__SECONDARY_CONTACT]: {}
			}).success,
		).true;
		expect(
			InformedConsentRequest.safeParse({
				[ConsentQuestionId.enum.RELEASE_DATA__CLINICAL_AND_GENETIC]: {},
				[ConsentQuestionId.enum.RELEASE_DATA__DE_IDENTIFIED]: false, // must be true
				[ConsentQuestionId.enum.RESEARCH_PARTICIPATION__FUTURE_RESEARCH]: true,
				[ConsentQuestionId.enum.RESEARCH_PARTICIPATION__CONTACT_INFORMATION]: true,
				[ConsentQuestionId.enum.RECONTACT__FUTURE_RESEARCH]: true,
				[ConsentQuestionId.enum.RECONTACT__SECONDARY_CONTACT]: {}
			}).success,
		).false;
		expect(
			InformedConsentRequest.safeParse({
				[ConsentQuestionId.enum.RELEASE_DATA__CLINICAL_AND_GENETIC]: {},
				[ConsentQuestionId.enum.RELEASE_DATA__DE_IDENTIFIED]: true,
				[ConsentQuestionId.enum.RESEARCH_PARTICIPATION__FUTURE_RESEARCH]: false,
				[ConsentQuestionId.enum.RESEARCH_PARTICIPATION__CONTACT_INFORMATION]: false,
				[ConsentQuestionId.enum.RECONTACT__FUTURE_RESEARCH]: false,
			}).success,
		).true;
		expect(
			InformedConsentRequest.safeParse({
				[ConsentQuestionId.enum.RELEASE_DATA__CLINICAL_AND_GENETIC]: {},
				[ConsentQuestionId.enum.RELEASE_DATA__DE_IDENTIFIED]: true,
				[ConsentQuestionId.enum.RESEARCH_PARTICIPATION__FUTURE_RESEARCH]: false,
				[ConsentQuestionId.enum.RESEARCH_PARTICIPATION__CONTACT_INFORMATION]: undefined, // should be defined
				[ConsentQuestionId.enum.RECONTACT__FUTURE_RESEARCH]: false,
			}).success,
		).false;
	});
});
