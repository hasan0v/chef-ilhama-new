import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyAdmin, unauthorizedResponse } from '@/lib/admin-auth';

const globalForPrisma = globalThis as unknown as { _adminPrisma: PrismaClient | undefined };
const prisma = globalForPrisma._adminPrisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma._adminPrisma = prisma;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ə/g, 'e').replace(/ü/g, 'u').replace(/ö/g, 'o')
    .replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g')
    .replace(/ı/g, 'i').replace(/İ/g, 'i')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

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

// GET all recipes (admin list)
export async function GET(request: NextRequest) {
  const user = await verifyAdmin(request);
  if (!user) return unauthorizedResponse();

  const rows = await prisma.recipe.findMany({
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      yemeyinAdi: true,
      slug: true,
      kateqoriya: { select: { ad: true } },
      cetinlikDerecesi: true,
      mense: { select: { ad: true } },
      bolge: { select: { ad: true } },
      featured: true,
      sekiller: { where: { isMain: true }, select: { url: true }, take: 1 },
      updatedAt: true,
    },
  });

  const recipes = rows.map(r => ({
    id: r.id,
    yemeyinAdi: r.yemeyinAdi,
    slug: r.slug,
    kateqoriya: r.kateqoriya.ad,
    cetinlikDerecesi: r.cetinlikDerecesi,
    mense: r.mense?.ad ?? null,
    bolge: r.bolge?.ad ?? null,
    featured: r.featured,
    sekilLinki: r.sekiller[0]?.url ?? '',
    updatedAt: r.updatedAt,
  }));

  return NextResponse.json({ recipes });
}

// POST create new recipe
export async function POST(request: NextRequest) {
  const user = await verifyAdmin(request);
  if (!user) return unauthorizedResponse();

  try {
    const body = await request.json();
    const slug = slugify(body.yemeyinAdi);

    const existing = await prisma.recipe.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: 'Bu adla resept artıq mövcuddur' }, { status: 409 });
    }

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

    const recipe = await prisma.recipe.create({
      data: {
        yemeyinAdi: body.yemeyinAdi,
        slug,
        kateqoriyaId,
        menseId,
        bolgeId,
        hazirlanmaMuddeti: body.hazirlanmaMuddeti,
        cetinlikDerecesi: body.cetinlikDerecesi,
        porsiyaSayi: body.porsiyaSayi,
        tarixiMelumat: body.tarixiMelumat || null,
        teqdimTeklifleri: body.teqdimTeklifleri || null,
        featured: body.featured || false,
        terkibHisseleri: {
          create: ingredients.map((ad, i) => ({ ad, sira: i })),
        },
        addimlar: {
          create: steps.map((metn, i) => ({ metn, sira: i })),
        },
        ...(body.sekilLinki?.trim()
          ? { sekiller: { create: [{ url: body.sekilLinki.trim(), isMain: true }] } }
          : {}),
      },
    });

    return NextResponse.json({ recipe }, { status: 201 });
  } catch (error) {
    console.error('Create recipe error:', error);
    return NextResponse.json({ error: 'Resept yaradıla bilmədi' }, { status: 500 });
  }
}
