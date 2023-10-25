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

import { describe, expect, it } from 'vitest';

import { ParticipantResponse } from '../../src/entities/index.js';

describe('ParticipantResponse', () => {
	it('Must have a consent question', () => {
		expect(
			ParticipantResponse.safeParse({
				id: 'zT0RErVqQEj3kac3bazBA',
				consentQuestionId: 'Minim culpa ullamco laborum enim consequat?',
				participantId: 'Mnnaygsae2ix7J33stdVQ',
				response: true,
			}).success,
		).true;
		expect(
			ParticipantResponse.safeParse({
				id: 'ZgpLk1KlxsQIkTdp7RJTP',
				consentQuestionId: undefined,
				participantId: '0v2jwozojfDVQAXIMZJfs',
				response: true,
			}).success,
		).false;
	});
	it('Must have a response', () => {
		expect(
			ParticipantResponse.safeParse({
				id: 'k41qGV4Y8b5eL6UuMwHlG',
				consentQuestionId: 'Sunt amet irure officia Lorem ullamco ex?',
				participantId: '5yW4tMaJMVef7rbpcUTF',
				response: undefined,
			}).success,
		).false;
	});
});
