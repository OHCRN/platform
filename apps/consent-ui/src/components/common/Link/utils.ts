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

import routesByLocale from 'src/i18n/routes/routesByLocale.json';
import { RouteName, RouteNameEnum, RouteParams } from 'src/components/common/Link/types';
import { ValidLanguage } from 'src/i18n';
import { supportedLanguages } from 'src/i18n/settings';

export const getUnselectedLang = (lang: ValidLanguage): ValidLanguage => {
	return supportedLanguages.filter((l) => l !== lang)[0];
};

export const findRouteNameByPath = (
	routes: { [k: string]: string },
	path: string,
): string | undefined => {
	const keys = Object.keys(routes);
	return keys.find((key: string) => routes[key] === path);
};

/**
 * Finds the route name defined in routesByLocale.json by path value. If no name is found, returns 'home'
 * @param {string} path - the current path
 * @param {ValidLanguage} lang - the current language
 * @returns {RouteName} - the name of the route in the allowed routes, defined in routesByLocale.json
 *
 * @example
 * // returns 'register'
 * getLinkNameByPath('/fr/inscription', 'fr')
 */
export const getLinkNameByPath = (path: string, lang: ValidLanguage): RouteName => {
	if (!path) {
		return 'home';
	}
	const pathSegments = path.split('/');
	const newPath = pathSegments.slice(2).join('/');
	const result = findRouteNameByPath(routesByLocale[lang], `/${newPath}`);
	try {
		const validRoute = RouteNameEnum.parse(result);
		return validRoute;
	} catch (e) {
		console.error(`Invalid route name: ${result} from path: "${path}"`);
		return 'home';
	}
};

/**
 * Replaces the expected parameters in the url with those provided in the LocalizedLink params prop
 * @param {string} href - the href of the link
 * @param {RouteParams} params - the provided parameters object
 * @returns {string} - the updated href
 *
 * @example
 * // returns '/invite/123'
 * addParamsToUrl('/invite/:id', { id: '123' })
 */
export const addParamsToUrl = (href: string, params: RouteParams) => {
	Object.keys(params).forEach((param) => {
		href = href.replace(new RegExp(':' + param, 'g'), params[param]);
	});
	return href;
};
