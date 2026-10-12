// Prisma setup template
// When you run `npx prisma generate` locally with an active network connection, 
// uncomment the direct PrismaClient export below.
/*
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
*/

// Export postgres connection as unified db instance
export { sql as db } from './db'
