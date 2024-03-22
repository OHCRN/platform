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

import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedErrorResponse } from 'types/httpResponses';

import { getAppConfig } from '../config.js';
import serviceLogger from '../logger.js';

const logger = serviceLogger.forModule('Auth');
// eslint-disable-next-line import/no-named-as-default-member
const { verify } = jwt;

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Express {
		interface Request {
			keycloakId?: string;
		}
	}
}

const decodeToken = (publicKey: string, token: string) => {
	const decoded = verify(token, publicKey, { algorithms: ['RS256'] });
	if (typeof decoded == 'string' || decoded === null) {
		throw Error('Invalid JWT format');
	} else {
		return decoded;
	}
};

const parseBearerToken = (token?: string): string => {
	return token && token.startsWith('Bearer ') ? token.replace('Bearer ', '') : '';
};

/**
 * Router middleware to ensure the incoming request includes a valid access token in the Authorization header.
 * When added to a router, it is expected that the incoming request has a header containing a valid access token
 * in the JWT Bearer format. Any request missing this token or with an invalid token will be rejected with an HTTP 401 status.
 *
 * If the token is valid, the "sub" value from the decoded token will be added to the Request object as the "keycloakId"
 *
 * @example
 * ```
 * router.post('/', withAuth, async (req, res) => {
 * 	// handle request knowing it has passed JWT verification of the access token
 * }
 * ```
 *
 * @param req
 * @param res
 * @param next
 */
const withAuth: RequestHandler = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	const accessToken = parseBearerToken(authHeader);
	const {
		auth: { keycloakPublicKey },
	} = getAppConfig();
	try {
		const verifiedToken = decodeToken(keycloakPublicKey, accessToken);
		// add the sub to the Request obj as keycloakId
		req.keycloakId = verifiedToken.sub;
		return next();
	} catch (e: unknown) {
		if (e instanceof Error) {
			logger.error('Invalid JWT', e.message);
		}
		// there are no scopes related to the consent portal so auth validation will always return 401 on error
		return res.status(401).json(UnauthorizedErrorResponse());
	}
};

export default withAuth;
