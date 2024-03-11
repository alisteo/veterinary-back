

import { config } from 'dotenv';

if (process.env.NODE_ENV !== 'producction') config();

export const PORT = process.env.PORT || 3300;
export const MONGODB_URI = process.env.MONGODB_URI;
export const SECRETORPRIVATEKEY_JWT = process.env.SECRETORPRIVATEKEY_JWT;

