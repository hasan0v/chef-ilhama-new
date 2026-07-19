import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, unauthorizedResponse } from '@/lib/admin-auth';
import { getRecipeIndexNowUrls, notifyIndexNow } from '@/lib/indexNow';
import { prisma } from '@/lib/prisma';

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
  ad: string,
  adEn?: string | null
): Promise<string | null> {
  if (!ad || !ad.trim()) return null;
  const val = ad.trim();
  const valEn = adEn?.trim() || null;
  if (table === 'category') {
    const r = await prisma.category.upsert({
      where: { ad: val },
      create: { ad: val, adEn: valEn },
      update: valEn ? { adEn: valEn } : {},
    });
    return r.id;
  }
  if (table === 'mense') {
    const r = await prisma.mense.upsert({
      where: { ad: val },
      create: { ad: val, adEn: valEn },
      update: valEn ? { adEn: valEn } : {},
    });
    return r.id;
  }
  const r = await prisma.bolge.upsert({
    where: { ad: val },
    create: { ad: val, adEn: valEn },
    update: valEn ? { adEn: valEn } : {},
  });
  return r.id;
}

function parseIngredientString(item: string) {
  let parts = item.split('–');
  if (parts.length < 2) {
    parts = item.split(' - ');
  }
  if (parts.length < 2 && item.includes(' -')) {
    parts = item.split(' -');
  }
  if (parts.length < 2 && item.includes('- ')) {
    parts = item.split('- ');
  }

  if (parts.length >= 2) {
    return {
      ad: parts[0].trim(),
      miqdarText: parts.slice(1).join('–').trim(),
    };
  }
  return {
    ad: item.trim(),
    miqdarText: null,
  };
}

async function upsertIngredientQuantity(miqdarText: string, miqdarTextEn?: string | null): Promise<string> {
  const trimmed = miqdarText.trim();
  const match = trimmed.match(/^([0-9\-+\s½¼¾/.,]+)?\s*(.*)$/);
  let miqdar: string | null = null;
  let ad = '';
  if (match) {
    miqdar = match[1]?.trim() || null;
    ad = match[2]?.trim() || '';
  } else {
    ad = trimmed;
  }
  if (!ad) {
    ad = 'ədəd';
  }

  let adEn: string | null = null;
  if (miqdarTextEn) {
    const trimmedEn = miqdarTextEn.trim();
    const matchEn = trimmedEn.match(/^([0-9\-+\s½¼¾/.,]+)?\s*(.*)$/);
    if (matchEn) {
      adEn = matchEn[2]?.trim() || null;
    } else {
      adEn = trimmedEn;
    }
  }

  const existing = await prisma.ingredientQuantity.findFirst({
    where: { ad, miqdar },
  });

  if (existing) {
    if (adEn && !existing.adEn) {
      await prisma.ingredientQuantity.update({
        where: { id: existing.id },
        data: { adEn },
      });
    }
    return existing.id;
  }

  const created = await prisma.ingredientQuantity.create({
    data: { ad, miqdar, adEn },
  });

  return created.id;
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
      upsertLookup('mense', body.mense, body.menseEn),
      upsertLookup('bolge', body.bolge, body.bolgeEn),
    ]);

    if (!kateqoriyaId) {
      return NextResponse.json({ error: 'Kateqoriya mütləqdir' }, { status: 400 });
    }

    const cetinlikRow = await prisma.cetinlik.findFirst({ where: { ad: body.cetinlikDerecesi } });
    const cetinlikDerecesiEn = cetinlikRow?.adEn || null;

    const muddetRow = await prisma.muddet.findFirst({ where: { ad: body.hazirlanmaMuddeti } });
    const hazirlanmaMuddetiEn = muddetRow?.adEn || null;

    let porsiyaSayiEn: string | null = null;
    if (body.porsiyaSayi) {
      let adVal = body.porsiyaSayi;
      let miqdarVal: string | null = null;
      const match = body.porsiyaSayi.match(/^([0-9\-+\s½¼¾/]+)?\s*(.*)$/);
      if (match) {
        const pm = match[1]?.trim();
        const pa = match[2]?.trim();
        if (pm) {
          miqdarVal = pm;
          adVal = pa || 'nəfərlik';
        }
      }
      const porsiyaRow = await prisma.porsiya.findFirst({ where: { ad: adVal, miqdar: miqdarVal } });
      porsiyaSayiEn = porsiyaRow?.adEn
        ? (miqdarVal ? `${miqdarVal} ${porsiyaRow.adEn}` : porsiyaRow.adEn)
        : (miqdarVal ? `${miqdarVal} persons` : null);
    }

    const ingredients: string[] = Array.isArray(body.terkibHisseleri)
      ? body.terkibHisseleri.filter((s: string) => s.trim())
      : [];
    const ingredientsEn: string[] = Array.isArray(body.terkibHisseleriEn)
      ? body.terkibHisseleriEn
      : [];
    const steps: string[] = Array.isArray(body.addimlar)
      ? body.addimlar.filter((s: string) => s.trim())
      : [];
    const stepsEn: string[] = Array.isArray(body.addimlarEn)
      ? body.addimlarEn
      : [];

    const ingredientData = [];
    for (let i = 0; i < ingredients.length; i++) {
      const item = ingredients[i];
      const itemEn = ingredientsEn[i];
      const { ad, miqdarText } = parseIngredientString(item);
      let adEn: string | null = null;
      let miqdarTextEn: string | null = null;

      if (itemEn) {
        const parsedEn = parseIngredientString(itemEn);
        adEn = parsedEn.ad;
        miqdarTextEn = parsedEn.miqdarText;
      }

      let miqdarId: string | null = null;
      if (miqdarText) {
        miqdarId = await upsertIngredientQuantity(miqdarText, miqdarTextEn);
      }
      ingredientData.push({
        ad,
        adEn,
        miqdarId,
        sira: i,
      });
    }

    const recipe = await prisma.recipe.create({
      data: {
        yemeyinAdi: body.yemeyinAdi,
        yemeyinAdiEn: body.yemeyinAdiEn || null,
        slug,
        kateqoriyaId,
        menseId,
        bolgeId,
        hazirlanmaMuddeti: body.hazirlanmaMuddeti,
        hazirlanmaMuddetiEn,
        cetinlikDerecesi: body.cetinlikDerecesi,
        cetinlikDerecesiEn,
        porsiyaSayi: body.porsiyaSayi,
        porsiyaSayiEn,
        tarixiMelumat: body.tarixiMelumat || null,
        tarixiMelumatEn: body.tarixiMelumatEn || null,
        teqdimTeklifleri: body.teqdimTeklifleri || null,
        teqdimTeklifleriEn: body.teqdimTeklifleriEn || null,
        featured: body.featured || false,
        terkibHisseleri: {
          create: ingredientData,
        },
        addimlar: {
          create: steps.map((metn, i) => ({ metn, metnEn: stepsEn[i] || null, sira: i })),
        },
        ...(body.sekilLinki?.trim()
          ? { sekiller: { create: [{ url: body.sekilLinki.trim(), isMain: true }] } }
          : {}),
      },
    });

    try {
      await notifyIndexNow(getRecipeIndexNowUrls(recipe.slug));
    } catch (indexNowError) {
      console.error('IndexNow create notification failed:', indexNowError);
    }

    return NextResponse.json({ recipe }, { status: 201 });
  } catch (error) {
    console.error('Create recipe error:', error);
    return NextResponse.json({ error: 'Resept yaradıla bilmədi' }, { status: 500 });
  }
}
