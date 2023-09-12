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

const BUILD_TIME_VARIABLES = {
	RUNTIME_CONFIG_URL: urlJoin(
		process.env.CONSENT_UI_URL || 'http://localhost:3000',
		'api',
		'config',
	),
};

export async function getAppClientConfig() {
	// get environment variables for client components (AppConfig context provider)
	// cache: "no-store" ensures it's run server side
	// fetch isn't actually doing anything except forcing server side render
	// it's a "blocking" data call
	// this is a server component so we have full access to process.env and can get vars from here
	// url cannot be root - will cause infinite loop
	try {
		const configResp = await fetch(BUILD_TIME_VARIABLES.RUNTIME_CONFIG_URL, {
			// this should fail during build
			next: { revalidate: 0 }, // cache no-store still not working, throws "dynamic server usage" error
		}).then((resp) => resp.json());
		return configResp;
	} catch (e) {
		if (process.env.NEXT_IS_BUILDING === 'true') {
			console.log(
				"Failed to retrieve server runtime config. Colocated api route won't be available during build.",
			);
		} else {
			console.error(e);
		}
		// AppConfigContextProvider will provide defaultAppConfig
		return {};
	}
}
