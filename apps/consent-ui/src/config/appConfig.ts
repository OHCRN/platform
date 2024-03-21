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

import 'server-only';

import { defaultAppConfig, AppConfig } from 'src/config/types';

/**
 * Returns environment variables for server components
 * @returns {AppConfig}
 */
const getAppConfig = (): AppConfig => ({
	AUTH_DISABLED: process.env.AUTH_DISABLED === 'true' || defaultAppConfig.AUTH_DISABLED,
	CONSENT_API_URL: process.env.CONSENT_API_URL || defaultAppConfig.CONSENT_API_URL,
	CONSENT_UI_URL: process.env.CONSENT_UI_URL || defaultAppConfig.CONSENT_UI_URL,
	FEATURE_CONSENT_PDF_BUTTONS:
		process.env.FEATURE_CONSENT_PDF_BUTTONS === 'true' ||
		defaultAppConfig.FEATURE_CONSENT_PDF_BUTTONS,
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
