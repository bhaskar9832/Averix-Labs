import 'server-only';
import { Pool } from 'pg';
import { getDatabaseConfig } from './database-config.mjs';

const databaseGlobal = globalThis as typeof globalThis & { inquiryPool?: Pool };

export function getDatabase() {
  if (!databaseGlobal.inquiryPool) {
    const pool = new Pool(getDatabaseConfig());
    pool.on('error', () => console.error('[Averix Labs] Database connection error'));
    databaseGlobal.inquiryPool = pool;
  }
  return databaseGlobal.inquiryPool;
}
