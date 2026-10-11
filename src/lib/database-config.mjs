import { readFileSync } from 'node:fs';

export function getDatabaseConfig() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL is not configured');
  const url = new URL(connectionString);
  // Explicit TLS options must not be overridden by connection-string parameters.
  for (const key of ['sslmode', 'sslcert', 'sslkey', 'sslrootcert']) url.searchParams.delete(key);
  const ca = process.env.DATABASE_CA_CERT?.replace(/\\n/g, '\n') ||
    (process.env.DATABASE_CA_CERT_PATH ? readFileSync(process.env.DATABASE_CA_CERT_PATH, 'utf8') : undefined);
  return {
    connectionString: url.toString(),
    ssl: { rejectUnauthorized: true, ...(ca ? { ca } : {}) },
    max: 2,
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
    statement_timeout: 10000,
  };
}
