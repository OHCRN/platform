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

import * as dotenv from 'dotenv';

export interface AuthConfig {
	auth: {
		keycloakPublicKey: string;
	};
}

dotenv.config();
let authConfig: AuthConfig | undefined;

const fetchPublicKey = async (): Promise<string> => {
	try {
		if (process.env.KEYCLOAK_REALM_PATH) {
			const response = await fetch(process.env.KEYCLOAK_REALM_PATH);
			const result = await response.json();
			return `-----BEGIN PUBLIC KEY-----\n${result.public_key}\n-----END PUBLIC KEY-----`;
		}
		throw new Error('Keycloak public path not defined');
	} catch (err) {
		console.error(err);
		throw new Error('Failed to fetch public key');
	}
};

const buildAppConfig = async (publicKey: string): Promise<AuthConfig> => {
	console.info('Building auth config...');
	authConfig = {
		auth: {
			keycloakPublicKey: publicKey,
		},
	};
	return authConfig;
};

const getAuthConfig = async () => {
	if (authConfig !== undefined) {
		console.info('Auth config already defined, returning...');
		return authConfig;
	}
	if (process.env.AUTH_DISABLED === 'true') {
		return buildAppConfig('testPublicKey');
	}
	const publicKey = await fetchPublicKey();
	return buildAppConfig(publicKey);
};

export default getAuthConfig;
