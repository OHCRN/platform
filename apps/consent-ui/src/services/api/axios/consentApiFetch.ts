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

import { AxiosHeaders, AxiosRequestConfig } from 'axios';
import { Session } from 'next-auth';

import { consentApiClient } from 'src/services/api';

import { decryptContent } from '../utils';

const baseAxiosConfig: AxiosRequestConfig = {
	headers: {
		'Content-Type': 'application/json',
	},
};

const consentApiFetch = async ({
	url,
	method,
	session,
	body,
}: {
	url: string;
	method: AxiosRequestConfig['method'];
	session?: Session | null;
	body?: AxiosRequestConfig['data'];
}) => {
	const headers = new AxiosHeaders();
	if (session?.account.accessToken) {
		console.log('have session');
		const decryptedToken = decryptContent(session.account.accessToken);
		headers.setAuthorization(`Bearer ${decryptedToken}`);
	}
	return consentApiClient({
		...baseAxiosConfig,
		headers: { ...baseAxiosConfig.headers, ...headers },
		url,
		method,
		data: body,
	});
};

export default consentApiFetch;
