import * as z from 'zod';

const CONSENT_CATEGORIES = [
	'INFORMED_CONSENT',
	'CONSENT_RELEASE_DATA',
	'CONSENT_RESEARCH_PARTICIPATION',
	'CONSENT_RECONTACT',
	'CONSENT_REVIEW_SIGN',
] as const;

export const ConsentCategory = z.enum(CONSENT_CATEGORIES);
export type ConsentCategory = z.infer<typeof ConsentCategory>;
