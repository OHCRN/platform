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

import { defaultAppConfig } from 'src/config';

/**
 * Environment variables exposed to client components via AppConfigContext
 *
 * Note: this config is exposed to the client, so it should not contain any sensitive information
 */
export type ClientAppConfig = {
	CONSENT_API_URL: string;
	CONSENT_PDF_URL_EN: string;
	CONSENT_PDF_URL_FR: string;
	CONSENT_UI_URL: string;
	OHCRN_EMAIL?: string;
	OHCRN_HOME_LINK?: string;
	RECAPTCHA_SITE_KEY?: string;
};

export const defaultClientAppConfig: ClientAppConfig = {
	CONSENT_API_URL: defaultAppConfig.CONSENT_API_URL,
	CONSENT_UI_URL: defaultAppConfig.CONSENT_UI_URL,
	CONSENT_PDF_URL_EN: defaultAppConfig.CONSENT_PDF_URL_EN,
	CONSENT_PDF_URL_FR: defaultAppConfig.CONSENT_PDF_URL_FR,
	OHCRN_EMAIL: defaultAppConfig.OHCRN_EMAIL,
	OHCRN_HOME_LINK: defaultAppConfig.OHCRN_HOME_LINK,
	RECAPTCHA_SITE_KEY: defaultAppConfig.RECAPTCHA_SITE_KEY,
};

/**
 * Returns environment variables for client components
 *
 * Note: intended for **SERVER COMPONENTS ONLY**. Access these values from the client using the `useAppConfigContext` hook.
 * @returns {ClientAppConfig}
 */
// TODO: enforce server-only usage. To be completed as a follow-up to https://github.com/OHCRN/platform/issues/422
const getClientAppConfig = (): ClientAppConfig => ({
	CONSENT_API_URL: process.env.CONSENT_API_URL || defaultAppConfig.CONSENT_API_URL,
	CONSENT_PDF_URL_EN: process.env.CONSENT_PDF_URL_EN || defaultAppConfig.CONSENT_PDF_URL_EN,
	CONSENT_PDF_URL_FR: process.env.CONSENT_PDF_URL_FR || defaultAppConfig.CONSENT_PDF_URL_FR,
	CONSENT_UI_URL: process.env.CONSENT_UI_URL || defaultAppConfig.CONSENT_UI_URL,
	OHCRN_EMAIL: process.env.OHCRN_EMAIL || defaultAppConfig.OHCRN_EMAIL,
	OHCRN_HOME_LINK: process.env.OHCRN_HOME_LINK || defaultAppConfig.OHCRN_HOME_LINK,
	RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY || defaultAppConfig.RECAPTCHA_SITE_KEY,
});

export { getClientAppConfig };
