import { Prisma } from '../../src/generated/client/index.js';

const ohipKeys: Prisma.OhipKeyCreateInput[] = [
	{
		participantId: 'cllgostgz000008l3fk0w',
		ohipPrivateKey: 'Pli04iPLl7UwGHVROUesK',
	},
	{
		participantId: 'cllgoufw3000208l3c6gy',
		ohipPrivateKey: 'Pli04iPLl7UwGHVROUrtd',
	},
	{
		participantId: 'cllgouzph000308l35o99',
		ohipPrivateKey: 'Pli04iPLl7UwGHVROU2se',
	},
];

const clinicalProfileKeys: Prisma.ClinicalProfileKeyCreateInput[] = [
	{
		participantId: 'cllgostgz000008l3fk0w',
		clinicalProfilePrivateKey: 'Cli04iPLl7UwGHVROU2se',
	},
	{
		participantId: 'cllgoufw3000208l3c6gy',
		clinicalProfilePrivateKey: 'Cli04iPLl7UwGHVROUewq',
	},
	{
		participantId: 'cllgouzph000308l35o99',
		clinicalProfilePrivateKey: 'Cli04iPLl7UwGHVROU4ds',
	},
];

export { ohipKeys, clinicalProfileKeys };
