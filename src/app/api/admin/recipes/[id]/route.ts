import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyAdmin, unauthorizedResponse } from '@/lib/admin-auth';

const globalForPrisma = globalThis as unknown as { _adminPrisma2: PrismaClient | undefined };
const prisma = globalForPrisma._adminPrisma2 ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma._adminPrisma2 = prisma;

// GET single recipe
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await verifyAdmin(request);
  if (!user) return unauthorizedResponse();

  const { id } = await params;
  const recipe = await prisma.recipe.findUnique({ where: { id } });
  if (!recipe) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({ recipe });
}

// PUT update recipe
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await verifyAdmin(request);
  if (!user) return unauthorizedResponse();

  const { id } = await params;

  try {
    const body = await request.json();

    const recipe = await prisma.recipe.update({
      where: { id },
      data: {
        yemeyinAdi: body.yemeyinAdi,
        mense: body.mense,
        bolge: body.bolge,
        kateqoriya: body.kateqoriya,
        terkibHisseleri: body.terkibHisseleri,
        hazirlanmaQaydasi: body.hazirlanmaQaydasi,
        hazirlanmaMuddeti: body.hazirlanmaMuddeti,
        cetinlikDerecesi: body.cetinlikDerecesi,
        porsiyaSayi: body.porsiyaSayi,
        tarixiMelumat: body.tarixiMelumat,
        teqdimTeklifleri: body.teqdimTeklifleri,
        sekilLinki: body.sekilLinki,
        featured: body.featured,
      },
    });

    return NextResponse.json({ recipe });
  } catch (error) {
    console.error('Update recipe error:', error);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

// DELETE recipe
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await verifyAdmin(request);
  if (!user) return unauthorizedResponse();

  const { id } = await params;

  try {
    await prisma.recipe.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete recipe error:', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
