import { Prisma } from '../../src/generated/client/index.js';

const ohipKeys: Prisma.OhipKeyCreateInput[] = [
	{
		participantId: 'buqF3qkmrXcuCZaZfXKmX',
		ohipPrivateKey: 'Pli04iPLl7UwGHVROUesK',
	},
	{
		participantId: '5PLJAg6LPDHKCzZUVamcg',
		ohipPrivateKey: 'Pli04iPLl7UwGHVROUrtd',
	},
	{
		participantId: '9Cjl0sUDKnyW2TvQdAta6',
		ohipPrivateKey: 'Pli04iPLl7UwGHVROU2se',
	},
];

const clinicalProfileKeys: Prisma.ClinicalProfileKeyCreateInput[] = [
	{
		participantId: 'NylQ1O6cMTFJDAbWHSnjm',
		clinicalProfilePrivateKey: 'Cli04iPLl7UwGHVROU2se',
	},
	{
		participantId: 'OiUvq8rNh1BY1H9DOSt7Y',
		clinicalProfilePrivateKey: 'Cli04iPLl7UwGHVROUewq',
	},
	{
		participantId: 'oUrel7bpWvMhMWzmMRboX',
		clinicalProfilePrivateKey: 'Cli04iPLl7UwGHVROU4ds',
	},
];

export { ohipKeys, clinicalProfileKeys };
