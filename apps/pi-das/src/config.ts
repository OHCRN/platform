import * as dotenv from 'dotenv';

export type AppConfig = {
	port: string;
};

export const getAppConfig = (): AppConfig => {
	dotenv.config();
	return {
		port: process.env.PORT || '8082',
	};
};
