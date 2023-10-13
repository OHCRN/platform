import * as z from 'zod';

import { ohipNumber } from './Regex.js';

export const OhipNumber = z.string().regex(ohipNumber);
export type OhipNumber = z.infer<typeof OhipNumber>;
