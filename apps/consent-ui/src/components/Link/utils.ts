import routesByLocale from '@/i18n/routes/routesByLocale.json';
import { RouteName, RouteNameEnum, RouteParams } from '@/components/Link/types';
import { ValidLanguage } from '@/i18n';
import { supportedLanguages } from '@/i18n/settings';

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
		console.error(`Invalid route name: ${result}`);
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
