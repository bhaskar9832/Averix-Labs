import nextEnv from '@next/env';
import pg from 'pg';
import { readFileSync } from 'node:fs';
import { getDatabaseConfig } from '../src/lib/database-config.mjs';

const { loadEnvConfig } = nextEnv;
const { Client } = pg;

async function main() {
  loadEnvConfig(process.cwd());
  const client = new Client(getDatabaseConfig());
  try {
    await client.connect();
    await client.query('BEGIN');
    await client.query(readFileSync(new URL('../database/migrations/001_create_inquiries.sql', import.meta.url), 'utf8'));
    await client.query('COMMIT');
    console.log('Aiven PostgreSQL connected; inquiry table and indexes are ready.');
  } finally {
    await client.end();
  }
}
main().catch(error => {
  console.error('Database setup failed:', error.code || 'Check database credentials and CA certificate');
  process.exitCode = 1;
});
