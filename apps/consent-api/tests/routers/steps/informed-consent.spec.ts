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

import { describe, expect, it, vi, afterAll, beforeAll } from 'vitest';
import request from 'supertest';

import { mockEnv } from '../../config.js';
import App from '../../../src/index.js';
import { getAppConfig } from '../../../src/config.js';
import { ROUTER_PATH as InformedConsentPath } from '../../../src/routers/steps/informedConsent.js';

const mocks = vi.hoisted(() => {
	const informedConsentResponses = {
		INFORMED_CONSENT__READ_AND_UNDERSTAND: true,
	};

	const getInformedConsentResponses = () => ({
		status: 'SUCCESS',
		data: mocks.informedConsentResponses,
	});

	return { informedConsentResponses, getInformedConsentResponses };
});

vi.mock('../../../src/services/search.js', () => {
	return { getInformedConsentResponses: mocks.getInformedConsentResponses };
});

describe(`GET ${InformedConsentPath}`, () => {
	beforeAll(() => mockEnv());
	afterAll(() => {
		vi.restoreAllMocks();
		vi.unstubAllEnvs();
	});

	it('Valid request - makes a GET request to data-mapper and returns most recent participant responses for Informed Consent step', async () => {
		const appConfig = getAppConfig();
		const response = await request(App(appConfig)).get(InformedConsentPath);

		expect(response.status).toEqual(200);
		expect(response.body).toStrictEqual(mocks.informedConsentResponses);
	});
});
