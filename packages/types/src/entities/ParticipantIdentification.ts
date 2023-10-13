import * as z from 'zod';

import { ConsentGroup } from './ConsentGroup.js';
import { Province } from './Province.js';
import { PhoneNumber } from './PhoneNumber.js';
import { PostalCode } from './PostalCode.js';
import { Name } from './Name.js';
import { OhipNumber } from './OhipNumber.js';
import { NanoId } from './NanoId.js';

export const ParticipantIdentification = z.object({
	id: NanoId,
	inviteId: NanoId.optional(),
	ohipNumber: OhipNumber,
	participantPreferredName: Name,
	participantOhipFirstName: Name,
	participantOhipLastName: Name,
	participantOhipMiddleName: Name.optional(),
	dateOfBirth: z.date(),
	phoneNumber: PhoneNumber,
	mailingAddressStreet: z.string().optional(),
	mailingAddressCity: z.string().optional(),
	mailingAddressProvince: Province.optional(),
	mailingAddressPostalCode: PostalCode.optional(),
	residentialPostalCode: PostalCode,
	emailAddress: z.string().email(),
	consentGroup: ConsentGroup,
	guardianName: Name.optional(),
	guardianPhoneNumber: PhoneNumber.optional(),
	guardianEmailAddress: z.string().email().optional(),
	guardianRelationship: Name.optional(),
});

export type ParticipantIdentification = z.infer<typeof ParticipantIdentification>;
