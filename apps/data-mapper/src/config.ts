import * as dotenv from 'dotenv';

export type AppConfig = {
	port: string;
	piDasUrl: string;
	phiDasUrl: string;
	keysDasUrl: string;
	consentDasUrl: string;
};

export const getAppConfig = (): AppConfig => {
	dotenv.config();
	return {
		port: process.env.PORT || '8081',
		piDasUrl: process.env.PI_DAS_URL || 'http://localhost:8082',
		phiDasUrl: process.env.PHI_DAS_URL || 'http://localhost:8083',
		keysDasUrl: process.env.KEYS_DAS_URL || 'http://localhost:8084',
		consentDasUrl: process.env.CONSENT_DAS_URL || 'http://localhost:8085',
	};
};
