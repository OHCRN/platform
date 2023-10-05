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

const CONSENT_GROUPS = [
	'ADULT_CONSENT',
	'ADULT_CONSENT_SUBSTITUTE_DECISION_MAKER',
	'GUARDIAN_CONSENT_OF_MINOR',
	'GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT',
	'YOUNG_ADULT_CONSENT',
] as const;

export const ConsentGroup = z.enum(CONSENT_GROUPS);
export type ConsentGroup = z.infer<typeof ConsentGroup>;