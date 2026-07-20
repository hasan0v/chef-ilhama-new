import { readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { getRecipeBySlug } from '@/lib/recipes';
import {
  RECIPE_IMAGE_VARIANTS,
  type RecipeImageVariant,
} from '@/lib/recipeImageVariants';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const CACHE_CONTROL = 'public, max-age=86400, s-maxage=2592000, stale-while-revalidate=604800';
const MAX_SOURCE_BYTES = 20 * 1024 * 1024;
const ALLOWED_REMOTE_HOSTS = new Set([
  'flavorsofbaku.com',
  'azcookbook.com',
  'nationalfoods.org',
  'cms.seasonedtraveller.com',
  'i.imgur.com',
  'v3.fal.media',
  'axscxlqiwpfxizjgaqsp.supabase.co',
]);

function parseVariant(value: string): RecipeImageVariant | null {
  const match = value.match(/^(1x1|4x3|16x9)\.jpg$/);
  return match ? match[1] as RecipeImageVariant : null;
}

async function loadLocalImage(imagePath: string) {
  const publicRoot = path.resolve(process.cwd(), 'public');
  const resolvedPath = path.resolve(publicRoot, imagePath.replace(/^[/\\]+/, ''));
  const relativePath = path.relative(publicRoot, resolvedPath);

  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    throw new Error('Recipe image resolved outside the public directory');
  }

  return readFile(resolvedPath);
}

async function loadRemoteImage(imageUrl: string) {
  const parsedUrl = new URL(imageUrl);
  if (parsedUrl.protocol !== 'https:' || !ALLOWED_REMOTE_HOSTS.has(parsedUrl.hostname)) {
    throw new Error('Recipe image host is not allowed');
  }

  const response = await fetch(imageUrl, {
    signal: AbortSignal.timeout(12_000),
    headers: { 'User-Agent': 'ChefIlhamaImageRenderer/1.0' },
  });

  if (!response.ok) throw new Error(`Upstream image returned ${response.status}`);

  const contentLength = Number(response.headers.get('content-length') || 0);
  if (contentLength > MAX_SOURCE_BYTES) throw new Error('Upstream image is too large');

  const source = Buffer.from(await response.arrayBuffer());
  if (source.byteLength > MAX_SOURCE_BYTES) throw new Error('Upstream image is too large');
  return source;
}

async function loadRecipeImage(image: string | null | undefined) {
  if (!image) return loadLocalImage('/placeholder-food.svg');
  if (/^https?:\/\//i.test(image)) return loadRemoteImage(image);
  return loadLocalImage(image);
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string; variant: string }> },
) {
  const { slug, variant: rawVariant } = await params;
  const variant = parseVariant(rawVariant);
  if (!variant) return new Response('Not found', { status: 404 });

  const recipe = await getRecipeBySlug(slug, 'az');
  if (!recipe) return new Response('Not found', { status: 404 });

  try {
    const source = await loadRecipeImage(recipe.image);
    const dimensions = RECIPE_IMAGE_VARIANTS[variant];
    const image = await sharp(source)
      .rotate()
      .resize(dimensions.width, dimensions.height, {
        fit: 'cover',
        position: 'attention',
      })
      .jpeg({ quality: 88, progressive: true, mozjpeg: true })
      .toBuffer();

    return new Response(new Uint8Array(image), {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': CACHE_CONTROL,
        'Content-Length': String(image.byteLength),
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error(`Failed to render recipe image variant for ${slug}`, error);
    return new Response('Image unavailable', { status: 502 });
  }
}
