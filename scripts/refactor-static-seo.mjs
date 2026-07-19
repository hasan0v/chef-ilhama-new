import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const locales = ['ar', 'bn', 'de', 'en', 'es', 'fr', 'hi', 'id', 'it', 'ja', 'nl', 'pt', 'ru', 'tr', 'zh'];
const pages = [
  ['home', 'page.tsx'],
  ['recipes', 'recipes/page.tsx'],
  ['services', 'services/page.tsx'],
  ['about', 'about/page.tsx'],
  ['contact', 'contact/page.tsx'],
  ['privacy', 'privacy/page.tsx'],
  ['terms', 'terms/page.tsx'],
];
const azPages = [
  ['home', 'src/app/page.tsx'],
  ['recipes', 'src/app/reseptler/page.tsx'],
  ['services', 'src/app/xidmetler/page.tsx'],
  ['about', 'src/app/haqqinda/page.tsx'],
  ['contact', 'src/app/elaqe/page.tsx'],
  ['privacy', 'src/app/privacy/page.tsx'],
  ['terms', 'src/app/terms/page.tsx'],
];

function findMatchingBrace(source, braceStart) {
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
      if (depth === 0) return index;
    }
  }
  throw new Error('Unable to match metadata object');
}

async function updateFile(locale, kind, relativePath) {
  const filePath = path.join(process.cwd(), relativePath);
  let source = await readFile(filePath, 'utf8');
  if (source.includes(`withLocaleAlternates('${locale}', '${kind}'`)) return;

  const exportMatch = source.match(/export const metadata(?::\s*Metadata)?\s*=\s*/);
  if (!exportMatch?.index) throw new Error(`Metadata export not found: ${relativePath}`);
  const objectStart = source.indexOf('{', exportMatch.index + exportMatch[0].length);
  const objectEnd = findMatchingBrace(source, objectStart);
  const objectSource = source.slice(objectStart, objectEnd + 1);
  const replacement = `${exportMatch[0]}withLocaleAlternates('${locale}', '${kind}', ${objectSource})`;
  source = `${source.slice(0, exportMatch.index)}${replacement}${source.slice(objectEnd + 1)}`;
  source = `import { withLocaleAlternates } from '@/lib/seoLocales';\n${source}`;
  await writeFile(filePath, source, 'utf8');
  console.log(`Updated ${locale}/${kind}`);
}

for (const [kind, relativePath] of azPages) {
  await updateFile('az', kind, relativePath);
}

for (const locale of locales) {
  for (const [kind, subPath] of pages) {
    await updateFile(locale, kind, `src/app/${locale}/${subPath}`);
  }
}
