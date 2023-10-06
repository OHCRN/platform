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

import urlJoin from 'url-join';

import { defaultAppConfig, getAppConfig } from 'src/config';

const BUILD_TIME_VARIABLES = {
	// Next.js local API route for the blocking data fetch
	BLOCKING_FETCH_URL: urlJoin(
		process.env.CONSENT_UI_URL || 'http://localhost:3000',
		'api',
		'status',
	),
};

/**
 * Get environment variables for Client Components (i.e. AppConfigContext)

 * This is a workaround to expose runtime env vars to the client. We make
 * a dummy fetch call which forces the code to be run server side, and
 * then access and expose process.env to the client.
 */
export async function getClientAppConfig() {
	try {
		// Dummy fetch call to block the variables from being set at build time
		const appConfig = await fetch(BUILD_TIME_VARIABLES.BLOCKING_FETCH_URL, {
			// Opt-out of Next.js caching, forcing the fetch to run server side
			// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#opting-out-of-data-caching
			next: { revalidate: 0 },
		}).then(() => {
			// Since this is a Server Component, we have access to process.env
			// Take advantage of this to expose the env vars to the client
			return getAppConfig(process.env);
		});
		return appConfig;
	} catch (e) {
		// Next.js local API is unavailable during build time
		if (process.env.NEXT_IS_BUILDING === 'true') {
			console.log('Attempted to fetch server runtime config during build. Skipping...');
		} else {
			console.error(e);
		}
		// Provide defaultAppConfig during builds
		return defaultAppConfig;
	}
}
