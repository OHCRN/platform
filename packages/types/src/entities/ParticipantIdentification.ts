import * as z from 'zod';

import { ConsentGroup } from './ConsentCategory.js';

const PROVINCES = [
	'ALBERTA',
	'BRITISH_COLUMBIA',
	'MANITOBA',
	'NEW_BRUNSWICK',
	'NEWFOUNDLAND_AND_LABRADOR',
	'NORTHWEST_TERRITORIES',
	'NOVA_SCOTIA',
	'NUNAVUT',
	'ONTARIO',
	'PRINCE_EDWARD_ISLAND',
	'QUEBEC',
	'SASKATCHEWAN',
	'YUKON',
] as const;

export const Province = z.enum(PROVINCES);
export type Province = z.infer<typeof Province>;

export const ParticipantIdentification = z.object({
	id: z.string().cuid(),
	inviteId: z.string().cuid().optional(),
	ohipNumber: z.string().regex(/[0-9]{10}/),
	participantPreferredName: z.string().regex(/^[A-Za-z\s]+$/),
	participantOhipFirstName: z.string().regex(/^[A-Za-z\s]+$/),
	participantOhipLastName: z.string().regex(/^[A-Za-z\s]+$/),
	participantOhipMiddleName: z
		.string()
		.regex(/^[A-Za-z\s]+$/)
		.optional(),
	dateOfBirth: z.date(),
	phoneNumber: z.string().regex(/[0-9]{10}/),
	mailingAddressStreet: z.string().optional(),
	mailingAddressCity: z.string().optional(),
	mailingAddressProvince: Province.optional(),
	mailingAddressPostalCode: z
		.string()
		.regex(/^[A-Za-z][0-9][A-Za-z][0-9][A-Za-z][0-9]/)
		.optional(),
	residentialPostalCode: z.string().regex(/^[A-Za-z][0-9][A-Za-z][0-9][A-Za-z][0-9]/),
	emailAddress: z.string().email(),
	consentGroup: ConsentGroup,
	guardianName: z
		.string()
		.regex(/^[A-Za-z\s]+$/)
		.optional(),
	guardianPhoneNumber: z
		.string()
		.regex(/[0-9]{10}/)
		.optional(),
	guardianEmailAddress: z.string().email().optional(),
	guardianRelationship: z
		.string()
		.regex(/^[A-Za-z\s]+$/)
		.optional(),
});

export type ParticipantIdentification = z.infer<typeof ParticipantIdentification>;
