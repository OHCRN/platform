import { PrismaClient } from '../../src/generated/client';
import logger from '../../src/logger';

import { ohipKeys } from './seed-data';

const prisma = new PrismaClient();

const seed = async () => {
	logger.info('Seeding database...');
	try {
		logger.info('Deleting existing OHIP keys...');
		await prisma.ohipKey.deleteMany({});
		logger.info('Deleting existing OHIP keys...COMPLETE');

		logger.info('Creating new OHIP keys from seed data...');
		await prisma.ohipKey.createMany({
			data: ohipKeys,
			skipDuplicates: true,
		});	
		logger.info('Creating new OHIP keys from seed data...COMPLETE');
	} catch (error) {
		logger.error('Error seeding database: ', error);
		await prisma.$disconnect();
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

seed();
