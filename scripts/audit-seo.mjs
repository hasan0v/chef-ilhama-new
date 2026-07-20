const SITE_ORIGIN = 'https://chef-ilhama.food';
const CONCURRENCY = 8;

function getArgument(name) {
  const prefix = `--${name}=`;
  return process.argv.find((value) => value.startsWith(prefix))?.slice(prefix.length);
}

const auditOrigin = (getArgument('base') || process.env.SEO_AUDIT_BASE_URL || SITE_ORIGIN).replace(/\/$/, '');
const staticOnly = process.argv.includes('--static-only');

function decode(value = '') {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function getTagContent(html, tag) {
  return decode(html.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'))?.[1]?.trim() || '');
}

function getMetaContent(html, attribute, value) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  for (const tag of tags) {
    const key = tag.match(new RegExp(`${attribute}=["']([^"']+)["']`, 'i'))?.[1];
    if (key !== value) continue;
    return decode(tag.match(/content=["']([^"']*)["']/i)?.[1] || '');
  }
  return '';
}

function getLinks(html, rel) {
  return (html.match(/<link\b[^>]*>/gi) || [])
    .filter((tag) => tag.match(/rel=["']([^"']+)["']/i)?.[1]?.split(/\s+/).includes(rel))
    .map((tag) => ({
      href: decode(tag.match(/href=["']([^"']+)["']/i)?.[1] || ''),
      hreflang: tag.match(/hreflang=["']([^"']+)["']/i)?.[1] || '',
    }));
}

function getJsonLd(html, pageUrl, errors) {
  const values = [];
  const pattern = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const match of html.matchAll(pattern)) {
    try {
      values.push(JSON.parse(decode(match[1])));
    } catch (error) {
      errors.push(`${pageUrl}: invalid JSON-LD (${error.message})`);
    }
  }
  return values.flatMap((value) => Array.isArray(value) ? value : [value]);
}

function normalizeUrl(value) {
  const url = new URL(value, SITE_ORIGIN);
  url.hash = '';
  if (url.pathname !== '/') url.pathname = url.pathname.replace(/\/$/, '');
  return url.toString().replace(/\/$/, url.pathname === '/' ? '/' : '');
}

function toAuditUrl(publicUrl) {
  const url = new URL(publicUrl);
  return `${auditOrigin}${url.pathname}${url.search}`;
}

async function fetchText(url) {
  const response = await fetch(url, {
    redirect: 'follow',
    headers: { 'user-agent': 'ChefIlhamaSeoAudit/1.0' },
  });
  return { response, text: await response.text() };
}

function parseSitemap(xml) {
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/gi)].map((match) => {
    const block = match[1];
    const loc = decode(block.match(/<loc>(.*?)<\/loc>/i)?.[1] || '');
    const alternates = Object.fromEntries(
      [...block.matchAll(/<xhtml:link\b[^>]*hreflang=["']([^"']+)["'][^>]*href=["']([^"']+)["'][^>]*\/>/gi)]
        .map((item) => [item[1], decode(item[2])]),
    );
    return { loc, alternates };
  });
}

async function mapConcurrent(items, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  async function run() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, items.length) }, run));
  return results;
}

function findSchemasByType(schemas, type) {
  return schemas.filter((schema) => {
    const schemaTypes = Array.isArray(schema?.['@type']) ? schema['@type'] : [schema?.['@type']];
    return schemaTypes.includes(type);
  });
}

