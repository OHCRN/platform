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
import { JWT } from 'next-auth/jwt';
import Keycloak from 'next-auth/providers/keycloak';
import { NextResponse } from 'next/server';
import urlJoin from 'url-join';

import { getLinkNameByPath } from 'src/components/common/Link/utils';
import { getAppConfig } from 'src/config';
import { ValidLanguage } from 'src/i18n';
import { PUBLIC_ROUTES } from 'src/components/common/Link/types';

import { encryptContent, decryptContent } from '../services/api/utils';

declare module 'next-auth' {
	interface User {
		preferredUsername: string | null;
	}

	interface Session {
		account: {
			accessToken: string;
			idToken: string;
		};
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		account: {
			access_token: string;
			id_token: string;
		};
		profile: {
			preferred_username: string | null;
			email: string;
		};
		exp?: number;
	}
}

async function doFinalSignoutHandshake(jwt: JWT) {
	try {
		const { id_token } = jwt.account;
		const { KEYCLOAK_ISSUER, KEYCLOAK_CLIENT_ID } = getAppConfig(process.env);
		// Add the id_token_hint to the query string
		const decryptedIdToken = decryptContent(id_token);
		const params = new URLSearchParams();
		params.append('id_token_hint', decryptedIdToken);
		params.append('client_id', KEYCLOAK_CLIENT_ID);
		const logoutUrl = `${KEYCLOAK_ISSUER}/protocol/openid-connect/logout?${params.toString()}`;
		const { status, statusText } = await axios.get(logoutUrl);

		// The response body should contain a confirmation that the user has been logged out
		console.info('Completed post-logout handshake', status, statusText);
	} catch (e: any) {
		console.error('Unable to perform post-logout handshake', (e as any)?.code || e);
	}
}

export const authConfig = {
	providers: [Keycloak],
	session: {
		strategy: 'jwt',
		maxAge: getAppConfig(process.env).TOKEN_MAX_AGE,
	},
	callbacks: {
		jwt: ({ token, account, profile, trigger }) => {
			// account contains access_token, id_token and refresh_token from Keycloak
			// account is only available on signIn
			if (trigger === 'signIn') {
				if (account?.access_token && account.id_token) {
					const encryptedAccessToken = encryptContent(account.access_token);
					const encryptedIdToken = encryptContent(account.id_token);
					token.account = {
						access_token: encryptedAccessToken,
						id_token: encryptedIdToken,
					};
					// copy the expiry from the original keycloak token
					token.exp = account.expires_at; // unix timestamp
					// overrides the settings in NextAuth.session
					token.profile = {
						preferred_username: profile?.preferred_username || '',
						email: profile?.email || '',
					};
				}
			}
			return token;
		},
		session: async ({ session, token }) => {
			// add token properties here so they are available to the session
			const tokenProperties = {
				accessToken: token?.account?.access_token,
				idToken: token?.account?.id_token,
				exp: token.exp, // TODO: is any manual handling of expiry needed, between Keycloak and NextAuth session?
			};
			session.account = tokenProperties;
			session.user = {
				...session.user,
				email: session.user.email || token.profile.email,
				preferredUsername: token.profile.preferred_username,
			};
			// session.expires is a date string
			return session;
		},
		authorized: ({ auth, request: { nextUrl } }) => {
			const urlLang = nextUrl.pathname.split('/').filter((item) => item !== '')[0];
			const parsedLang = ValidLanguage.safeParse(urlLang);
			const currentLang = parsedLang.success ? parsedLang.data : ValidLanguage.enum.en;
			const pathByName = getLinkNameByPath(nextUrl.pathname, currentLang);
			// TODO: is it necessary to check session expiry here or does next-auth clear expired sessions automatically?
			if (PUBLIC_ROUTES.includes(pathByName) || auth?.user) {
				return true;
			} else {
				console.log('not authorized to see this route');
				const sessionExpiredUri = new URL(urlJoin(nextUrl.origin, currentLang));
				sessionExpiredUri.searchParams.append('session_expired', 'true');
				return NextResponse.redirect(sessionExpiredUri.href);
			}
		},
	},
	events: {
		// ts error coming from next-auth lib
		// TS Property 'token' does not exist on type '{ session: void | Awaitable<AdapterSession | null | undefined>; } | { token: Awaitable<JWT | null>; }
		// @ts-expect-error error TS2339
		async signOut({ token }) {
			return await doFinalSignoutHandshake(token);
		},
	},
} satisfies NextAuthConfig;
