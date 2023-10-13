import * as z from 'zod';

import { nanoId } from './Regex.js';

export const NanoId = z.string().regex(nanoId);
export type NanoId = z.infer<typeof NanoId>;
