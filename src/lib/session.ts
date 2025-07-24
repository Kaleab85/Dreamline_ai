
import 'server-only';

export interface SessionPayload {
  userId: string;
  role: 'superadmin' | 'admin';
  expiresAt: Date;
}
