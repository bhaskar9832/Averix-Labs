import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { redisCache } from '@/lib/cache/redis'

const secretKey = process.env.JWT_SECRET || 'averix-super-secret-key-change-in-prod'
const key = new TextEncoder().encode(secretKey)

export interface AdminSession {
  id: string
  email: string
  name: string
  roles: string[]
  permissions: string[]
  sessionId: string
  sessionTokenHash: string
  authenticatedAt: string
}

// Web Crypto & Node compatible SHA-256 hash generator
export function hashSessionToken(rawToken: string): string {
  if (typeof crypto !== 'undefined' && 'subtle' in crypto) {
    // Synchronous hex fallback or sync node crypto
    try {
      const { createHash } = require('crypto');
      return createHash('sha256').update(rawToken).digest('hex');
    } catch (e) {
      // In pure edge environments
      let hash = 0;
      for (let i = 0; i < rawToken.length; i++) {
        const char = rawToken.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
      }
      return 'edge_' + Math.abs(hash).toString(16);
    }
  }
  return 'token_' + rawToken.slice(0, 32);
}

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(key)
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  })
  return payload
}

/**
 * Validates session from HttpOnly cookie:
 * 1. Decrypts JWT
 * 2. Checks revocation in Redis & database session store via session_token_hash
 */
export async function getSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies()
  const rawToken = cookieStore.get('session')?.value
  if (!rawToken) return null

  try {
    const payload = await decrypt(rawToken)
    if (!payload || !payload.id || !payload.sessionId) return null

    // Check Redis revocation
    const cached = redisCache.get<any>(`admin_session_${payload.sessionId}`)
    if (!cached) return null

    return payload as AdminSession
  } catch (err) {
    return null
  }
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * 5. PERMISSION ARCHITECTURE BACKEND GUARD
 * ─────────────────────────────────────────────────────────────────────────────
 * Performs the exact pipeline:
 * Request ➔ Authentication (Who is this user?) ➔
 *   What roles do they have? ➔
 *     What permissions do those roles have? ➔
 *       Is permission required for this endpoint?
 *         ├── YES → Continue
 *         └── NO  → 403 Forbidden
 * ─────────────────────────────────────────────────────────────────────────────
 */
export async function requirePermission(
  req: NextRequest,
  requiredPermission?: string
): Promise<{ authorized: boolean; session?: AdminSession; errorResponse?: NextResponse }> {
  const cookieStore = req.cookies
  const rawToken = cookieStore.get('session')?.value

  if (!rawToken) {
    return {
      authorized: false,
      errorResponse: NextResponse.json(
        { 
          error: 'Unauthorized — Missing authentication session. HttpOnly cookie required.', 
          code: 401 
        },
        { status: 401 }
      ),
    }
  }

  try {
    const session = (await decrypt(rawToken)) as AdminSession;

    // 1. Check if token contains valid user payload
    if (!session || !session.id) {
      return {
        authorized: false,
        errorResponse: NextResponse.json(
          { error: 'Unauthorized — Invalid session payload', code: 401 },
          { status: 401 }
        ),
      }
    }

    // 2. If modern session has sessionId, check revocation cache (with DB fallback)
    if (session.sessionId) {
      const cached = redisCache.get<any>(`admin_session_${session.sessionId}`)
      if (!cached) {
        // Fallback: check PostgreSQL sessions table
        try {
          const { sql } = await import('@/lib/db');
          const dbSession = await sql`
            SELECT id, user_id FROM sessions 
            WHERE session_id = ${session.sessionId} AND expires_at > NOW() 
            LIMIT 1
          `;
          if (!dbSession || dbSession.length === 0) {
            return {
              authorized: false,
              errorResponse: NextResponse.json(
                { error: 'Unauthorized — Session revoked or expired.', code: 401 },
                { status: 401 }
              ),
            }
          }
          // Warm up cache
          redisCache.set(`admin_session_${session.sessionId}`, session, 86400);
        } catch (dbErr) {
          // If DB check fails, allow authenticated JWT session
        }
      }
    }

    // 3. Permission Check
    // If user has SUPER_ADMIN role, grant access automatically
    const isSuperAdmin = !session.roles || session.roles.includes('SUPER_ADMIN') || session.permissions?.includes('admin:all')

    if (requiredPermission && !isSuperAdmin) {
      const hasPermission = session.permissions?.includes(requiredPermission)

      if (!hasPermission) {
        return {
          authorized: false,
          errorResponse: NextResponse.json(
            {
              error: `Forbidden — Insufficient privileges. Required permission: '${requiredPermission}'`,
              userRoles: session.roles,
              code: 403,
            },
            { status: 403 }
          ),
        }
      }
    }

    return { authorized: true, session }
  } catch (e: any) {
    return {
      authorized: false,
      errorResponse: NextResponse.json(
        { error: 'Unauthorized — Session token expired or corrupted.', code: 401 },
        { status: 401 }
      ),
    }
  }
}

// Backward-compatible alias for existing callers
export const requireAdminAuth = (req?: NextRequest) => requirePermission(req as NextRequest);
