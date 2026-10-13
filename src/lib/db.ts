import postgres from 'postgres'

const rawConnectionString =
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL ||
  process.env.NEON_DATABASE_URL ||
  ''

// Clean connection string if wrapped in quotes
const connectionString = rawConnectionString.replace(/^["']|["']$/g, '').trim()

// Configure postgres client optimized for serverless environments (Vercel / Lambda)
export const sql = postgres(connectionString, {
  max: 1, // Single connection per serverless function instance to prevent pool exhaustion
  idle_timeout: 10,
  connect_timeout: 15,
  ssl: { rejectUnauthorized: false },
})
