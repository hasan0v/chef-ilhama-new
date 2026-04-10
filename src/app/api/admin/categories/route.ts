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

  return NextResponse.json({ categories, menseler, bolgeler });
}

export async function POST(request: NextRequest) {
  const user = await verifyAdmin(request);
  if (!user) return unauthorizedResponse();

  try {
    const { table, ad } = await request.json();
    if (!ad?.trim()) return NextResponse.json({ error: 'Ad mütləqdir' }, { status: 400 });
    const val = ad.trim();

    let item;
    if (table === 'kateqoriya') {
      item = await prisma.category.create({ data: { ad: val } });
    } else if (table === 'mense') {
      item = await prisma.mense.create({ data: { ad: val } });
    } else if (table === 'bolge') {
      item = await prisma.bolge.create({ data: { ad: val } });
    } else {
      return NextResponse.json({ error: 'Yanlış cədvəl' }, { status: 400 });
    }

    return NextResponse.json({ item }, { status: 201 });
  } catch (error: unknown) {
    const pe = error as { code?: string };
    if (pe?.code === 'P2002') return NextResponse.json({ error: 'Bu dəyər artıq mövcuddur' }, { status: 409 });
    return NextResponse.json({ error: 'Xəta baş verdi' }, { status: 500 });
  }
}
