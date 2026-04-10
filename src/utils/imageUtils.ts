const FALLBACK_IMAGE = '/placeholder-recipe.svg';

const allowedRemoteImagePatterns = [
  {
    protocol: 'https:',
    hostname: 'flavorsofbaku.com',
    pathnamePrefix: '/wp-content/uploads/',
  },
  {
    protocol: 'https:',
    hostname: 'azcookbook.com',
    pathnamePrefix: '/wp-content/uploads/',
  },
  {
    protocol: 'https:',
    hostname: 'nationalfoods.org',
    pathnamePrefix: '/wp-content/uploads/',
  },
  {
    protocol: 'https:',
    hostname: 'cms.seasonedtraveller.com',
    pathnamePrefix: '/uploads/',
  },
  {
    protocol: 'https:',
    hostname: 'i.imgur.com',
    pathnamePrefix: '/',
  },
  {
    protocol: 'https:',
    hostname: 'v3.fal.media',
    pathnamePrefix: '/files/',
  },
  {
    protocol: 'https:',
    hostname: 'axscxlqiwpfxizjgaqsp.supabase.co',
    pathnamePrefix: '/storage/v1/object/public/',
  },
] as const;

function isAllowedRemoteImageUrl(url: URL): boolean {
  return allowedRemoteImagePatterns.some((pattern) => {
    return url.protocol === pattern.protocol
      && url.hostname === pattern.hostname
      && url.pathname.startsWith(pattern.pathnamePrefix);
  });
}

// Utility function to validate and sanitize image URLs
export function getValidImageUrl(imageUrl: string | null | undefined): string {
  if (!imageUrl || imageUrl.trim() === '') {
    return FALLBACK_IMAGE;
  }

  if (imageUrl.startsWith('/')) {
    return imageUrl;
  }

  try {
    const parsedUrl = new URL(imageUrl);
    return isAllowedRemoteImageUrl(parsedUrl) ? imageUrl : FALLBACK_IMAGE;
  } catch {
    return FALLBACK_IMAGE;
  }
}