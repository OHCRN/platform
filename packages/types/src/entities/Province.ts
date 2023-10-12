import * as z from 'zod';

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
