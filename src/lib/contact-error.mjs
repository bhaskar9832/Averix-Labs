import { randomUUID } from 'node:crypto';

const connectionCodes = new Set([
  'ENOTFOUND', 'ECONNREFUSED', 'ECONNRESET', 'ETIMEDOUT',
  'CONNECT_TIMEOUT', 'CONNECTION_CLOSED', 'CONNECTION_ENDED',
  'CERT_HAS_EXPIRED', 'DEPTH_ZERO_SELF_SIGNED_CERT',
  'SELF_SIGNED_CERT_IN_CHAIN', 'UNABLE_TO_VERIFY_LEAF_SIGNATURE',
]);

export function contactFailureDetails(error, env = process.env) {
  const rawCode = error && typeof error === 'object' ? error.code : undefined;
  const code = typeof rawCode === 'string' &&
    (/^[0-9A-Z]{5}$/.test(rawCode) || connectionCodes.has(rawCode)) ? rawCode : 'UNKNOWN';
  return {
    code,
    databaseConfigured: Boolean(env.DATABASE_URL || env.POSTGRES_URL || env.NEON_DATABASE_URL),
  };
}

export function logContactFailure(error) {
  const reference = randomUUID().slice(0, 8);
  // Log only safe diagnostic fields; never errors, SQL parameters or credentials.
  console.error('[Averix Labs] Contact save failed', { reference, ...contactFailureDetails(error) });
  return reference;
}
