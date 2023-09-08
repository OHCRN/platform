/** @type {import('next').NextConfig} */

const routesByLocale = require('./src/i18n/routes/routesByLocale.json');

const nextConfig = {
	async rewrites() {
		const locales = Object.keys(routesByLocale).filter((locale) => locale !== 'en');
		return locales.flatMap((locale) =>
			Object.entries(routesByLocale[locale])

				// No need to rewrite the root route
				.filter(([, routePath]) => routePath !== '/')

				// Rewrite the localized pathname to the equivalent route from "en"
				.map(([routeName, routePath]) => ({
					source: `/${locale}${routePath}`,
					destination: `/${locale}${routesByLocale.en[routeName]}`,
				})),
		);
	},
};

module.exports = nextConfig;
