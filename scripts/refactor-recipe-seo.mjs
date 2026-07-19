import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const locales = ['ar', 'bn', 'de', 'es', 'fr', 'hi', 'id', 'it', 'ja', 'nl', 'pt', 'ru', 'tr', 'zh'];

function findFunctionEnd(source, startIndex) {
  const signatureEnd = source.indexOf('): Promise<Metadata>', startIndex);
  const braceStart = source.indexOf('{', signatureEnd);
  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let index = braceStart; index < source.length; index += 1) {
    const character = source[index];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (character === '\\') {
      escaped = true;
      continue;
    }
    if (quote) {
      if (character === quote) quote = null;
      continue;
    }
    if (character === '"' || character === "'" || character === '`') {
      quote = character;
      continue;
    }
    if (character === '{') depth += 1;
    if (character === '}') {
      depth -= 1;
      if (depth === 0) return index + 1;
    }
  }

  throw new Error('Unable to find function end');
}

for (const locale of locales) {
  const filePath = path.join(process.cwd(), 'src', 'app', locale, 'recipe', '[slug]', 'page.tsx');
  let source = await readFile(filePath, 'utf8');

  if (!source.includes("@/lib/recipeMetadata")) {
    source = source.replace(
      "import { getRecipeSchema, getBreadcrumbSchema } from '@/lib/seo';",
      "import { getRecipeSchema, getBreadcrumbSchema } from '@/lib/seo';\nimport { getRecipeMetadata } from '@/lib/recipeMetadata';",
    );
  }

  const functionStart = source.indexOf('export async function generateMetadata');
  const duplicateStart = source.indexOf(': Props): Promise<Metadata> {', functionStart);
  if (duplicateStart !== -1) {
    const duplicateEnd = findFunctionEnd(source, duplicateStart);
    source = `${source.slice(0, duplicateStart)}${source.slice(duplicateEnd)}`;
  }

  const functionEnd = findFunctionEnd(source, functionStart);
  const replacement = `export async function generateMetadata({ params }: Props): Promise<Metadata> {\n  const { slug } = await params;\n  const recipe = await getRecipeBySlug(slug, '${locale}');\n\n  if (!recipe) {\n    return { title: 'Recipe not found', robots: { index: false, follow: false } };\n  }\n\n  return getRecipeMetadata(recipe, '${locale}');\n}`;
  source = `${source.slice(0, functionStart)}${replacement}${source.slice(functionEnd)}`;
  source = source.replace('getRecipeSchema(recipe);', `getRecipeSchema(recipe, '${locale}');`);

  await writeFile(filePath, source, 'utf8');
  console.log(`Updated ${locale} recipe route`);
}
