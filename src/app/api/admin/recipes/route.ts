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

// GET all recipes (admin list)
export async function GET(request: NextRequest) {
  const user = await verifyAdmin(request);
  if (!user) return unauthorizedResponse();

  const recipes = await prisma.recipe.findMany({
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      yemeyinAdi: true,
      slug: true,
      kateqoriya: true,
      cetinlikDerecesi: true,
      mense: true,
      bolge: true,
      featured: true,
      sekilLinki: true,
      updatedAt: true,
    },
  });

  return NextResponse.json({ recipes });
}

// POST create new recipe
export async function POST(request: NextRequest) {
  const user = await verifyAdmin(request);
  if (!user) return unauthorizedResponse();

  try {
    const body = await request.json();
    const slug = slugify(body.yemeyinAdi);

    // Check for duplicate slug
    const existing = await prisma.recipe.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: 'Bu adla resept artıq mövcuddur' }, { status: 409 });
    }

    const recipe = await prisma.recipe.create({
      data: {
        yemeyinAdi: body.yemeyinAdi,
        slug,
        mense: body.mense || '',
        bolge: body.bolge || '',
        kateqoriya: body.kateqoriya,
        terkibHisseleri: body.terkibHisseleri,
        hazirlanmaQaydasi: body.hazirlanmaQaydasi,
        hazirlanmaMuddeti: body.hazirlanmaMuddeti,
        cetinlikDerecesi: body.cetinlikDerecesi,
        porsiyaSayi: body.porsiyaSayi,
        tarixiMelumat: body.tarixiMelumat || '',
        teqdimTeklifleri: body.teqdimTeklifleri || '',
        sekilLinki: body.sekilLinki || '/placeholder-recipe.svg',
        featured: body.featured || false,
      },
    });

    return NextResponse.json({ recipe }, { status: 201 });
  } catch (error) {
    console.error('Create recipe error:', error);
    return NextResponse.json({ error: 'Failed to create recipe' }, { status: 500 });
  }
}
