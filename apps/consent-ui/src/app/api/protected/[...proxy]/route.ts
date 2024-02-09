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

import { getAppConfig } from 'src/config';
import { PROXY_PROTECTED_API_PATH } from 'src/constants';

import { auth } from '../../../auth';

const handler = async (req: Request, paths: { params: { proxy: string[] } }) => {
	console.log('In protected route handler: ', paths.params.proxy);
	const { CONSENT_API_URL, CONSENT_UI_URL } = getAppConfig(process.env);
	let path = '';
	const clientSideRootUrl = urlJoin(CONSENT_UI_URL, PROXY_PROTECTED_API_PATH);
	if (req.url.startsWith(clientSideRootUrl)) {
		path = req.url.replace(clientSideRootUrl, '');
	} else {
		return Response.json({ status: 400, error: 'Bad request' });
	}
	const reqUrl = urlJoin(CONSENT_API_URL, path);
	console.log('REQ URL: ', reqUrl);
	const res = await fetch(reqUrl, {
		method: req.method,
		headers: {
			'Content-Type': 'application/json',
		},
	});
	console.log('RES STATUS: ', res.status);
	const data = await res.json();
	console.log('DATA:', data);
	return Response.json({ data });

	// const session = await auth(req, res);
	// if (session) {
	// 	// Do something with the session
	// 	return res.json('This is protected content.');
	// }
	// res.status(401).json('You must be signed in.');
	// const session = await getServerSession(req, res, getAuthOptions(req));

	// console.info(`protected proxy - proxing to target:${target} path:${path}`);

	// if (session?.account?.accessToken) {
	// 	req.headers['Authorization'] = 'Bearer ' + decryptContent(session?.account?.accessToken);
	// }

	// Don't forward cookies to the API:
	// req.headers.cookie = '';
};

export { handler as GET, handler as POST };
