

import { jwtVerify } from 'jose';
import type { SessionPayload } from './session';

const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key-that-is-long-enough';
const encodedKey = new TextEncoder().encode(secretKey);

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload as SessionPayload;
  } catch (error) {
    return null;
  }
}
