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

import { describe, expect, it, vi, afterAll, beforeAll } from 'vitest';
import request from 'supertest';
import { ErrorName } from 'types/httpResponses';

import App from '../../src/index.js';
import { getAppConfig } from '../../src/config.js';
import { mockEnv } from '../config.js';

const { REQUEST_VALIDATION_ERROR } = ErrorName;

// TODO: add a test with isGuardian: true
const mocks = vi.hoisted(() => {
	const createParticipantRequest = {
		participantOhipFirstName: 'James',
		participantOhipLastName: 'Bond',
		participantEmailAddress: 'james007@example.com',
		participantPhoneNumber: '0123456789',
		// guardianEmailAddress: undefined,
		// guardianName: undefined,
		// guardianPhoneNumber: undefined,
		// guardianRelationship: undefined,
		dateOfBirth: new Date('1954-03-09'),
		participantPreferredName: 'Jimmy',
		keycloakId: 'ef25babd-9d01-48a1-a03e-268be937ed1a',
		// inviteId: undefined,
		currentLifecycleState: 'REGISTERED',
		consentGroup: 'ADULT_CONSENT',
		emailVerified: false,
		isGuardian: false,
		consentToBeContacted: true,
	};

	const createParticipantResponse = {
		id: 'skdkCD1lBpC7Rn1WzwBPL',
		...createParticipantRequest,
		dateOfBirth: createParticipantRequest.dateOfBirth.toDateString(),
	};

	const createParticipant = () => ({ status: 'SUCCESS', data: mocks.createParticipantResponse });

	const VALID_IDS = ['skdkCD1lBpC7Rn1WzwBPL'];

	return { createParticipantRequest, createParticipantResponse, createParticipant, VALID_IDS };
});

vi.mock('../../src/services/create.js', () => {
	return { createParticipant: mocks.createParticipant };
});

describe('POST /participants', () => {
	beforeAll(() => mockEnv());
	afterAll(() => {
		vi.restoreAllMocks();
		vi.unstubAllEnvs();
	});

	it('Valid request - makes a POST request to data-mapper and returns created participant with id', async () => {
		const appConfig = getAppConfig();
		const response = await request(App(appConfig))
			.post('/participants')
			.send({ data: mocks.createParticipantRequest });

		expect(response.status).toEqual(201);
		expect(response.body).toStrictEqual(mocks.createParticipantResponse);
	});

	it('Invalid request - false consentToBeContacted should return RequestValidationError', async () => {
		const appConfig = getAppConfig();
		const response = await request(App(appConfig))
			.post('/participants')
			.send({ data: { ...mocks.createParticipantRequest, consentToBeContacted: false } });

		expect(response.status).toEqual(400);
		expect(response.error);
		if (response.error) {
			const errorResponse = JSON.parse(response.error.text);
			expect(errorResponse.error).toStrictEqual(REQUEST_VALIDATION_ERROR);
		}
	});
});
