import postgres from 'postgres'

const connectionString = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL || ''

export const sql = postgres(connectionString, {
  max: 10,
  idle_timeout: 30,
  connect_timeout: 30,
  ssl: { rejectUnauthorized: false },
})
