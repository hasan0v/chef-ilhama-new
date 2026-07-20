import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const selectedDishes = [
  'Vori-vori', 'Papadzules', 'Tavë kosi', 'Sopa de maní', 'Llapingachos',
  'Lablabi', 'Piperade', 'Salteñas', 'Pakhala bhata', 'Undhiyu',
  'Strapatsada', 'Chipa guasu', 'Silpancho', 'Musakhan', 'Fregola con arselle',
  'Conchitas a la parmesana', 'Liangpi', 'Sayadieh', 'Carapulcra', 'Charquicán',
  'Fanesca', 'Cepelinai', 'Kedjenou', 'Kongguksu', 'Hiyashi chūka',
  'Rfissa', 'Ochazuke', 'Eromba', 'Pepián', 'Nam khao',
  'Baião de dois', 'Yakgwa', 'Qurutob', 'Sai ua',
  'Laplap', 'Pelau', 'Mulgipuder', 'Shiro wat', 'Açorda alentejana',
  'Otak-otak', 'Sklandrausis', 'Yomari', 'Canederli', 'Banosh',
  'Num banh chok', 'Ndolé', 'Zigni', 'Asam pedas', 'Mie Aceh',
];

const openverseOverrides = {
  'Conchitas a la parmesana': 'af9c6425-c08e-4a93-8339-c71aa152593c',
  Liangpi: '78bda603-5290-4d52-993d-11c3e54d58bf',
  'Nam khao': '457e7ec1-035f-4298-bd09-8447f3060be7',
};

const commonsOverrides = {
  Kongguksu: 'File:Korean noodles-Kongguksu-01.jpg',
  Qurutob: 'File:Kurutob Tajikistan.JPG',
  Laplap: 'File:Laplap sosor.jpg',
};

const headers = {
  'User-Agent': 'ChefIlhamaRecipeResearch/1.0 (https://chef-ilhama.food; contact@chef-ilhama.food)',
};

function stripHtml(value = '') {
  return value.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').trim();
}

async function fetchJson(url) {
  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  return response.json();
}

async function getOpenverseImage(id) {
  const image = await fetchJson(`https://api.openverse.org/v1/images/${id}/`);
  return {
    title: image.title,
    sourceUrl: image.foreign_landing_url,
    originalUrl: image.url,
    downloadUrl: image.url,
    width: image.width,
    height: image.height,
    author: image.creator,
    license: image.license?.toUpperCase(),
    licenseUrl: image.license_url,
    credit: image.attribution,
    provider: 'Openverse',
  };
}

async function getCommonsImage(title) {
  const data = await fetchJson(
    `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url%7Cextmetadata&iiurlwidth=1600&format=json&origin=*`,
  );
  const page = Object.values(data.query.pages)[0];
  const info = page.imageinfo[0];
  return {
    title,
    sourceUrl: info.descriptionurl,
    originalUrl: info.url,
    downloadUrl: info.thumburl ?? info.url,
    width: info.thumbwidth ?? info.width,
    height: info.thumbheight ?? info.height,
    author: stripHtml(info.extmetadata?.Artist?.value),
    license: info.extmetadata?.LicenseShortName?.value,
    licenseUrl: info.extmetadata?.LicenseUrl?.value,
    credit: stripHtml(info.extmetadata?.Credit?.value),
    provider: 'Wikimedia Commons',
  };
}

const researchPath = path.join(process.cwd(), 'research', 'global-recipe-opportunities.json');
const research = JSON.parse(await readFile(researchPath, 'utf8'));
const byDish = new Map(research.candidates.map((candidate) => [candidate.dish, candidate]));
const selected = [];

for (const dish of selectedDishes) {
  const candidate = byDish.get(dish);
  if (!candidate) throw new Error(`Missing researched candidate: ${dish}`);

  let image = candidate.image;
  if (openverseOverrides[dish]) image = await getOpenverseImage(openverseOverrides[dish]);
  if (commonsOverrides[dish]) image = await getCommonsImage(commonsOverrides[dish]);
  if (!image) throw new Error(`No licensed image selected for ${dish}`);

  selected.push({ ...candidate, image });
}

const outputPath = path.join(process.cwd(), 'research', 'selected-global-recipes.json');
await writeFile(outputPath, `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  count: selected.length,
  selectionMethod: 'Balanced 50-dish shortlist from the measured 70-candidate opportunity set, with geographic diversity and exact-image review.',
  recipes: selected,
}, null, 2)}\n`, 'utf8');

console.log(`Saved ${selected.length} selected recipes to ${outputPath}`);
console.table(selected.map((item, index) => ({
  rank: index + 1,
  dish: item.dish,
  country: item.country,
  views: item.annualWikipediaViews,
  intents: item.recipeIntentSuggestions.length,
  score: item.opportunityScore,
  license: item.image.license,
})));
