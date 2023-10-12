import * as z from 'zod';

import { ConsentGroup } from './ConsentCategory.js';

export const ClinicianInvite = z.object({
	// TODO: change from .cuid() to nanoid regex once nanoid is implemented
	id: z.string().cuid(),
	inviteSentDate: z.date(),
	inviteAcceptedDate: z.date().nullable(),
	inviteAccepted: z.boolean().nullable(),
	clinicianFirstName: z.string().regex(/^[A-Za-z\s]+$/),
	clinicianLastName: z.string().regex(/^[A-Za-z\s]+$/),
	clinicianInstitutionalEmailAddress: z.string().email(),
	clinicianTitle: z.string(),
	participantFirstName: z.string().regex(/^[A-Za-z\s]+$/),
	participantLastName: z.string().regex(/^[A-Za-z\s]+$/),
	participantEmailAddress: z.string().email(),
	participantPhoneNumber: z.string().regex(/^[0-9]{10}/),
	participantPreferredName: z
		.string()
		.regex(/^[A-Za-z\s]+$/)
		.nullable(),
	consentGroup: ConsentGroup,
	guardianName: z
		.string()
		.regex(/^[A-Za-z\s]+$/)
		.nullable(),
	guardianPhoneNumber: z
		.string()
		.regex(/^[0-9]{10}/)
		.nullable(),
	guardianEmailAddress: z.string().email().nullable(),
	guardianRelationship: z
		.string()
		.regex(/^[A-Za-z\s]+$/)
		.nullable(),
});

export type ClinicianInvite = z.infer<typeof ClinicianInvite>;
