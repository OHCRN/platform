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
import { NextAuthConfig } from 'next-auth';
import Keycloak from 'next-auth/providers/keycloak';
import { NextResponse } from 'next/server';

import { getLinkNameByPath } from 'src/components/common/Link/utils';
import { getAppConfig } from 'src/config';

async function doFinalSignoutHandshake(jwt: any) {
	const { id_token } = jwt;
	const { KEYCLOAK_ISSUER, KEYCLOAK_CLIENT_ID } = getAppConfig(process.env);
	try {
		// Add the id_token_hint to the query string
		const params = new URLSearchParams();
		params.append('id_token_hint', id_token);
		params.append('client_id', KEYCLOAK_CLIENT_ID);
		const logoutUrl = `${KEYCLOAK_ISSUER}/protocol/openid-connect/logout?${params.toString()}`;
		const { status, statusText } = await axios.get(logoutUrl);

		// The response body should contain a confirmation that the user has been logged out
		console.log('Completed post-logout handshake', status, statusText);
	} catch (e: any) {
		console.error('Unable to perform post-logout handshake', (e as any)?.code || e);
	}
}

const openRouteNames = ['home', 'invite', 'register'];
export const authConfig = {
	providers: [Keycloak],
	callbacks: {
		jwt: async ({ token, user, account, profile, trigger }) => {
			console.log('jwt callback');
			if (trigger === 'signIn') {
				if (account) {
					// copy the expiry from the original keycloak token
					// overrides the settings in NextAuth.session
					token.exp = account.expires_at;
					token.id_token = account.id_token;
				}
			}

			return token;
		},
		session: ({ session }) => {
			console.log('session callback');
			return session;
		},
		authorized: ({ auth, request: { nextUrl } }) => {
			console.log('Authorized callback');
			// it does work to handle protected routes here. is this the best place for it?
			// also, you would need a good way to detect the current language.
			// could accomplish that via a lang header or looking at the path
			const pathByName = getLinkNameByPath(nextUrl.pathname, 'en');
			console.log('pathByName: ', pathByName);
			if (openRouteNames.includes(pathByName)) {
				return true;
			} else {
				console.log('not authorized to see this route');
				return NextResponse.redirect('http://localhost:3000/en?session_expired=true');
			}
		},
	},
	events: {
		async signOut({ session, token }) {
			await doFinalSignoutHandshake(token);
		},
	},
	session: {
		strategy: 'jwt',
	},
} satisfies NextAuthConfig;
