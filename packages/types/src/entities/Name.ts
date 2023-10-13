import { z } from 'zod';

import { name } from './Regex.js';

export const Name = z.string().regex(name);
export type Name = z.infer<typeof Name>;
