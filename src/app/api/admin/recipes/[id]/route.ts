import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyAdmin, unauthorizedResponse } from '@/lib/admin-auth';

const globalForPrisma = globalThis as unknown as { _adminPrisma2: PrismaClient | undefined };
const prisma = globalForPrisma._adminPrisma2 ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma._adminPrisma2 = prisma;

async function upsertLookup(
  table: 'category' | 'mense' | 'bolge',
  ad: string
): Promise<string | null> {
  if (!ad || !ad.trim()) return null;
  const val = ad.trim();
  if (table === 'category') {
    const r = await prisma.category.upsert({ where: { ad: val }, create: { ad: val }, update: {} });
    return r.id;
  }
  if (table === 'mense') {
    const r = await prisma.mense.upsert({ where: { ad: val }, create: { ad: val }, update: {} });
    return r.id;
  }
  const r = await prisma.bolge.upsert({ where: { ad: val }, create: { ad: val }, update: {} });
  return r.id;
}

const include = {
  kateqoriya: true,
  mense: true,
  bolge: true,
  terkibHisseleri: { orderBy: { sira: 'asc' as const } },
  addimlar: { orderBy: { sira: 'asc' as const } },
  sekiller: true,
} as const;

// GET single recipe
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await verifyAdmin(request);
  if (!user) return unauthorizedResponse();

  const { id } = await params;
  const recipe = await prisma.recipe.findUnique({ where: { id }, include });
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

    const [kateqoriyaId, menseId, bolgeId] = await Promise.all([
      upsertLookup('category', body.kateqoriya),
      upsertLookup('mense', body.mense),
      upsertLookup('bolge', body.bolge),
    ]);

    if (!kateqoriyaId) {
      return NextResponse.json({ error: 'Kateqoriya mütləqdir' }, { status: 400 });
    }

    const ingredients: string[] = Array.isArray(body.terkibHisseleri)
      ? body.terkibHisseleri.filter((s: string) => s.trim())
      : [];
    const steps: string[] = Array.isArray(body.addimlar)
      ? body.addimlar.filter((s: string) => s.trim())
      : [];

    // Delete existing related rows then re-create
    await prisma.$transaction([
      prisma.ingredient.deleteMany({ where: { recipeId: id } }),
      prisma.step.deleteMany({ where: { recipeId: id } }),
    ]);

    // Handle image update
    const imageUrl = body.sekilLinki?.trim();
    if (imageUrl) {
      const existing = await prisma.recipeImage.findFirst({ where: { recipeId: id, isMain: true } });
      if (existing) {
        await prisma.recipeImage.update({ where: { id: existing.id }, data: { url: imageUrl } });
      } else {
        await prisma.recipeImage.create({ data: { url: imageUrl, isMain: true, recipeId: id } });
      }
    }

    const recipe = await prisma.recipe.update({
      where: { id },
      data: {
        yemeyinAdi: body.yemeyinAdi,
        kateqoriyaId,
        menseId,
        bolgeId,
        hazirlanmaMuddeti: body.hazirlanmaMuddeti,
        cetinlikDerecesi: body.cetinlikDerecesi,
        porsiyaSayi: body.porsiyaSayi,
        tarixiMelumat: body.tarixiMelumat || null,
        teqdimTeklifleri: body.teqdimTeklifleri || null,
        featured: body.featured,
        terkibHisseleri: { create: ingredients.map((ad, i) => ({ ad, sira: i })) },
        addimlar: { create: steps.map((metn, i) => ({ metn, sira: i })) },
      },
      include,
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

