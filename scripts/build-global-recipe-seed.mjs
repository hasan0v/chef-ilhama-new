import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const contentDir = path.join(process.cwd(), 'content', 'global-recipes');
const batchFiles = (await readdir(contentDir)).filter((name) => name.endsWith('.json')).sort();
const englishRecipes = [];
for (const fileName of batchFiles) {
  englishRecipes.push(...JSON.parse(await readFile(path.join(contentDir, fileName), 'utf8')));
}

const selection = JSON.parse(
  await readFile(path.join(process.cwd(), 'research', 'selected-global-recipes.json'), 'utf8'),
);
const researchByDish = new Map(selection.recipes.map((item) => [item.dish, item]));

const categoryAz = {
  'Soup': 'Şorba',
  'Main course': 'Əsas yemək',
  'Breakfast': 'Səhər yeməyi',
  'Bread and pastry': 'Çörək və xəmir',
  'Appetizer': 'Qəlyanaltı',
  'Salad': 'Salat',
  'Grill': 'Manqal',
  'Dessert': 'Şirniyyat',
};
const difficultyAz = { Easy: 'Asan', Medium: 'Orta', Hard: 'Çətin' };
const originAz = {
  Paraguay: 'Paraqvay', Mexico: 'Meksika', Albania: 'Albaniya', Bolivia: 'Boliviya', Ecuador: 'Ekvador',
  Tunisia: 'Tunis', France: 'Fransa', India: 'Hindistan', Greece: 'Yunanıstan', Palestine: 'Fələstin',
  Italy: 'İtaliya', Peru: 'Peru', China: 'Çin', Lebanon: 'Livan', Chile: 'Çili', Lithuania: 'Litva',
  "Côte d'Ivoire": 'Kot-d’İvuar', 'South Korea': 'Cənubi Koreya', Japan: 'Yaponiya', Morocco: 'Mərakeş',
  Guatemala: 'Qvatemala', Laos: 'Laos', Armenia: 'Ermənistan', Brazil: 'Braziliya', Tajikistan: 'Tacikistan',
  Thailand: 'Tailand', Vanuatu: 'Vanuatu', 'Trinidad and Tobago': 'Trinidad və Tobaqo', Estonia: 'Estoniya',
  Ethiopia: 'Efiopiya', Portugal: 'Portuqaliya', Malaysia: 'Malayziya', Latvia: 'Latviya', Nepal: 'Nepal',
  Ukraine: 'Ukrayna', Cambodia: 'Kamboca', Cameroon: 'Kamerun', Eritrea: 'Eritreya', Indonesia: 'İndoneziya',
};

async function translate(text, attempt = 0) {
  const url = new URL('https://translate.googleapis.com/translate_a/single');
  url.searchParams.set('client', 'gtx');
  url.searchParams.set('sl', 'en');
  url.searchParams.set('tl', 'az');
  url.searchParams.set('dt', 't');
  url.searchParams.set('q', text);

  const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!response.ok) {
    if (attempt < 4) {
      await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
      return translate(text, attempt + 1);
    }
    throw new Error(`Translation failed: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  return data[0].map((part) => part[0]).join('');
}

function getTranslatableFields(recipe) {
  return [
    recipe.region,
    recipe.prepTime,
    recipe.servings,
    recipe.history,
    recipe.servingSuggestions,
    ...recipe.ingredients,
    ...recipe.instructions,
  ];
}

const uniqueTexts = [...new Set(englishRecipes.flatMap(getTranslatableFields))];
const translations = new Map();
let translationCursor = 0;
let translatedCount = 0;

async function translationWorker() {
  while (translationCursor < uniqueTexts.length) {
    const index = translationCursor++;
    const source = uniqueTexts[index];
    translations.set(source, await translate(source));
    translatedCount += 1;
    if (translatedCount % 50 === 0 || translatedCount === uniqueTexts.length) {
      console.log(`Translated ${translatedCount}/${uniqueTexts.length} text fields`);
    }
    await new Promise((resolve) => setTimeout(resolve, 80));
  }
}

await Promise.all(Array.from({ length: 6 }, () => translationWorker()));

function localizeRecipe(recipe) {
  const fields = [
    recipe.region,
    recipe.prepTime,
    recipe.servings,
    recipe.history,
    recipe.servingSuggestions,
    ...recipe.ingredients,
    ...recipe.instructions,
  ];
  const translated = fields.map((field) => translations.get(field));

  let cursor = 0;
  const region = translated[cursor++];
  const prepTime = translated[cursor++];
  const servings = translated[cursor++];
  const history = translated[cursor++];
  const servingSuggestions = translated[cursor++];
  const ingredients = translated.slice(cursor, cursor + recipe.ingredients.length);
  cursor += recipe.ingredients.length;
  const instructions = translated.slice(cursor, cursor + recipe.instructions.length);

  return {
    name: recipe.name,
    origin: originAz[recipe.origin] ?? recipe.origin,
    region,
    category: categoryAz[recipe.category] ?? recipe.category,
    prepTime,
    difficulty: difficultyAz[recipe.difficulty] ?? recipe.difficulty,
    servings,
    history,
    servingSuggestions,
    ingredients,
    instructions,
  };
}

const generated = [];
const batchSize = 4;
for (let index = 0; index < englishRecipes.length; index += batchSize) {
  const batch = englishRecipes.slice(index, index + batchSize);
  const localized = batch.map(localizeRecipe);
  for (let offset = 0; offset < batch.length; offset += 1) {
    const recipe = batch[offset];
    const research = researchByDish.get(recipe.name);
    if (!research) throw new Error(`Research record not found for ${recipe.name}`);
    generated.push({
      slug: recipe.slug,
      en: recipe,
      az: localized[offset],
      image: research.image,
      sources: [
        ...(research.wikipediaUrl ? [{ title: `${recipe.name} cultural background`, url: research.wikipediaUrl }] : []),
        { title: `${recipe.name} image and license`, url: research.image.sourceUrl },
      ],
      research: {
        annualWikipediaViews: research.annualWikipediaViews,
        recipeIntentSuggestions: research.recipeIntentSuggestions,
        exactRecipeResultCount: research.exactRecipeResultCount,
        opportunityScore: research.opportunityScore,
      },
    });
  }
  console.log(`Localized ${Math.min(index + batchSize, englishRecipes.length)}/${englishRecipes.length}`);
}

const slugs = new Set(generated.map((recipe) => recipe.slug));
if (generated.length !== 50 || slugs.size !== 50) {
  throw new Error(`Expected 50 unique recipes, got ${generated.length} rows and ${slugs.size} slugs`);
}

const outputPath = path.join(process.cwd(), 'content', 'global-recipes.generated.json');
await writeFile(outputPath, `${JSON.stringify({ generatedAt: new Date().toISOString(), recipes: generated }, null, 2)}\n`, 'utf8');
console.log(`Wrote ${generated.length} bilingual recipes to ${outputPath}`);
