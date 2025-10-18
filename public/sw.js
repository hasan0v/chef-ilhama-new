// Enhanced Service Worker for Chef İlhamə website
const CACHE_VERSION = 'v2';
const STATIC_CACHE = `chef-ilhame-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `chef-ilhame-dynamic-${CACHE_VERSION}`;
const IMAGE_CACHE = `chef-ilhame-images-${CACHE_VERSION}`;

// Critical resources to cache immediately
const STATIC_CACHE_URLS = [
  '/',
  '/haqqinda',
  '/reseptler',
  '/elaqe',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/ilhama.png',
  '/placeholder-food.svg'
];

// Cache strategies
const CACHE_STRATEGIES = {
  // Static assets - cache first
  static: ['/icons/', '/_next/static/', '/manifest.json'],
  // Pages - network first with cache fallback  
  pages: ['/', '/haqqinda', '/reseptler', '/elaqe', '/resept/'],
  // Images - cache first with network fallback
  images: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg'],
  // API - network first with short cache
  api: ['/api/']
};

// Install event - aggressively cache critical resources
self.addEventListener('install', (event) => {
  console.log('SW: Installing...');
  event.waitUntil(
    Promise.all([
      // Cache static resources
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.addAll(STATIC_CACHE_URLS);
      }),
      // Pre-open dynamic cache
      caches.open(DYNAMIC_CACHE),
      // Pre-open image cache
      caches.open(IMAGE_CACHE)
    ]).then(() => {
      console.log('SW: Install complete');
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches and claim clients
self.addEventListener('activate', (event) => {
  console.log('SW: Activating...');
  const expectedCaches = [STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE];
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!expectedCaches.includes(cacheName)) {
              console.log('SW: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('SW: Activation complete');
        return self.clients.claim();
      })
  );
});

// Enhanced fetch event with intelligent caching strategies
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip external requests (except fonts)
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin && !url.hostname.includes('fonts.g')) {
    return;
  }

  event.respondWith(handleFetch(event.request));
});

async function handleFetch(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  try {
    // Static assets - cache first (instant loading)
    if (CACHE_STRATEGIES.static.some(path => pathname.includes(path))) {
      return await cacheFirst(request, STATIC_CACHE);
    }
    
    // Images - cache first with 1 year TTL
    if (CACHE_STRATEGIES.images.some(ext => pathname.toLowerCase().includes(ext))) {
      return await cacheFirst(request, IMAGE_CACHE);
    }
    
    // API requests - network first with 5min cache
    if (CACHE_STRATEGIES.api.some(path => pathname.includes(path))) {
      return await networkFirst(request, DYNAMIC_CACHE, 300000); // 5 min
    }
    
    // Pages - network first with cache fallback
    if (CACHE_STRATEGIES.pages.some(path => pathname.includes(path) || pathname === path)) {
      return await networkFirst(request, DYNAMIC_CACHE, 60000); // 1 min
    }
    
    // Default - network with cache
    return await networkFirst(request, DYNAMIC_CACHE);
    
  } catch (error) {
    console.log('SW: Fetch failed:', error);
    // Offline fallback
    if (request.destination === 'document') {
      return await caches.match('/') || new Response('Offline');
    }
    return new Response('Network error', { status: 503 });
  }
}

// Cache first strategy - fastest for static assets
async function cacheFirst(request, cacheName) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    // Check if cache is fresh (for images, keep for 1 year)
    const cacheDate = cachedResponse.headers.get('sw-cache-date');
    const isImage = CACHE_STRATEGIES.images.some(ext => request.url.includes(ext));
    const maxAge = isImage ? 31536000000 : 3600000; // 1 year for images, 1 hour for others
    
    if (cacheDate && (Date.now() - parseInt(cacheDate)) < maxAge) {
      return cachedResponse;
    }
  }
  
  // Fetch from network and cache
  const networkResponse = await fetch(request);
  if (networkResponse.ok) {
    const cache = await caches.open(cacheName);
    const responseClone = networkResponse.clone();
    
    // Add cache timestamp
    const headers = new Headers(responseClone.headers);
    headers.set('sw-cache-date', Date.now().toString());
    const cacheResponse = new Response(responseClone.body, {
      status: responseClone.status,
      statusText: responseClone.statusText,
      headers: headers
    });
    
    await cache.put(request, cacheResponse);
  }
  
  return networkResponse;
}

// Network first strategy - fresh content when possible
async function networkFirst(request, cacheName, maxAge = 3600000) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      const responseClone = networkResponse.clone();
      
      // Add cache timestamp
      const headers = new Headers(responseClone.headers);
      headers.set('sw-cache-date', Date.now().toString());
      const cacheResponse = new Response(responseClone.body, {
        status: responseClone.status,
        statusText: responseClone.statusText,
        headers: headers
      });
      
      await cache.put(request, cacheResponse);
    }
    return networkResponse;
  } catch (error) {
    // Fallback to cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      const cacheDate = cachedResponse.headers.get('sw-cache-date');
      // Return cached version if within maxAge
      if (!cacheDate || (Date.now() - parseInt(cacheDate)) < maxAge) {
        return cachedResponse;
      }
    }
    throw error;
  }
}