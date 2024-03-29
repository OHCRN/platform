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
import axios from 'axios';

import { getAppConfig } from 'src/config';

import {
	axiosErrorInterceptor,
	axiosRequestInterceptor,
	axiosResponseInterceptor,
} from './axiosInterceptors';

const { CONSENT_API_URL, VERBOSE_AXIOS_LOGGING } = getAppConfig();
const AXIOS_CLIENT_NAME = 'consentApiClient';

const initAxiosClient = () => {
	console.info(`Initializing ${AXIOS_CLIENT_NAME}...`);
	return axios.create({
		baseURL: CONSENT_API_URL,
	});
};

const consentApiClient = initAxiosClient();

if (VERBOSE_AXIOS_LOGGING) {
	consentApiClient.interceptors.request.use(
		(request) => axiosRequestInterceptor(request, AXIOS_CLIENT_NAME),
		(error) => axiosErrorInterceptor(error, `${AXIOS_CLIENT_NAME} Request`),
	);

	consentApiClient.interceptors.response.use(
		(response) => axiosResponseInterceptor(response, AXIOS_CLIENT_NAME),
		(error) => axiosErrorInterceptor(error, `${AXIOS_CLIENT_NAME} Response`),
	);
}

export { consentApiClient };
