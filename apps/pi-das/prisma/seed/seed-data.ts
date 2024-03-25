import { Prisma } from '../../src/generated/client/index.js';

const participants: Prisma.ParticipantCreateInput[] = [
	{
		id: 'cllgostgz000008l3fk0w',
		dateOfBirth: new Date('1956-05-12'),
		participantEmailAddress: 'homer.simpson@example.com',
		participantOhipFirstName: 'Homer',
		participantOhipLastName: 'Simpson',
		participantPhoneNumber: '6475551234',
		participantPreferredName: 'Homer',
		keycloakId: '7ecea917-2a8e-4a65-b4cb-3c52f3f3a020',
	},
	{
		id: 'cllgoufw3000208l3c6gy',
		dateOfBirth: new Date('1986-07-14'),
		participantEmailAddress: 'spongebob.squarepants@example.com',
		participantOhipFirstName: 'Spongebob',
		participantOhipLastName: 'Squarepants',
		participantPhoneNumber: '6475555678',
		participantPreferredName: 'Spongebob',
		guardianName: 'Patrick Star',
		guardianPhoneNumber: '6475550001',
		guardianEmailAddress: 'patrick.star@example.com',
		guardianRelationship: 'Best Friend',
		keycloakId: '108c6200-6f6b-456b-a697-a83b6c55f7ea',
	},
	{
		id: 'cllgouzph000308l35o99',
		dateOfBirth: new Date('1954-04-29'),
		participantEmailAddress: 'jerry.seinfeld@example.com',
		participantOhipFirstName: 'Jerry',
		participantOhipLastName: 'Seinfeld',
		participantPhoneNumber: '6475559012',
		participantPreferredName: 'Jerry',
		keycloakId: 'd88ddc30-93d5-4a57-b229-cbcaa715c3fc',
	},
];

const clinicianInvites: Prisma.ClinicianInviteCreateInput[] = [
	{
		id: 'clmarsvhd000008jngksv',
		participantOhipFirstName: 'Bruce',
		participantOhipLastName: 'Wayne',
		participantEmailAddress: 'bruce.wayne@example.com',
		participantPhoneNumber: '6475558123',
	},
	{
		id: 'Cdl3Gj5k9fh8hgs9g8bn3',
		participantOhipFirstName: 'Homer',
		participantOhipLastName: 'Simpson',
		participantEmailAddress: 'bruce.wayne@example.com',
		participantPhoneNumber: '6475558123',
	},
	{
		id: 'NUF9dN5ZWIfc2TLMG3p2Y',
		participantOhipFirstName: 'Tim',
		participantOhipLastName: 'Drake',
		guardianName: 'Bruce Wayne',
		guardianPhoneNumber: '6475558123',
		guardianEmailAddress: 'bruce.wayne@example.com',
		guardianRelationship: 'Stepfather',
	},
	{
		id: 'JHssaG8AdA4kJ4Z1liPlr',
		participantOhipFirstName: 'Tim',
		participantOhipLastName: 'Drake',
		guardianName: 'Bruce Wayne',
		guardianPhoneNumber: '6475558123',
		guardianEmailAddress: 'bruce.wayne@example.com',
		guardianRelationship: 'Stepfather',
	},
	{
		id: '8UO4bkXl2pjVoUTsrCDoj',
		participantOhipFirstName: 'Tim',
		participantOhipLastName: 'Drake',
		guardianName: 'Bruce Wayne',
		guardianPhoneNumber: '6475558123',
		guardianEmailAddress: 'bruce.wayne@example.com',
		guardianRelationship: 'Stepfather',
	},
];

export { participants, clinicianInvites };
