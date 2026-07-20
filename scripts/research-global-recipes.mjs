import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const candidates = [
  ['Vori-vori', 'Paraguay', 'Vori-vori', 'south-america'],
  ['Chipa guasu', 'Paraguay', 'Chipa guasu', 'south-america'],
  ['Sopa de maní', 'Bolivia', 'Sopa de maní', 'south-america'],
  ['Silpancho', 'Bolivia', 'Silpancho', 'south-america'],
  ['Llapingachos', 'Ecuador', 'Llapingacho', 'south-america'],
  ['Fanesca', 'Ecuador', 'Fanesca', 'south-america'],
  ['Carapulcra', 'Peru', 'Carapulcra', 'south-america'],
  ['Conchitas a la parmesana', 'Peru', 'Conchitas a la parmesana', 'south-america'],
  ['Charquicán', 'Chile', 'Charquicán', 'south-america'],
  ['Baião de dois', 'Brazil', 'Baião de dois', 'south-america'],
  ['Pica-pau', 'Portugal', 'Pica-pau (dish)', 'europe'],
  ['Açorda alentejana', 'Portugal', 'Açorda', 'europe'],
  ['Canederli', 'Italy', 'Canederli', 'europe'],
  ['Fregola con arselle', 'Italy', 'Fregula', 'europe'],
  ['Piperade', 'France', 'Piperade', 'europe'],
  ['Sklandrausis', 'Latvia', 'Sklandrausis', 'europe'],
  ['Mulgipuder', 'Estonia', 'Mulgipuder', 'europe'],
  ['Cepelinai', 'Lithuania', 'Cepelinai', 'europe'],
  ['Banosh', 'Ukraine', 'Banosh', 'europe'],
  ['Tavë kosi', 'Albania', 'Tavë kosi', 'europe'],
  ['Klepe', 'Bosnia and Herzegovina', 'Klepe (food)', 'europe'],
  ['Ciorbă rădăuțeană', 'Romania', 'Ciorbă rădăuțeană', 'europe'],
  ['Strapatsada', 'Greece', 'Strapatsada', 'europe'],
  ['Hünkar beğendi', 'Türkiye', 'Hünkar beğendi', 'west-asia'],
  ['Chkmeruli', 'Georgia', 'Chkmeruli', 'west-asia'],
  ['Qurutob', 'Tajikistan', 'Qurutob', 'central-asia'],
  ['Mastava', 'Uzbekistan', 'Mastava', 'central-asia'],
  ['Yomari', 'Nepal', 'Yomari', 'south-asia'],
  ['Chatamari', 'Nepal', 'Chatamari', 'south-asia'],
  ['Eromba', 'India', 'Eromba', 'south-asia'],
  ['Pakhala bhata', 'India', 'Pakhala', 'south-asia'],
  ['Undhiyu', 'India', 'Undhiyu', 'south-asia'],
  ['Hakka salt-baked chicken', 'China', 'Salt baked chicken', 'east-asia'],
  ['Liangpi', 'China', 'Liangpi', 'east-asia'],
  ['Ochazuke', 'Japan', 'Chazuke', 'east-asia'],
  ['Hiyashi chūka', 'Japan', 'Hiyashi chūka', 'east-asia'],
  ['Kongguksu', 'South Korea', 'Kong-guksu', 'east-asia'],
  ['Yakgwa', 'South Korea', 'Yakgwa', 'east-asia'],
  ['Nam khao', 'Laos', 'Nam khao', 'southeast-asia'],
  ['Or lam', 'Laos', 'Or lam', 'southeast-asia'],
  ['Num banh chok', 'Cambodia', 'Num banhchok', 'southeast-asia'],
  ['Mie Aceh', 'Indonesia', 'Mie Aceh', 'southeast-asia'],
  ['Ayam woku', 'Indonesia', 'Ayam woku', 'southeast-asia'],
  ['Khao yum', 'Thailand', 'Khao yum', 'southeast-asia'],
  ['Sai ua', 'Thailand', 'Sai ua', 'southeast-asia'],
  ['Otak-otak', 'Malaysia', 'Otak-otak', 'southeast-asia'],
  ['Asam pedas', 'Malaysia', 'Asam pedas', 'southeast-asia'],
  ['Shiro wat', 'Ethiopia', 'Shiro (food)', 'africa'],
  ['Zigni', 'Eritrea', 'Zigni', 'africa'],
  ['Kedjenou', "Côte d'Ivoire", 'Kedjenou', 'africa'],
  ['Ndolé', 'Cameroon', 'Ndolé', 'africa'],
  ['Red red', 'Ghana', 'Red red (Ghanaian dish)', 'africa'],
  ['Matapa', 'Mozambique', 'Matapa', 'africa'],
  ['Lablabi', 'Tunisia', 'Lablabi', 'africa'],
  ['Rfissa', 'Morocco', 'Rfissa', 'africa'],
  ['Sayadieh', 'Lebanon', 'Sayadieh', 'west-asia'],
  ['Musakhan', 'Palestine', 'Musakhan', 'west-asia'],
  ['Diri ak djon djon', 'Haiti', 'Diri ak djon djon', 'caribbean'],
  ['Kokoda', 'Fiji', 'Kokoda (dish)', 'oceania'],
  ['Palusami', 'Samoa', 'Palusami', 'oceania'],
  ['Laplap', 'Vanuatu', 'Laplap', 'oceania'],
  ['Salteñas', 'Bolivia', 'Salteña', 'south-america'],
  ['Papadzules', 'Mexico', 'Papadzules', 'central-america'],
  ['Sikil pak', 'Mexico', 'Sikil pak', 'central-america'],
  ['Pepián', 'Guatemala', 'Pepián', 'central-america'],
  ['Hudut', 'Belize', 'Hudut (dish)', 'central-america'],
  ['Rondón', 'Nicaragua and Caribbean coast', 'Rondón', 'central-america'],
  ['Pastelón', 'Puerto Rico', 'Pastelón', 'caribbean'],
  ['Pelau', 'Trinidad and Tobago', 'Pelau', 'caribbean'],
].map(([dish, country, wikiTitle, region]) => ({ dish, country, wikiTitle, region }));

