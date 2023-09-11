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

'use client';

import { ReactNode, createContext, useContext } from 'react';

import { AppConfig } from '@/getAppConfig';

const defaultContextValues = {
	BASE_URL: 'http://localhost:3000',
	TEST_RUNTIME_VAR: 'testingtesting',
	CONSENT_API_URL: 'http://localhost:8080',
	FEATURE_FLAG: true,
	NEXT_IS_BUILDING: false,
};

const AppConfigContext = createContext(defaultContextValues as AppConfig);

export const AppConfigProvider = ({
	children,
	config,
}: {
	children: ReactNode;
	config: AppConfig;
}) => {
	return <AppConfigContext.Provider value={config}>{children}</AppConfigContext.Provider>;
};

// export const useAppConfigContext = () => useContext(AppConfigContext);

export const useAppConfigContext = () => {
	const currentContext = useContext(AppConfigContext);
	return currentContext;
};

// without this component wrapping, we can't divide into Server + Client parts
// a context provider, React.context etc needs to be a client component
const AppConfig = ({ children, config }: { children: ReactNode; config: AppConfig }) => (
	<AppConfigProvider config={config}>{children}</AppConfigProvider>
);

export default AppConfig;
