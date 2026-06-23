import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyAdmin, unauthorizedResponse } from '@/lib/admin-auth';

const globalForPrisma = globalThis as unknown as { _adminPrisma3: PrismaClient | undefined };
const prisma = globalForPrisma._adminPrisma3 ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma._adminPrisma3 = prisma;

export async function GET(request: NextRequest) {
  const user = await verifyAdmin(request);
  if (!user) return unauthorizedResponse();

  const [categories, menseler, bolgeler, cetinlikler, muddetler, porsiyalar] = await Promise.all([
    prisma.category.findMany({ orderBy: { ad: 'asc' } }),
    prisma.mense.findMany({ orderBy: { ad: 'asc' } }),
    prisma.bolge.findMany({ orderBy: { ad: 'asc' } }),
    prisma.cetinlik.findMany({ orderBy: { sira: 'asc' } }),
    prisma.muddet.findMany({ orderBy: { sira: 'asc' } }),
    prisma.porsiya.findMany({ orderBy: { sira: 'asc' } }),
  ]);

  return NextResponse.json({ categories, menseler, bolgeler, cetinlikler, muddetler, porsiyalar });
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
    } else if (table === 'cetinlik') {
      const count = await prisma.cetinlik.count();
      item = await prisma.cetinlik.create({ data: { ad: val, sira: count } });
    } else if (table === 'muddet') {
      const count = await prisma.muddet.count();
      item = await prisma.muddet.create({ data: { ad: val, sira: count } });
    } else if (table === 'porsiya') {
      const count = await prisma.porsiya.count();
      let adVal = val;
      let miqdarVal = null;
      const match = val.match(/^([0-9\-+\s½¼¾/]+)?\s*(.*)$/);
      if (match) {
        const pm = match[1]?.trim();
        const pa = match[2]?.trim();
        if (pm) {
          miqdarVal = pm;
          adVal = pa || 'nəfərlik';
        }
      }
      item = await prisma.porsiya.create({ data: { ad: adVal, miqdar: miqdarVal, sira: count } });
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
