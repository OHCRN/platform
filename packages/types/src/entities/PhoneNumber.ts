import { z } from 'zod';

import { phoneNumber } from './Regex.js';

export const PhoneNumber = z.string().regex(phoneNumber);
export type PhoneNumber = z.infer<typeof PhoneNumber>;
