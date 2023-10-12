import * as z from 'zod';

import { ConsentCategory } from './ConsentCategory.js';

export const ConsentQuestion = z.object({
	id: z.string().trim(),
	isActive: z.boolean(),
	category: ConsentCategory,
});

export type ConsentQuestion = z.infer<typeof ConsentQuestion>;
