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
	BASE_URL: string;
	TEST_RUNTIME_VAR: string;
	PLATFORM_API_URL: string;
	FEATURE_FLAG: boolean;
	NEXT_IS_BUILDING: boolean;
};

export const defaultAppConfig = {
	BASE_URL: 'http://localhost:3000',
	TEST_RUNTIME_VAR: 'testingtesting',
	PLATFORM_API_URL: 'http://localhost:8080',
	FEATURE_FLAG: true,
	NEXT_IS_BUILDING: false,
};

const getAppConfig = (serverEnv: any): AppConfig => ({
	BASE_URL: serverEnv.BASE_URL || process.env.BASE_URL || defaultAppConfig.BASE_URL,
	TEST_RUNTIME_VAR:
		serverEnv.TEST_RUNTIME_VAR || process.env.TEST_RUNTIME_VAR || defaultAppConfig.TEST_RUNTIME_VAR,
	PLATFORM_API_URL:
		serverEnv.PLATFORM_API_URL || process.env.PLATFORM_API_URL || defaultAppConfig.PLATFORM_API_URL,
	FEATURE_FLAG:
		serverEnv.FEATURE_FLAG === 'false'
			? false
			: serverEnv.FEATURE_FLAG === 'true' ||
			  process.env.FEATURE_FLAG === 'true' ||
			  defaultAppConfig.FEATURE_FLAG,
	NEXT_IS_BUILDING:
		serverEnv.NEXT_IS_BUILDING === 'false'
			? false
			: serverEnv.NEXT_IS_BUILDING === 'true' ||
			  process.env.NEXT_IS_BUILDING === 'true' ||
			  defaultAppConfig.FEATURE_FLAG,
});

export default getAppConfig;
