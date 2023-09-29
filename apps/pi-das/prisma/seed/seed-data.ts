import { Prisma } from '@/../../src/generated/client';

const participants: Prisma.ParticipantCreateInput[] = [
	{
		id: 'cllgostgz000008l3fk0wd8w0',
		name: 'Homer Simpson',
		email: 'homer.simpson@example.com',
	},
	{
		id: 'cllgoufw3000208l3c6gyg9bh',
		name: 'SpongeBob SquarePants',
		email: 'spongebob.squarepants@example.com',
	},
	{
		id: 'cllgouzph000308l35o99bgqi',
		name: 'Jerry Seinfeld',
		email: 'jerry.seinfeld@example.com',
	},
];

export {
	participants,
};
