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

import urlJoin from 'url-join';
import { NextRequest, NextResponse } from 'next/server';
import { AxiosHeaders } from 'axios';

import { auth } from 'src/app/auth';
import { decryptContent, getRequestData } from 'src/services/api/utils';
import { consentApiClient } from 'src/services/api';

/**
 * Route handler for creating authenticated proxy requests from /api routes to protected consent-api endpoints
 * @param req NextRequest obj
 * @param routePaths path params interpolated from app/api/protected/[...proxy] directory structure
 * @returns response from consent-api
 */
const handler = async (
	req: NextRequest,
	routePaths: { params: { proxy: string[] } }, // "proxy" key matches the [...proxy] dynamic path
): Promise<NextResponse> => {
	const session = await auth();
	// check for existence of a session before attempting a request to consent-api
	// consent-api will also have its own auth middleware to verify sessions
	if (!session?.user) {
		// TODO: should this redirect, if user tries to access a protected resource while unauthorized
		return NextResponse.json({ error: 'You must be signed in' }, { status: 401 });
	} else {
		const path = urlJoin(routePaths.params.proxy);

		const requestData = await getRequestData(req);
		// TODO: are there any other headers needed here?
		const headers = new AxiosHeaders();
		headers.set('Content-Type', 'application/json');
		// Don't forward cookies to the API:
		headers.set('Set-Cookie', '');
		if (session.account.accessToken) {
			const decryptedToken = decryptContent(session.account.accessToken);
			headers.setAuthorization(`Bearer ${decryptedToken}`);
		}
		const res = await consentApiClient(path, {
			method: req.method,
			headers,
			...(requestData && { data: requestData }),
		});

		const data = await res.data;
		return NextResponse.json(data);
	}
};

export { handler as GET, handler as POST, handler as PATCH };
