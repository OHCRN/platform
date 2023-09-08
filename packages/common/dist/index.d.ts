import * as z from 'zod';
export declare const User: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    email: string;
}, {
    id: string;
    name: string;
    email: string;
}>;
export type User = z.infer<typeof User>;
export declare const ConsentCategory: z.ZodEnum<["INFORMED_CONSENT", "CONSENT_RELEASE_DATA", "CONSENT_RESEARCH_PARTICIPATION", "CONSENT_RECONTACT", "CONSENT_REVIEW_SIGN"]>;
export type ConsentCategory = z.infer<typeof ConsentCategory>;
