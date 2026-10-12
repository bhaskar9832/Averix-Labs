import postgres from 'postgres';
import { getDatabaseConfig } from './database-config.mjs';

export function getSql() {
  if (!globalThis.averixSql) {
    const config = getDatabaseConfig();
    globalThis.averixSql = postgres(config.connectionString, {
      ssl: config.ssl,
      max: 2,
      idle_timeout: 30,
      connect_timeout: 10,
      connection: { statement_timeout: 10000 },
    });
  }
  return globalThis.averixSql;
}
