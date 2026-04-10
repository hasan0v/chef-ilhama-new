import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyAdmin, unauthorizedResponse } from '@/lib/admin-auth';

const globalForPrisma = globalThis as unknown as { _adminPrisma4: PrismaClient | undefined };
const prisma = globalForPrisma._adminPrisma4 ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma._adminPrisma4 = prisma;

type TableParam = 'kateqoriya' | 'mense' | 'bolge' | 'cetinlik' | 'muddet' | 'porsiya';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await verifyAdmin(request);
  if (!user) return unauthorizedResponse();

  const { id } = await params;
  const { table, ad } = await request.json() as { table: TableParam; ad: string };
  if (!ad?.trim()) return NextResponse.json({ error: 'Ad mütləqdir' }, { status: 400 });
  const val = ad.trim();

  try {
    let item;
    if (table === 'kateqoriya') {
      item = await prisma.category.update({ where: { id }, data: { ad: val } });
    } else if (table === 'mense') {
      item = await prisma.mense.update({ where: { id }, data: { ad: val } });
    } else if (table === 'bolge') {
      item = await prisma.bolge.update({ where: { id }, data: { ad: val } });
    } else if (table === 'cetinlik') {
      item = await prisma.cetinlik.update({ where: { id }, data: { ad: val } });
    } else if (table === 'muddet') {
      item = await prisma.muddet.update({ where: { id }, data: { ad: val } });
    } else if (table === 'porsiya') {
      item = await prisma.porsiya.update({ where: { id }, data: { ad: val } });
    } else {
      return NextResponse.json({ error: 'Yanlış cədvəl' }, { status: 400 });
    }
    return NextResponse.json({ item });
  } catch (error: unknown) {
    const pe = error as { code?: string };
    if (pe?.code === 'P2002') return NextResponse.json({ error: 'Bu dəyər artıq mövcuddur' }, { status: 409 });
    if (pe?.code === 'P2025') return NextResponse.json({ error: 'Tapılmadı' }, { status: 404 });
    return NextResponse.json({ error: 'Yeniləmə xətası' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await verifyAdmin(request);
  if (!user) return unauthorizedResponse();

  const { id } = await params;
  const table = (new URL(request.url).searchParams.get('table') ?? '') as TableParam;

  try {
    if (table === 'kateqoriya') {
      await prisma.category.delete({ where: { id } });
    } else if (table === 'mense') {
      await prisma.mense.delete({ where: { id } });
    } else if (table === 'bolge') {
      await prisma.bolge.delete({ where: { id } });
    } else if (table === 'cetinlik') {
      await prisma.cetinlik.delete({ where: { id } });
    } else if (table === 'muddet') {
      await prisma.muddet.delete({ where: { id } });
    } else if (table === 'porsiya') {
      await prisma.porsiya.delete({ where: { id } });
    } else {
      return NextResponse.json({ error: 'Yanlış cədvəl' }, { status: 400 });
    }
    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) {
    const pe = error as { code?: string };
    if (pe?.code === 'P2025') return NextResponse.json({ error: 'Tapılmadı' }, { status: 404 });
    // FK constraint — item is in use by recipes
    if (pe?.code === 'P2003' || pe?.code === 'P2014') {
      return NextResponse.json({ error: 'Bu dəyər reseptlərdə istifadə olunur, silinə bilməz' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Silinmə xətası' }, { status: 500 });
  }
}
