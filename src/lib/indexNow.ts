import { siteConfig } from '@/lib/site';

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'chef-ilhama-indexnow-key';
const SITE_HOST = new URL(siteConfig.url).host;

export function normalizeIndexNowUrls(urls: string[]) {
  return [...new Set(urls)]
    .slice(0, 10_000)
    .map((url) => new URL(url, siteConfig.url))
    .filter((url) => url.protocol === 'https:' && url.host === SITE_HOST)
    .map((url) => url.href);
}

export async function notifyIndexNow(urls: string[]) {
  const urlList = normalizeIndexNowUrls(urls);
  if (!urlList.length) return { ok: false, status: 400, submitted: 0 };

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: SITE_HOST,
      key: INDEXNOW_KEY,
      keyLocation: `${siteConfig.url}/${INDEXNOW_KEY}.txt`,
      urlList,
    }),
  });

  return {
    ok: response.ok,
    status: response.status,
    submitted: urlList.length,
  };
}

export function getRecipeIndexNowUrls(slug: string) {
  return [
    `/resept/${slug}`,
    `/en/recipe/${slug}`,
    '/reseptler',
    '/en/recipes',
    '/kolleksiyalar',
    '/en/collections',
  ];
}
