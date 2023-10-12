import * as z from 'zod';

export const ParticipantResponse = z.object({
	response: z.string().trim(),
});

export type ConsentQuestion = z.infer<typeof ParticipantResponse>;
