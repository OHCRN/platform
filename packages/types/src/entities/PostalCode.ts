import { z } from 'zod';

import { postalCode } from './Regex.js';

export const PostalCode = z
	.string()
	.regex(postalCode)
	.transform((data) => data.toUpperCase());
export type PostalCode = z.infer<typeof PostalCode>;
