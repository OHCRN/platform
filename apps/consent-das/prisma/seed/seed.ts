import logger from '../../src/logger.js';
import prisma from '../../src/prismaClient.js';

import { consentQuestions, participants, clinicianInvites } from './seed-data.js';

const seed = async () => {
	logger.info('Seeding database...');
	try {
		logger.info('Deleting existing participants...');
		await prisma.participant.deleteMany({});
		logger.info('Deleting existing participants...COMPLETE');

		logger.info('Deleting existing consent questions...');
		await prisma.consentQuestion.deleteMany({});
		logger.info('Deleting existing consent questions...COMPLETE');

		logger.info('Deleting existing clinician invites...');
		await prisma.clinicianInvite.deleteMany({});
		logger.info('Deleting existing clinician invites...COMPLETE');

		logger.info('Creating new participants from seed data...');
		await prisma.participant.createMany({
			data: participants,
			skipDuplicates: true,
		});
		logger.info('Creating new participants from seed data...COMPLETE');

		logger.info('Creating new consent questions from seed data...');
		await prisma.consentQuestion.createMany({
			data: consentQuestions,
			skipDuplicates: true,
		});
		logger.info('Creating new consent questions from seed data...COMPLETE');

		logger.info('Creating new clinician invites from seed data...');
		await prisma.clinicianInvite.createMany({
			data: clinicianInvites,
			skipDuplicates: true,
		});
		logger.info('Creating new clinician invites from seed data...COMPLETE');
	} catch (error) {
		logger.error('Error seeding database: ', error);
		await prisma.$disconnect();
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
};

seed();
