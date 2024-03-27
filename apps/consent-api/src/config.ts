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

import getAuthConfig from './authConfig.js';

export function checkConfigValueIsDefined<T>(val: T | undefined | null, keyName: string): T {
	if (val === undefined || val === null || val === '') {
		throw new Error(`Value for ${keyName} is not defined`);
	}
	return val;
}

export type StaticAppConfig = {
	isProduction: boolean;
	dataMapperUrl: string;
	express: {
		port: string;
	};
	recaptcha: {
		secretKey: string;
	};
};

export type AppConfig = StaticAppConfig & {
	auth: {
		keycloakPublicKey: string;
	};
};

export const getStaticConfig = (): StaticAppConfig => {
	return {
		isProduction: process.env.NODE_ENV === 'production',
		dataMapperUrl: process.env.DATA_MAPPER_URL || 'http://localhost:8081',
		express: {
			port: process.env.PORT || '8080',
		},
		recaptcha: {
			secretKey: process.env.RECAPTCHA_SECRET_KEY || 'MISSING_RECAPTCHA_SECRET_KEY',
		},
	};
};

export const getAppConfig = async (): Promise<AppConfig> => {
	dotenv.config();
	const staticConfig = getStaticConfig();
	const authConfig = await getAuthConfig();
	return {
		...staticConfig,
		auth: {
			keycloakPublicKey: checkConfigValueIsDefined(
				authConfig?.auth.keycloakPublicKey || process.env.KEYCLOAK_PUBLIC_KEY || '',
				'auth.keycloakPublicKey',
			),
		},
	};
};
