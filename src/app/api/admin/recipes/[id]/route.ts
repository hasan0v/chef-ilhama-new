import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, unauthorizedResponse } from '@/lib/admin-auth';
import { getRecipeIndexNowUrls, notifyIndexNow } from '@/lib/indexNow';
import { prisma } from '@/lib/prisma';

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

const include = {
  kateqoriya: true,
  mense: true,
  bolge: true,
  terkibHisseleri: { 
    orderBy: { sira: 'asc' as const },
    include: { miqdar: true }
  },
  addimlar: { orderBy: { sira: 'asc' as const } },
  sekiller: true,
} as const;

// GET single recipe
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await verifyAdmin(request);
    if (!user) return unauthorizedResponse();

    const { id } = await params;
    const recipe = await prisma.recipe.findUnique({ where: { id }, include });
    if (!recipe) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json({ recipe });
  } catch (error) {
    console.error('GET recipe error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
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
        yemeyinAdiEn: body.yemeyinAdiEn || null,
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
        featured: body.featured,
        terkibHisseleri: { create: ingredientData },
        addimlar: { create: steps.map((metn, i) => ({ metn, metnEn: stepsEn[i] || null, sira: i })) },
      },
      include,
    });

    try {
      await notifyIndexNow(getRecipeIndexNowUrls(recipe.slug));
    } catch (indexNowError) {
      console.error('IndexNow update notification failed:', indexNowError);
    }

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
    const recipe = await prisma.recipe.findUnique({ where: { id }, select: { slug: true } });
    await prisma.recipe.delete({ where: { id } });
    if (recipe) {
      try {
        await notifyIndexNow(getRecipeIndexNowUrls(recipe.slug));
      } catch (indexNowError) {
        console.error('IndexNow delete notification failed:', indexNowError);
      }
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete recipe error:', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}

