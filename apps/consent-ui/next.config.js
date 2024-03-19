/** @type {import('next').NextConfig} */

const routesByLocale = require('./src/i18n/routes/routesByLocale.json');

const nextConfig = {
	logging: {
		fetches: {
		  fullUrl: true,
		},
	},
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
	// use standalone build for Docker
	output: process.env.BUILD_STANDALONE === 'true' ? 'standalone' : undefined,
};

module.exports = nextConfig;
