import * as z from 'zod';

export const User = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string().email(),
});

export type User = z.infer<typeof User>;