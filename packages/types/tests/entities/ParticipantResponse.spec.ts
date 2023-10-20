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

import { ParticipantResponse } from '../../src/entities/index.js';

describe('ParticipantResponse', () => {
	it('Must have a consent question', () => {
		expect(
			ParticipantResponse.safeParse({
				id: 'CVCFbeKH2Njl1G41vCQm',
				consentQuestionId: 'Minim culpa ullamco laborum enim consequat?',
				participantId: 'Mnnaygsae2ix7J33stdVQ',
				response: true,
			}).success,
		).true;
		expect(
			ParticipantResponse.safeParse({
				id: 'Ki3JMgZNnaQdYcJEbLDyh',
				consentQuestionId: undefined,
				participantId: '0v2jwozojfDVQAXIMZJfs',
				response: true,
			}).success,
		).false;
	});
	it('Must have a response', () => {
		expect(
			ParticipantResponse.safeParse({
				id: 'qjVNbQwUdWmddU8AyLoJn',
				consentQuestionId: 'Sunt amet irure officia Lorem ullamco ex?',
				participantId: '5yW4tMaJMVef7r_bpcUTF',
				response: undefined,
			}).success,
		).false;
	});
});
