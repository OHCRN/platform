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

import { AxiosHeaders, AxiosRequestConfig, Method } from 'axios';
import { Session } from 'next-auth';

import { consentApiClient } from 'src/services/api';

import { decryptContent } from '../utils';

const baseAxiosConfig: AxiosRequestConfig = {
	headers: {
		'Content-Type': 'application/json',
	},
};

/**
 * Base function for requests to Consent API
 * @param body Request data
 * @param headers AxiosHeaders. These will override/extend the default headers
 * @param method HTTP method
 * @param session Next-Auth session object
 * @param url Request URL as a string. Will be appended to the configured baseURL
 * @returns Promise containing an Axios request
 */
const consentApiFetch = async ({
	body,
	headers,
	method,
	session,
	url,
}: {
	body?: AxiosRequestConfig['data'];
	headers?: AxiosHeaders;
	method: Method;
	session?: Session | null;
	url: string;
}) => {
	const reqHeaders = new AxiosHeaders(headers);
	if (session?.account.accessToken) {
		const decryptedToken = decryptContent(session.account.accessToken);
		reqHeaders.setAuthorization(`Bearer ${decryptedToken}`);
	}
	return consentApiClient({
		...baseAxiosConfig,
		data: body,
		headers: { ...baseAxiosConfig.headers, ...reqHeaders },
		method,
		url,
	});
};

export default consentApiFetch;
