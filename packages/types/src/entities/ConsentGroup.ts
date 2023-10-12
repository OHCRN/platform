import * as z from 'zod';

const CONSENT_GROUPS = [
	'ADULT_CONSENT',
	'ADULT_CONSENT_SUBSTITUTE_DECISION_MAKER',
	'GUARDIAN_CONSENT_OF_MINOR',
	'GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT',
	'YOUNG_ADULT_CONSENT',
] as const;

export const ConsentGroup = z.enum(CONSENT_GROUPS);
export type ConsentGroup = z.infer<typeof ConsentGroup>;
