import * as dotenv from 'dotenv';

export const getAppConfig = () => {
	dotenv.config();
	return {
		isProduction: process.env.NODE_ENV === 'production',
		express: {
			port: process.env.PORT || '8081',
		},
		piDasUrl: process.env.PI_DAS_URL || 'http://localhost:8082',
		phiDasUrl: process.env.PHI_DAS_URL || 'http://localhost:8083',
		keysDasUrl: process.env.KEYS_DAS_URL || 'http://localhost:8084',
		consentDasUrl: process.env.CONSENT_DAS_URL || 'http://localhost:8085',
	};
};

export type AppConfig = ReturnType<typeof getAppConfig>;
