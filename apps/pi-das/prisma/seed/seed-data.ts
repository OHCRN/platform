import { Prisma } from '../../src/generated/client/index.js';

const participants: Prisma.ParticipantCreateInput[] = [
	{
		id: 'cllgostgz000008l3fk0w',
		dateOfBirth: new Date('1956-05-12'),
		emailAddress: 'homer.simpson@example.com',
		participantOhipFirstName: 'Homer',
		participantOhipLastName: 'Simpson',
		phoneNumber: '6475551234',
		participantPreferredName: 'Homer',
		mailingAddressStreet: '742 Evergreen Terrace',
		mailingAddressCity: 'Springfield',
		mailingAddressProvince: 'ONTARIO',
		mailingAddressPostalCode: 'L5V1G3',
		residentialPostalCode: 'L5V1G3',
	},
	{
		id: 'cllgoufw3000208l3c6gy',
		dateOfBirth: new Date('1986-07-14'),
		emailAddress: 'spongebob.squarepants@example.com',
		participantOhipFirstName: 'Spongebob',
		participantOhipLastName: 'Squarepants',
		phoneNumber: '6475555678',
		participantPreferredName: 'Spongebob',
		guardianName: 'Patrick Star',
		guardianPhoneNumber: '6475550001',
		guardianEmailAddress: 'patrick.star@example.com',
		guardianRelationship: 'Best Friend',
		mailingAddressStreet: '123 Conch St',
		mailingAddressCity: 'Bikini Bottom',
		mailingAddressProvince: 'NOVA_SCOTIA',
		mailingAddressPostalCode: 'A1B2C3',
		residentialPostalCode: 'A1B2C3',
	},
	{
		id: 'cllgouzph000308l35o99',
		dateOfBirth: new Date('1954-04-29'),
		emailAddress: 'jerry.seinfeld@example.com',
		participantOhipFirstName: 'Jerry',
		participantOhipLastName: 'Seinfeld',
		phoneNumber: '6475559012',
		participantPreferredName: 'Jerry',
		residentialPostalCode: 'N5G5M3',
	},
];

const clinicianInvites: Prisma.ClinicianInviteCreateInput[] = [
	{
		id: 'clmarsvhd000008jngksv',
		participantFirstName: 'Bruce',
		participantLastName: 'Wayne',
		participantEmailAddress: 'bruce.wayne@example.com',
		participantPhoneNumber: '6475558123',
	},
	{
		id: 'NUF9dN5ZWIfc2TLMG3p2Y',
		participantFirstName: 'Tim',
		participantLastName: 'Drake',
		participantEmailAddress: 'tim.drake@example.com',
		participantPhoneNumber: '6475558123',
		guardianName: 'Bruce Wayne',
		guardianPhoneNumber: '6475558123',
		guardianEmailAddress: 'bruce.wayne@example.com',
		guardianRelationship: 'Stepfather',
	},
];

export { participants, clinicianInvites };
