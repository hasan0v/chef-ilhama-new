import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyAdmin, unauthorizedResponse } from '@/lib/admin-auth';

const globalForPrisma = globalThis as unknown as { _adminPrisma3: PrismaClient | undefined };
const prisma = globalForPrisma._adminPrisma3 ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma._adminPrisma3 = prisma;

export async function GET(request: NextRequest) {
  const user = await verifyAdmin(request);
  if (!user) return unauthorizedResponse();

  const [categories, menseler, bolgeler] = await Promise.all([
    prisma.category.findMany({ orderBy: { ad: 'asc' } }),
    prisma.mense.findMany({ orderBy: { ad: 'asc' } }),
    prisma.bolge.findMany({ orderBy: { ad: 'asc' } }),
  ]);

  return NextResponse.json({
    categories: categories.map(c => c.ad),
    menseler: menseler.map(m => m.ad),
    bolgeler: bolgeler.map(b => b.ad),
  });
}
