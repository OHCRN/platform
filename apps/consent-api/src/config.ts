import * as dotenv from 'dotenv';

export const getAppConfig = () => {
	dotenv.config();
	return {
		port: process.env.PORT || '8080',
		recaptcha: {
			secretKey: process.env.RECAPTCHA_SECRET_KEY || 'MISSING_RECAPTCHA_SECRET_KEY',
		},
	};
};

export type AppConfig = ReturnType<typeof getAppConfig>;
