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
	AUTH_DISABLED: boolean;
	CONSENT_API_URL: string;
	CONSENT_PDF_URL_EN: string;
	CONSENT_PDF_URL_FR: string;
	CONSENT_UI_URL: string;
	OHCRN_EMAIL?: string;
	OHCRN_HOME_LINK?: string;
	RECAPTCHA_SITE_KEY?: string;
	KEYCLOAK_ISSUER: string;
	KEYCLOAK_CLIENT_ID: string;
	TOKEN_ENCRYPTION_KEY: string;
	TOKEN_MAX_AGE: number;
	VERBOSE_AXIOS_LOGGING: boolean;
};

export const defaultAppConfig: AppConfig = {
	AUTH_DISABLED: false,
	CONSENT_API_URL: 'http://localhost:8080',
	CONSENT_PDF_URL_EN: '',
	CONSENT_PDF_URL_FR: '',
	CONSENT_UI_URL: 'http://localhost:3000',
	OHCRN_EMAIL: '',
	OHCRN_HOME_LINK: '',
	RECAPTCHA_SITE_KEY: undefined,
	KEYCLOAK_ISSUER: '', // TODO: should set this up to error on server start, if not provided
	KEYCLOAK_CLIENT_ID: '', // TODO:  should set this up to error on server start, if not provided
	TOKEN_ENCRYPTION_KEY: '',
	TOKEN_MAX_AGE: 3600,
	VERBOSE_AXIOS_LOGGING: false,
};

/**
 * Returns environment variables for server components
 * @returns {AppConfig}
 */
// TODO: enforce server-only usage. To be completed as a follow-up to https://github.com/OHCRN/platform/issues/422
const getAppConfig = (): AppConfig => ({
	AUTH_DISABLED: process.env.AUTH_DISABLED === 'true' || defaultAppConfig.AUTH_DISABLED,
	CONSENT_API_URL: process.env.CONSENT_API_URL || defaultAppConfig.CONSENT_API_URL,
	CONSENT_PDF_URL_EN: process.env.CONSENT_PDF_URL_EN || defaultAppConfig.CONSENT_PDF_URL_EN,
	CONSENT_PDF_URL_FR: process.env.CONSENT_PDF_URL_FR || defaultAppConfig.CONSENT_PDF_URL_FR,
	CONSENT_UI_URL: process.env.CONSENT_UI_URL || defaultAppConfig.CONSENT_UI_URL,
	OHCRN_EMAIL: process.env.OHCRN_EMAIL || defaultAppConfig.OHCRN_EMAIL,
	OHCRN_HOME_LINK: process.env.OHCRN_HOME_LINK || defaultAppConfig.OHCRN_HOME_LINK,
	RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY || defaultAppConfig.RECAPTCHA_SITE_KEY,
	KEYCLOAK_ISSUER: process.env.AUTH_KEYCLOAK_ISSUER || defaultAppConfig.KEYCLOAK_ISSUER,
	KEYCLOAK_CLIENT_ID: process.env.AUTH_KEYCLOAK_ID || defaultAppConfig.KEYCLOAK_CLIENT_ID,
	TOKEN_ENCRYPTION_KEY: process.env.TOKEN_ENCRYPTION_KEY || defaultAppConfig.TOKEN_ENCRYPTION_KEY,
	TOKEN_MAX_AGE: Number(process.env.TOKEN_MAX_AGE) || defaultAppConfig.TOKEN_MAX_AGE,
	VERBOSE_AXIOS_LOGGING:
		process.env.VERBOSE_AXIOS_LOGGING === 'true' || defaultAppConfig.VERBOSE_AXIOS_LOGGING,
});

export { getAppConfig };