const headers = {
  'User-Agent': 'ChefIlhamaRecipeResearch/1.0 (https://chef-ilhama.food; contact@chef-ilhama.food)',
};

function stripHtml(value = '') {
  return value.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').trim();
}

function searchableTokens(value = '') {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length >= 3 && !['dish', 'food', 'recipe'].includes(token));
}

function tokenOverlap(a, b) {
  const aTokens = searchableTokens(a);
  const bTokens = new Set(searchableTokens(b));
  return aTokens.filter((token) => bTokens.has(token)).length;
}

function parseResultCount(value = '') {
  const compact = value.toLowerCase().replace(/[^0-9.,kmb]/g, '').replace(/,/g, '');
  const match = compact.match(/([0-9.]+)([kmb])?/);
  if (!match) return null;
  const multiplier = match[2] === 'k' ? 1e3 : match[2] === 'm' ? 1e6 : match[2] === 'b' ? 1e9 : 1;
  return Math.round(Number.parseFloat(match[1]) * multiplier);
}

async function fetchJson(url) {
  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  return response.json();
}

async function resolveWikipediaTitle(candidate) {
  const requestedTitle = encodeURIComponent(candidate.wikiTitle.replaceAll(' ', '_'));
  const direct = await fetchJson(`https://en.wikipedia.org/api/rest_v1/page/summary/${requestedTitle}`).catch(() => null);
  if (direct && direct.type !== 'https://mediawiki.org/wiki/HyperSwitch/errors/not_found') {
    return { title: candidate.wikiTitle, summary: direct };
  }

  const search = await fetchJson(
    `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(`${candidate.dish} ${candidate.country} dish`)}&srnamespace=0&srlimit=5&format=json&origin=*`,
  ).catch(() => null);
  const foodResult = search?.query?.search?.find((result) =>
    /dish|food|cuisine|soup|bread|stew|dessert|noodle|rice|dumpling|cake/i.test(stripHtml(result.snippet)),
  ) ?? search?.query?.search?.[0];

  if (!foodResult?.title) return { title: candidate.wikiTitle, summary: direct };
  const resolvedTitle = foodResult.title;
  const summary = await fetchJson(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(resolvedTitle.replaceAll(' ', '_'))}`,
  ).catch(() => null);
  return { title: resolvedTitle, summary };
}

async function getCommonsImage(candidate) {
  const search = await fetchJson(
    `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(`\"${candidate.dish}\" food`)}&gsrnamespace=6&gsrlimit=12&prop=imageinfo&iiprop=url%7Csize%7Cextmetadata&iiurlwidth=1600&format=json&origin=*`,
  ).catch(() => null);
  const pages = search?.query?.pages ? Object.values(search.query.pages) : [];
  const allowedLicense = /^(CC0|Public domain|PDM|CC BY|CC BY-SA)/i;
  const eligible = pages
    .map((page) => ({ page, info: page.imageinfo?.[0] }))
    .filter(({ info }) => info && allowedLicense.test(info.extmetadata?.LicenseShortName?.value ?? ''))
    .sort((a, b) => {
      const relevance = tokenOverlap(candidate.dish, b.page.title) - tokenOverlap(candidate.dish, a.page.title);
      if (relevance) return relevance;
      const aLandscape = a.info.width >= a.info.height ? 1 : 0;
      const bLandscape = b.info.width >= b.info.height ? 1 : 0;
      return bLandscape - aLandscape || (b.info.width * b.info.height) - (a.info.width * a.info.height);
    });
  const selected = eligible[0];
  if (!selected) return null;
  const { page, info } = selected;
  return {
    title: page.title,
    sourceUrl: info.descriptionurl,
    originalUrl: info.url,
    downloadUrl: info.thumburl ?? info.url,
    width: info.thumbwidth ?? info.width,
    height: info.thumbheight ?? info.height,
    author: stripHtml(info.extmetadata?.Artist?.value),
    license: info.extmetadata?.LicenseShortName?.value ?? null,
    licenseUrl: info.extmetadata?.LicenseUrl?.value ?? null,
    credit: stripHtml(info.extmetadata?.Credit?.value),
  };
}

async function getWikipediaData(candidate) {
  const resolved = await resolveWikipediaTitle(candidate);
  const title = encodeURIComponent(resolved.title.replaceAll(' ', '_'));
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 1);
  const start = new Date(end);
  start.setUTCFullYear(start.getUTCFullYear() - 1);
  const formatDate = (date) => date.toISOString().slice(0, 10).replaceAll('-', '');

  const [pageData, viewsData] = await Promise.all([
    fetchJson(`https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=pageimages&piprop=name%7Coriginal&format=json&origin=*`).catch(() => null),
    fetchJson(`https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia.org/all-access/user/${title}/daily/${formatDate(start)}/${formatDate(end)}`).catch(() => null),
  ]);

  const page = pageData?.query?.pages ? Object.values(pageData.query.pages)[0] : null;
  const imageTitle = page?.pageimage ? `File:${page.pageimage}` : null;
  let image = null;

  if (imageTitle) {
    const imageInfo = await fetchJson(
      `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(imageTitle)}&prop=imageinfo&iiprop=url%7Cextmetadata&iiurlwidth=1600&format=json&origin=*`,
    ).catch(() => null);
    const imagePage = imageInfo?.query?.pages ? Object.values(imageInfo.query.pages)[0] : null;
    const info = imagePage?.imageinfo?.[0];
    if (info) {
      image = {
        title: imageTitle,
        sourceUrl: info.descriptionurl,
        originalUrl: info.url,
        downloadUrl: info.thumburl ?? info.url,
        width: info.thumbwidth ?? info.width,
        height: info.thumbheight ?? info.height,
        author: stripHtml(info.extmetadata?.Artist?.value),
        license: info.extmetadata?.LicenseShortName?.value ?? null,
        licenseUrl: info.extmetadata?.LicenseUrl?.value ?? null,
        credit: stripHtml(info.extmetadata?.Credit?.value),
      };
    }
  }

  const resolvedTitleMatches = tokenOverlap(candidate.dish, resolved.title) > 0;
  const imageTitleMatches = image ? tokenOverlap(candidate.dish, image.title) > 0 : false;
  if (!image || !resolvedTitleMatches || !imageTitleMatches) {
    image = await getCommonsImage(candidate) ?? (resolvedTitleMatches ? image : null);
  }

  return {
    resolvedWikipediaTitle: resolved.title,
    wikipediaUrl: resolved.summary?.content_urls?.desktop?.page ?? null,
    description: resolved.summary?.description ?? null,
    extract: resolved.summary?.extract ?? null,
    annualWikipediaViews: (viewsData?.items ?? []).reduce((sum, item) => sum + (item.views ?? 0), 0),
    image,
  };
}

async function getBingData(candidate) {
  const suggestionData = await fetchJson(
    `https://api.bing.com/osjson.aspx?query=${encodeURIComponent(candidate.dish)}`,
  ).catch(() => [candidate.dish, []]);
  const suggestions = Array.isArray(suggestionData?.[1]) ? suggestionData[1] : [];
  const recipeIntentSuggestions = suggestions.filter((suggestion) =>
    /recipe|receta|rezept|ingredients|how to|cooking|tarifi|ricetta|recette/i.test(suggestion),
  );

  const query = `\"${candidate.dish}\" recipe`;
  const response = await fetch(`https://www.bing.com/search?q=${encodeURIComponent(query)}&setlang=en-US`, {
    headers: { ...headers, 'User-Agent': 'Mozilla/5.0' },
  });
  const html = response.ok ? await response.text() : '';
  const countText = html.match(/<span class="sb_count">([^<]+)<\/span>/i)?.[1] ?? '';

  return {
    suggestions,
    recipeIntentSuggestions,
    exactRecipeResultCount: parseResultCount(countText),
    exactRecipeResultCountLabel: stripHtml(countText) || null,
  };
}