async function auditPage(entry, globalState) {
  const errors = [];
  const warnings = [];
  const localUrl = toAuditUrl(entry.loc);
  let response;
  let html;

  try {
    ({ response, text: html } = await fetchText(localUrl));
  } catch (error) {
    return { errors: [`${entry.loc}: request failed (${error.message})`], warnings };
  }

  if (response.status !== 200) {
    errors.push(`${entry.loc}: expected 200, received ${response.status}`);
    return { errors, warnings };
  }

  const title = getTagContent(html, 'title');
  const description = getMetaContent(html, 'name', 'description');
  const robots = getMetaContent(html, 'name', 'robots').toLowerCase();
  const canonicalLinks = getLinks(html, 'canonical');
  const hreflangLinks = getLinks(html, 'alternate').filter((link) => link.hreflang);
  const ogUrl = getMetaContent(html, 'property', 'og:url');
  const ogImage = getMetaContent(html, 'property', 'og:image');
  const canonical = canonicalLinks[0]?.href || '';
  const expectedCanonical = normalizeUrl(entry.loc);

  if (!title) errors.push(`${entry.loc}: missing title`);

  if (!description) errors.push(`${entry.loc}: missing meta description`);

  if (robots.includes('noindex')) errors.push(`${entry.loc}: sitemap URL is noindex`);
  if (canonicalLinks.length !== 1) errors.push(`${entry.loc}: expected one canonical, found ${canonicalLinks.length}`);
  if (canonical && normalizeUrl(canonical) !== expectedCanonical) {
    errors.push(`${entry.loc}: canonical mismatch (${canonical})`);
  }
  if (canonical.includes('www.')) errors.push(`${entry.loc}: canonical uses www host`);
  if (ogUrl && normalizeUrl(ogUrl) !== expectedCanonical) errors.push(`${entry.loc}: og:url mismatch (${ogUrl})`);
  if (!ogImage) errors.push(`${entry.loc}: missing og:image`);

  const actualAlternates = Object.fromEntries(hreflangLinks.map((link) => [link.hreflang, link.href]));
  for (const [language, expectedUrl] of Object.entries(entry.alternates)) {
    const actualUrl = actualAlternates[language];
    if (!actualUrl) errors.push(`${entry.loc}: missing hreflang ${language}`);
    else if (normalizeUrl(actualUrl) !== normalizeUrl(expectedUrl)) {
      errors.push(`${entry.loc}: hreflang ${language} mismatch (${actualUrl})`);
    }
  }
  if (!actualAlternates['x-default']) errors.push(`${entry.loc}: missing x-default hreflang`);
  if (new Set(hreflangLinks.map((link) => link.hreflang)).size !== hreflangLinks.length) {
    errors.push(`${entry.loc}: duplicate hreflang values`);
  }

  const schemas = getJsonLd(html, entry.loc, errors);
  const pathname = new URL(entry.loc).pathname;
  if (/^\/resept\/[^/]+$/.test(pathname) || /^\/en\/recipe\/[^/]+$/.test(pathname)) {
    const breadcrumbs = findSchemasByType(schemas, 'BreadcrumbList');
    if (breadcrumbs.length === 0) errors.push(`${entry.loc}: missing BreadcrumbList JSON-LD`);
    const recipes = findSchemasByType(schemas, 'Recipe');
    if (recipes.length !== 1) {
      errors.push(`${entry.loc}: expected one Recipe JSON-LD, found ${recipes.length}`);
    } else {
      const recipe = recipes[0];
      if (!Array.isArray(recipe.image) || recipe.image.length < 3) errors.push(`${entry.loc}: Recipe needs 3 image ratios`);
      if (!Array.isArray(recipe.recipeIngredient) || recipe.recipeIngredient.length === 0) errors.push(`${entry.loc}: Recipe has no ingredients`);
      if (!Array.isArray(recipe.recipeInstructions) || recipe.recipeInstructions.length === 0) {
        errors.push(`${entry.loc}: Recipe has no instructions`);
      } else {
        recipe.recipeInstructions.forEach((step, index) => {
          if (step?.['@type'] !== 'HowToStep') errors.push(`${entry.loc}: instruction ${index + 1} is not HowToStep`);
          if (!step?.url) errors.push(`${entry.loc}: instruction ${index + 1} has no URL`);
          if (!step?.image) errors.push(`${entry.loc}: instruction ${index + 1} has no image`);
          if (!step?.text || step.text.trim().length < 2) errors.push(`${entry.loc}: instruction ${index + 1} is empty`);
        });
      }
    }
  }

  const signature = `${title}\n${description}`;
  if (globalState.signatures.has(signature)) {
    errors.push(`${entry.loc}: duplicates title and description from ${globalState.signatures.get(signature)}`);
  } else {
    globalState.signatures.set(signature, entry.loc);
  }

  const internalLinks = [...html.matchAll(/<a\b[^>]*href=["']([^"'#]+)["']/gi)]
    .map((match) => decode(match[1]))
    .filter((href) => href.startsWith('/') || href.startsWith(SITE_ORIGIN));
  internalLinks.forEach((href) => globalState.internalLinks.add(normalizeUrl(href)));

  return { errors, warnings };
}

async function main() {
  const sitemapUrl = `${auditOrigin}/sitemap.xml`;
  const { response: sitemapResponse, text: sitemapXml } = await fetchText(sitemapUrl);
  if (!sitemapResponse.ok) throw new Error(`Sitemap returned ${sitemapResponse.status}`);

  const sitemapEntries = parseSitemap(sitemapXml);
  const entries = staticOnly
    ? sitemapEntries.filter((entry) => {
        const pathname = new URL(entry.loc).pathname;
        return !/^\/resept\/[^/]+$/.test(pathname) && !/^\/en\/recipe\/[^/]+$/.test(pathname);
      })
    : sitemapEntries;
  if (entries.length === 0) throw new Error('Sitemap has no URL entries');
  const globalState = { signatures: new Map(), internalLinks: new Set() };
  const pageResults = await mapConcurrent(entries, (entry) => auditPage(entry, globalState));
  const errors = pageResults.flatMap((result) => result.errors);
  const warnings = pageResults.flatMap((result) => result.warnings);

  const sitemapUrls = new Set(entries.map((entry) => normalizeUrl(entry.loc)));
  const knownSitemapLinks = [...globalState.internalLinks]
    .filter((url) => sitemapUrls.has(url));
  if (knownSitemapLinks.length === 0) {
    warnings.push('No internal links to sitemap pages were discovered');
  }

  console.log(`SEO audit: ${entries.length} sitemap pages checked against ${auditOrigin}`);
  console.log(`Errors: ${errors.length}; warnings: ${warnings.length}`);
  if (warnings.length) {
    console.log('\nWarnings:');
    warnings.forEach((warning) => console.log(`- ${warning}`));
  }
  if (errors.length) {
    console.error('\nErrors:');
    errors.forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(`SEO audit failed: ${error.message}`);
  process.exitCode = 1;
});
