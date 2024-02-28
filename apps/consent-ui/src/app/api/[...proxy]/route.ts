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

import { NextRequest, NextResponse } from 'next/server';
import urlJoin from 'url-join';
import { AxiosHeaders } from 'axios';

import { getAppConfig } from 'src/config';
import { PROXY_API_PATH } from 'src/constants';
import { axiosProxyClient } from 'src/services/api';
import { getRequestData } from 'src/services/api/utils';

/**
 * Route handler for creating proxy requests from /api routes to public consent-api endpoints
 * @param req NextRequest obj
 * @param routePaths path params interpolated from app/api/[...proxy] directory structure
 * @returns response obj from consent-api as NextResponse
 */
const handler = async (
	req: NextRequest,
	routePaths: { params: { proxy: string[] } }, // "proxy" key matches the [...proxy] dynamic path
): Promise<NextResponse<any>> => {
	const { CONSENT_API_URL, CONSENT_UI_URL } = getAppConfig(process.env);
	const clientSideRootUrl = urlJoin(CONSENT_UI_URL, PROXY_API_PATH);
	if (!req?.url?.startsWith(clientSideRootUrl)) {
		// An http error status will trigger an AxiosError in the original ui request
		return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
	}
	const path = urlJoin(routePaths.params.proxy);
	const reqUrl = urlJoin(CONSENT_API_URL, path);
	const requestData = await getRequestData(req);
	// TODO: are there any other headers needed here?
	const headers = new AxiosHeaders();
	headers.set('Content-Type', 'application/json');
	// Don't forward cookies to the API:
	headers.set('Set-Cookie', '');
	const res = await axiosProxyClient(reqUrl, {
		method: req.method,
		headers,
		...(requestData && { data: requestData }),
	});

	const data = await res.data;
	return NextResponse.json(data);
};

export { handler as GET, handler as POST };
