import * as z from 'zod';

import { ConsentGroup } from './ConsentGroup.js';
import { Province } from './Province.js';

export const ParticipantIdentification = z.object({
	// TODO: change from .cuid() to nanoid regex once nanoid is implemented
	id: z.string().cuid(),
	// TODO: change from .cuid() to nanoid regex once nanoid is implemented
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
