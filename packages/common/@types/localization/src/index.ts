import * as z from 'zod';

const LANGUAGES = ['en', 'fr'] as const;
export const ValidLanguage = z.enum(LANGUAGES);
export type ValidLanguage = z.infer<typeof ValidLanguage>;
