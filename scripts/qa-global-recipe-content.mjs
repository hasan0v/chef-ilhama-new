import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const filePath = path.join(process.cwd(), 'content', 'global-recipes.generated.json');
const data = JSON.parse(await readFile(filePath, 'utf8'));
const selection = JSON.parse(await readFile(path.join(process.cwd(), 'research', 'selected-global-recipes.json'), 'utf8'));
const selectedByName = new Map(selection.recipes.map((recipe) => [recipe.dish, recipe]));

const replacements = [
  [/isteğe bağlıdır/gi, 'istəyə görə'],
  [/isteğe bağlı/gi, 'istəyə görə'],
  [/dadmaq üçün/gi, 'zövqə görə'],
  [/ - dadmaq/gi, ' – zövqə görə'],
  [/əhəng/gi, 'laym'],
  [/qarnir/gi, 'bəzək'],
  [/tortillas/gi, 'tortillalar'],
  [/tortilla(?!l)/gi, 'tortilla'],
  [/bahar soğan/gi, 'göy soğan'],
  [/dikiş tərəfi/gi, 'bükülmüş tərəfi'],
  [/ehtiyat yumurta/gi, 'ayrılmış yumurta'],
  [/xarakterik gövdəsini/gi, 'özünəməxsus qatılığını'],
  [/neytral yağ/gi, 'qoxusuz bitki yağı'],
  [/incə qarğıdalı unu/gi, 'xırda üyüdülmüş qarğıdalı unu'],
  [/yumşaq sərt pendir/gi, 'yumşaq dadlı bərk pendir'],
  [/mərmər ölçülü/gi, 'fındıq boyda'],
  [/bişirilir/gi, 'bişir'],
  [/qırmızı bolqar bibəri/gi, 'qırmızı şirin bibər'],
  [/oregano/gi, 'qurudulmuş mərzə'],
  [/soğan və əhəng/gi, 'göy soğan və laym'],
  [/turşuluq və istilik/gi, 'turşməzə dad və acılıq'],
];

function cleanText(value) {
  let result = value.trim().replaceAll(' - ', ' – ').replaceAll('–-', '–');
  for (const [pattern, replacement] of replacements) result = result.replace(pattern, replacement);
  result = result.replace(/^([a-zəöüğçşı])/u, (letter) => letter.toLocaleUpperCase('az-AZ'));
  return result;
}

for (const recipe of data.recipes) {
  const researched = selectedByName.get(recipe.en.name);
  if (!researched) throw new Error(`Missing selected research row for ${recipe.en.name}`);
  recipe.image = researched.image;
  recipe.sources = [
    ...(researched.wikipediaUrl ? [{ title: `${recipe.en.name} cultural background`, url: researched.wikipediaUrl }] : []),
    { title: `${recipe.en.name} image and license`, url: researched.image.sourceUrl },
  ];
  for (const key of ['name', 'origin', 'region', 'category', 'prepTime', 'difficulty', 'servings', 'history', 'servingSuggestions']) {
    recipe.az[key] = cleanText(recipe.az[key]);
  }
  recipe.az.ingredients = recipe.az.ingredients.map(cleanText);
  recipe.az.instructions = recipe.az.instructions.map(cleanText);
}

const problems = [];
const seen = new Set();
for (const recipe of data.recipes) {
  if (seen.has(recipe.slug)) problems.push(`${recipe.slug}: duplicate slug`);
  seen.add(recipe.slug);
  if (recipe.az.ingredients.length < 5 || recipe.en.ingredients.length !== recipe.az.ingredients.length) problems.push(`${recipe.slug}: ingredient mismatch`);
  if (recipe.az.instructions.length < 3 || recipe.en.instructions.length !== recipe.az.instructions.length) problems.push(`${recipe.slug}: instruction mismatch`);
  for (const locale of ['az', 'en']) {
    for (const field of ['name', 'origin', 'region', 'category', 'prepTime', 'difficulty', 'servings', 'history', 'servingSuggestions']) {
      if (!recipe[locale][field]?.trim()) problems.push(`${recipe.slug}: missing ${locale}.${field}`);
    }
  }
  const publicDomain = /public domain|cc0/i.test(recipe.image?.license ?? '');
  if (!recipe.image?.sourceUrl || !recipe.image?.license || (!publicDomain && !recipe.image?.licenseUrl)) problems.push(`${recipe.slug}: incomplete image attribution`);
}
if (data.recipes.length !== 49) problems.push(`Expected 49 global import recipes, got ${data.recipes.length}`);
if (problems.length) throw new Error(`Content QA failed:\n${problems.join('\n')}`);

data.reviewedAt = new Date().toISOString();
await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
console.log(`Content QA passed: ${data.recipes.length} recipes, ${seen.size} unique slugs.`);
