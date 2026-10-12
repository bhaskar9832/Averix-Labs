import { sql } from '@/lib/db';

export type AuditAction = 
  | 'LOGIN'
  | 'LOGIN_FAILED'
  | 'LOGOUT'
  | 'PASSWORD_CHANGED'
  | 'MFA_ENABLED'
  | 'MFA_DISABLED'
  | 'USER_CREATED'
  | 'USER_DELETED'
  | 'ROLE_CHANGED'
  | 'BLOG_CREATED'
  | 'BLOG_DELETED'
  | 'SETTINGS_CHANGED'
  | 'SESSION_REVOKED';

export interface AuditLogParams {
  userId?: string | null;
  action: AuditAction;
  resourceType?: string;
  resourceId?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
}

/**
 * Immutable audit logger.
 * Writes immutable operational records into PostgreSQL audit_logs.
 * Ordinary admins cannot alter or delete these records.
 */
export async function logAuditEvent({
  userId = null,
  action,
  resourceType = 'system',
  resourceId = 'none',
  ipAddress = '127.0.0.1',
  userAgent = 'Unknown',
  metadata = {},
}: AuditLogParams): Promise<void> {
  try {
    await sql`
      INSERT INTO audit_logs (
        user_id,
        action,
        resource,
        resource_type,
        resource_id,
        ip_address,
        user_agent,
        details,
        metadata
      ) VALUES (
        ${userId},
        ${action},
        ${resourceType},
        ${resourceType},
        ${resourceId},
        ${ipAddress},
        ${userAgent},
        ${JSON.stringify(metadata)}::jsonb,
        ${JSON.stringify(metadata)}::jsonb
      )
    `;
  } catch (error: any) {
    console.error('[logAuditEvent Error]:', error.message);
  }
}
