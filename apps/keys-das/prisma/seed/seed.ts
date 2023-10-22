import logger from '../../src/logger.js';
import prisma from '../../src/prismaClient.js';

import { clinicalProfileKeys, ohipKeys } from './seed-data.js';

const seed = async () => {
	logger.info('Seeding database...');
	try {
		logger.info('Deleting existing OHIP keys...');
		await prisma.ohipKey.deleteMany({});
		logger.info('Deleting existing OHIP keys...COMPLETE');

		logger.info('Deleting existing clinical profile keys...');
		await prisma.clinicalProfileKey.deleteMany({});
		logger.info('Deleting existing clinical profile keys...COMPLETE');

		logger.info('Creating new OHIP keys from seed data...');
		await prisma.ohipKey.createMany({
			data: ohipKeys,
			skipDuplicates: true,
		});
		logger.info('Creating new OHIP keys from seed data...COMPLETE');

		logger.info('Creating new clinical profile keys from seed data...');
		await prisma.clinicalProfileKey.createMany({
			data: clinicalProfileKeys,
			skipDuplicates: true,
		});
		logger.info('Creating new clinical profile keys from seed data...COMPLETE');
	} catch (error) {
		logger.error('Error seeding database: ', error);
		await prisma.$disconnect();
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
};

seed();
