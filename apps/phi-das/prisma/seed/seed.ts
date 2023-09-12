import { PrismaClient } from '../../src/generated/client';
import logger from '../../src/logger';

import { ohipData } from './seed-data';

const prisma = new PrismaClient();

const seed = async () => {
	logger.info('Seeding database...');
	try {
		logger.info('Deleting existing OHIP data...');
		await prisma.ohip.deleteMany({});
		logger.info('Deleting existing OHIP data...COMPLETE');

		logger.info('Creating new OHIP data from seed data...');
		await prisma.ohip.createMany({
			data: ohipData,
			skipDuplicates: true,
		});	
		logger.info('Creating new OHIP data from seed data...COMPLETE');
	} catch (error) {
		logger.error('Error seeding database: ', error);
		await prisma.$disconnect();
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

seed();
