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

import { AxiosError, AxiosResponse } from 'axios';
import { APIStatus } from 'common/src/service/Status';

import { API, baseAPI } from '@/constants';
import { getAppClientConfig } from '@/components/AppConfigContextProvider/utils';
import getAppConfig from '@/getAppConfig';

const getAPIStatus = async () => {
	const appClientConfig = await getAppClientConfig();
	const { CONSENT_API_URL } = getAppConfig(appClientConfig);

	return await baseAPI
		.get(API.STATUS, { baseURL: CONSENT_API_URL })
		.then((res: AxiosResponse<APIStatus>) => {
			return res.data;
		})
		.catch((err: AxiosError<APIStatus>) => {
			console.error('Unable to receive consent-api status ⛔️: ', err);
			// we can decide on some custom error response, instead of just throwing an error and catching
			// so we have something to display in the case of an error
			const errorRes: APIStatus = {
				version: '',
				status: 'API fetch failed',
			};
			return errorRes;
		});
};

export default getAPIStatus;
