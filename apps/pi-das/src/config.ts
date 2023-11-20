import * as dotenv from 'dotenv';

export const getAppConfig = () => {
	dotenv.config();
	return {
		isProduction: process.env.NODE_ENV === 'production',
		express: {
			port: process.env.PORT || '8081',
		},
	};
};

export type AppConfig = ReturnType<typeof getAppConfig>;
