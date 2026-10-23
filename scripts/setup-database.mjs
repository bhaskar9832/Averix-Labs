import nextEnv from '@next/env';
import pg from 'pg';
import { readFileSync, readdirSync } from 'node:fs';
import { getDatabaseConfig } from '../src/lib/database-config.mjs';

const { loadEnvConfig } = nextEnv;
const { Client } = pg;

async function main() {
  loadEnvConfig(process.cwd());
  const client = new Client(getDatabaseConfig());
  try {
    await client.connect();
    await client.query('BEGIN');
    const directory = new URL('../database/migrations/', import.meta.url);
    for (const file of readdirSync(directory).filter(name => name.endsWith('.sql')).sort()) {
      await client.query(readFileSync(new URL(file, directory), 'utf8'));
    }
    await client.query('COMMIT');
    console.log('Aiven PostgreSQL connected; inquiry and CRM tables are ready.');
  } finally {
    await client.end();
  }
}
main().catch(error => {
  console.error('Database setup failed:', error.code || 'Check database credentials and CA certificate');
  process.exitCode = 1;
});
