import { Prisma } from '../../src/generated/client';

const ohipKeys: Prisma.OhipKeyCreateInput[] = [
	{
		participantId: 'cllgostgz000008l3fk0wd8w0',
	},
	{
		participantId: 'cllgoufw3000208l3c6gyg9bh',
	},
	{
		participantId: 'cllgouzph000308l35o99bgqi',
	},
];

const clinicalProfileKeys: Prisma.ClinicalProfileKeyCreateInput[] = [
	{
		participantId: 'cllgostgz000008l3fk0wd8w0',
	},
	{
		participantId: 'cllgoufw3000208l3c6gyg9bh',
	},
	{
		participantId: 'cllgouzph000308l35o99bgqi',
	},
];

export { ohipKeys, clinicalProfileKeys };
