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

import { describe, expect, it, vi, afterAll } from 'vitest';
import request from 'supertest';
import { ErrorName } from 'types/httpErrors';

import App from '../../src/index.js';
import { getAppConfig } from '../../src/config.js';

const { REQUEST_VALIDATION_ERROR } = ErrorName;

const mocks = vi.hoisted(() => {
	// vi.mock() gets 'hoisted' to the top of the file, so need to declare variables used in any vi.mock() here
	// read more in the docs: https://vitest.dev/api/vi#vi-mock
	const inviteRequest = {
		clinicianFirstName: 'Rubeus',
		clinicianLastName: 'Hagrid',
		clinicianInstitutionalEmailAddress: 'rubeus.hagrid@example.com',
		clinicianTitleOrRole: 'Physician',
		participantFirstName: 'Harry',
		participantLastName: 'Potter',
		participantEmailAddress: 'harry.potter@example.com',
		participantPhoneNumber: '3111972720',
		participantPreferredName: 'The Chosen One',
		consentGroup: 'GUARDIAN_CONSENT_OF_MINOR',
		guardianName: 'Sirius Black',
		guardianPhoneNumber: '2465930649',
		guardianEmailAddress: 'sirius.black@example.com',
		guardianRelationship: 'Guardian',
		consentToBeContacted: true,
	};

	const inviteResponse = {
		id: 'xPBqVJfAAAh6CJzluFuZQ',
		inviteSentDate: '2023-11-22T00:00:00.000Z',
		inviteAccepted: false,
		...inviteRequest,
	};
	return { inviteRequest, inviteResponse };
});

vi.mock('../../src/services/create.js', () => {
	// mock the createInvite service so we don't need to make an API call to data-mapper
	return { createInvite: () => ({ status: 'SUCCESS', data: mocks.inviteResponse }) };
});
// TODO: can remove when env vars setup in jenkins is figured out, find out why setting RECAPTCHA_SECRET_KEY wont work
vi.stubEnv('NODE_ENV', 'development');

describe('POST /invites', () => {
	afterAll(() => {
		vi.restoreAllMocks();
		vi.unstubAllEnvs();
	});

	it('Valid request - makes a POST request to data-mapper and returns created invite with id, inviteAccepted, and inviteSentDate', async () => {
		const appConfig = getAppConfig();
		const response = await request(App(appConfig)).post('/invites').send({
			data: mocks.inviteRequest,
		});

		expect(response.status).toEqual(201);
		expect(response.body).toStrictEqual(mocks.inviteResponse);
	});

	it('Invalid request - missing consentToBeContacted should return RequestValidationError', async () => {
		const appConfig = getAppConfig();
		const response = await request(App(appConfig))
			.post('/invites')
			.send({
				data: { ...mocks.inviteRequest, consentToBeContacted: undefined },
			});

		expect(response.status).toEqual(400);
		expect(response.error);
		if (response.error) {
			const errorResponse = JSON.parse(response.error.text);
			expect(errorResponse.error).toStrictEqual(REQUEST_VALIDATION_ERROR);
		}
	});
});
