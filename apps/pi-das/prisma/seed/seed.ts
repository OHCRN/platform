import { PrismaClient } from '@/../../src/generated/client';
import logger from '@/../../src/logger';

import { participants } from './seed-data';

const prisma = new PrismaClient();

const seed = async () => {
	logger.info('Seeding database...');
	try {
		logger.info('Deleting existing participants...');
		await prisma.participant.deleteMany({});
		logger.info('Deleting existing participants...COMPLETE');

		logger.info('Creating new participants from seed data...');
		await prisma.participant.createMany({
			data: participants,
			skipDuplicates: true,
		});	
		logger.info('Creating new participants from seed data...COMPLETE');
	} catch (error) {
		logger.error('Error seeding database: ', error);
		await prisma.$disconnect();
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

seed();
