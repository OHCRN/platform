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
		clinicalProfilePrivateKey: 'AFLH1BdZv4gI3As5h8r4T',
	},
	{
		participantId: 'OiUvq8rNh1BY1H9DOSt7Y',
		clinicalProfilePrivateKey: '21zkiwRtDwB2diY4cRH8M',
	},
	{
		participantId: 'oUrel7bpWvMhMWzmMRboX',
		clinicalProfilePrivateKey: '2AwZtRhObB67crgoBkO3H',
	},
];

export { ohipKeys, clinicalProfileKeys };
