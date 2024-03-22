import * as dotenv from 'dotenv';

export const getAppConfig = () => {
	dotenv.config();
	return {
		isProduction: process.env.NODE_ENV === 'production',
		dataMapperUrl: process.env.DATA_MAPPER_URL || 'http://localhost:8081',
		express: {
			port: process.env.PORT || '8080',
		},
		recaptcha: {
			secretKey: process.env.RECAPTCHA_SECRET_KEY || 'MISSING_RECAPTCHA_SECRET_KEY',
		},
		// TODO: retrieve public key from keycloak and save on server start
		auth: {
			keycloakPublicKey: process.env.KEYCLOAK_PUBLIC_KEY || '',
		},
	};
};

export type AppConfig = ReturnType<typeof getAppConfig>;
