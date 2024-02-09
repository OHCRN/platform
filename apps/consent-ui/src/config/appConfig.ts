/*
 * Copyright (c) 2023 The Ontario Institute for Cancer Research. All rights reserved
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

export type AppConfig = {
	CONSENT_API_URL: string;
	CONSENT_UI_URL: string;
	FEATURE_FLAG: boolean;
	RECAPTCHA_SITE_KEY?: string;
	KEYCLOAK_ISSUER: string;
	KEYCLOAK_CLIENT_ID: string;
};

export const defaultAppConfig: AppConfig = {
	CONSENT_API_URL: 'http://localhost:8080',
	CONSENT_UI_URL: 'http://localhost:3000',
	FEATURE_FLAG: false,
	RECAPTCHA_SITE_KEY: undefined,
	KEYCLOAK_ISSUER: '', // should set this up to error on server start, if not provided
	KEYCLOAK_CLIENT_ID: '', // should set this up to error on server start, if not provided
};

/**
 * returns app config env vars
 * order of priority: server runtime > process.env build time > default
 */

const getAppConfig = (serverEnv: any): AppConfig => ({
	/**
	 * keep explicit style of: Server || Client to prevent errors with Next inlining build variables
	 */
	CONSENT_API_URL:
		serverEnv.CONSENT_API_URL || process.env.CONSENT_API_URL || defaultAppConfig.CONSENT_API_URL,
	CONSENT_UI_URL:
		serverEnv.CONSENT_UI_URL || process.env.CONSENT_UI_URL || defaultAppConfig.CONSENT_UI_URL,
	FEATURE_FLAG:
		serverEnv.FEATURE_FLAG === 'false'
			? false
			: serverEnv.FEATURE_FLAG === 'true' ||
				process.env.FEATURE_FLAG === 'true' ||
				defaultAppConfig.FEATURE_FLAG,
	RECAPTCHA_SITE_KEY:
		serverEnv.RECAPTCHA_SITE_KEY ||
		process.env.RECAPTCHA_SITE_KEY ||
		defaultAppConfig.RECAPTCHA_SITE_KEY,
	KEYCLOAK_ISSUER:
		serverEnv.AUTH_KEYCLOAK_ISSUER ||
		process.env.AUTH_KEYCLOAK_ISSUER ||
		defaultAppConfig.KEYCLOAK_ISSUER,
	KEYCLOAK_CLIENT_ID:
		serverEnv.AUTH_KEYCLOAK_ID ||
		process.env.AUTH_KEYCLOAK_ID ||
		defaultAppConfig.KEYCLOAK_CLIENT_ID,
});

export { getAppConfig };
