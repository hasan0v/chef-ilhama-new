import { access, mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const sourcePath = path.join(root, 'content', 'global-recipes.generated.json');
const outputDir = path.join(root, 'public', 'images', 'recipes', 'global');
const researchDir = path.join(root, 'research');
const { recipes } = JSON.parse(await readFile(sourcePath, 'utf8'));
const forceRefresh = new Set(process.argv.slice(2));

await mkdir(outputDir, { recursive: true });

async function download(url, attempt = 0) {
  const response = await fetch(url, {
    redirect: 'follow',
    headers: {
      'User-Agent': 'ChefIlhamaRecipeResearch/1.0 (https://chef-ilhama.food)',
      Accept: 'image/avif,image/webp,image/png,image/jpeg,*/*',
    },
  });
  if (!response.ok) {
    if (attempt < 6) {
      const retryAfter = Number(response.headers.get('retry-after')) || 0;
      await new Promise((resolve) => setTimeout(resolve, Math.max(retryAfter * 1000, 2500 * (attempt + 1))));
      return download(url, attempt + 1);
    }
    throw new Error(`Image download failed (${response.status}): ${url}`);
  }
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.startsWith('image/')) throw new Error(`Not an image (${contentType}): ${url}`);
  return Buffer.from(await response.arrayBuffer());
}

const manifest = [];
for (let index = 0; index < recipes.length; index += 1) {
  const recipe = recipes[index];
  const outputPath = path.join(outputDir, `${recipe.slug}.webp`);
  let info;
  let downloaded = false;
  try {
    if (forceRefresh.has(recipe.slug)) throw new Error('Refresh requested');
    await access(outputPath);
    const existing = await sharp(outputPath).metadata();
    const file = await stat(outputPath);
    info = { width: existing.width, height: existing.height, size: file.size };
  } catch {
    downloaded = true;
    const input = await download(recipe.image.downloadUrl || recipe.image.originalUrl);
    const metadata = await sharp(input).metadata();
    if (!metadata.width || !metadata.height) throw new Error(`Unreadable image for ${recipe.slug}`);
    info = await sharp(input)
      .rotate()
      .resize(1400, 1050, { fit: 'cover', position: 'attention', withoutEnlargement: false })
      .webp({ quality: 84, effort: 5 })
      .toFile(outputPath);
  }

  manifest.push({
    slug: recipe.slug,
    path: `/images/recipes/global/${recipe.slug}.webp`,
    width: info.width,
    height: info.height,
    bytes: info.size,
    sourceUrl: recipe.image.sourceUrl,
    author: recipe.image.author,
    credit: recipe.image.credit,
    license: recipe.image.license,
    licenseUrl: recipe.image.licenseUrl,
  });
  console.log(`Prepared ${index + 1}/${recipes.length}: ${recipe.slug}`);
  if (downloaded) await new Promise((resolve) => setTimeout(resolve, 650));
}

const thumbWidth = 280;
const thumbHeight = 210;
const columns = 5;
const rows = Math.ceil(manifest.length / columns);
const labels = [];
const composites = [];
for (let index = 0; index < manifest.length; index += 1) {
  const x = (index % columns) * thumbWidth;
  const y = Math.floor(index / columns) * (thumbHeight + 34);
  const thumb = await sharp(path.join(outputDir, `${manifest[index].slug}.webp`))
    .resize(thumbWidth, thumbHeight, { fit: 'cover' })
    .png()
    .toBuffer();
  composites.push({ input: thumb, left: x, top: y });
  labels.push(`<text x="${x + 8}" y="${y + thumbHeight + 23}" font-size="14" fill="#f8efe3">${index + 1}. ${manifest[index].slug.slice(0, 30)}</text>`);
}
const sheetWidth = columns * thumbWidth;
const sheetHeight = rows * (thumbHeight + 34);
const labelLayer = Buffer.from(`<svg width="${sheetWidth}" height="${sheetHeight}" xmlns="http://www.w3.org/2000/svg">${labels.join('')}</svg>`);
await sharp({ create: { width: sheetWidth, height: sheetHeight, channels: 3, background: '#171310' } })
  .composite([...composites, { input: labelLayer, left: 0, top: 0 }])
  .png()
  .toFile(path.join(researchDir, 'global-recipes-contact-sheet.png'));

await writeFile(
  path.join(researchDir, 'global-recipe-images.json'),
  `${JSON.stringify({ generatedAt: new Date().toISOString(), images: manifest }, null, 2)}\n`,
  'utf8',
);
console.log(`Wrote ${manifest.length} optimized images and the QA contact sheet.`);
