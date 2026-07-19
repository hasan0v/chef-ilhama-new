import { PrismaClient } from '@prisma/client'

function getDatasourceUrl(): string | undefined {
  const rawUrl = process.env.DATABASE_URL
  if (!rawUrl) return undefined

  try {
    const url = new URL(rawUrl)

    // Supabase's transaction pooler runs on 6543. Keep each server/build
    // process deliberately small so concurrent Next.js workers cannot exhaust it.
    if (url.port === '6543') {
      if (!url.searchParams.has('pgbouncer')) url.searchParams.set('pgbouncer', 'true')
      if (!url.searchParams.has('connection_limit')) url.searchParams.set('connection_limit', '1')
      if (!url.searchParams.has('pool_timeout')) url.searchParams.set('pool_timeout', '30')
    }

    return url.toString()
  } catch {
    // Preserve custom Prisma connection strings that URL cannot normalize.
    return rawUrl
  }
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasourceUrl: getDatasourceUrl(),
  log: ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