function score(candidate) {
  const viewScore = Math.min(55, Math.log10(candidate.annualWikipediaViews + 1) * 9);
  const intentScore = Math.min(20, candidate.recipeIntentSuggestions.length * 4);
  const competitionPenalty = candidate.exactRecipeResultCount
    ? Math.min(25, Math.log10(candidate.exactRecipeResultCount + 1) * 4)
    : 8;
  const imageScore = candidate.image ? 8 : -12;
  return Math.round((viewScore + intentScore + imageScore - competitionPenalty) * 10) / 10;
}

async function researchCandidate(candidate) {
  const [wiki, bing] = await Promise.all([
    getWikipediaData(candidate),
    getBingData(candidate),
  ]);
  const result = { ...candidate, ...wiki, ...bing };
  return { ...result, opportunityScore: score(result) };
}

async function main() {
  const results = [];
  const batchSize = 4;

  for (let index = 0; index < candidates.length; index += batchSize) {
    const batch = candidates.slice(index, index + batchSize);
    const batchResults = await Promise.all(batch.map(researchCandidate));
    results.push(...batchResults);
    console.log(`Researched ${Math.min(index + batchSize, candidates.length)}/${candidates.length}`);
    await new Promise((resolve) => setTimeout(resolve, 350));
  }

  results.sort((a, b) => b.opportunityScore - a.opportunityScore);
  const outputDir = path.join(process.cwd(), 'research');
  await mkdir(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, 'global-recipe-opportunities.json');
  await writeFile(outputPath, `${JSON.stringify({ generatedAt: new Date().toISOString(), methodology: {
    demand: 'English Wikipedia article views over the last 12 months plus Bing autocomplete recipe-intent suggestions.',
    competition: 'Approximate Bing result count for an exact-match dish name plus recipe; directional, not keyword-planner volume.',
    image: 'Lead image and license metadata from Wikimedia Commons when available.',
  }, candidates: results }, null, 2)}\n`, 'utf8');

  console.log(`Saved ${results.length} candidates to ${outputPath}`);
  console.table(results.slice(0, 50).map(({ dish, country, region, annualWikipediaViews, recipeIntentSuggestions, exactRecipeResultCount, image, opportunityScore }) => ({
    dish,
    country,
    region,
    views: annualWikipediaViews,
    intents: recipeIntentSuggestions.length,
    competition: exactRecipeResultCount,
    image: Boolean(image),
    score: opportunityScore,
  })));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
