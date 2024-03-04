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

import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export const axiosRequestInterceptor = (
	request: InternalAxiosRequestConfig,
	axiosClientName: string,
) => {
	console.log(
		`${axiosClientName || 'Axios'} Request:`,
		JSON.stringify(
			{
				url: request.url,
				method: request.method,
				headers: request.headers,
				params: request.params,
				data: request.data,
			},
			null,
			2,
		),
	);
	return request;
};

export const axiosResponseInterceptor = (response: AxiosResponse, axiosClientName: string) => {
	console.log(
		`${axiosClientName || 'Axios'} Response:`,
		JSON.stringify(
			{
				status: response.status,
				statusText: response.statusText,
				headers: response.headers,
				data: response.data,
			},
			null,
			2,
		),
	);
	return response;
};

export const axiosErrorInterceptor = (error: any, axiosClientName: string) => {
	console.error(`${axiosClientName || 'Axios'} Error:`, error);
	return error;
};
