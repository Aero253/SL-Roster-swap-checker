// Bump CACHE_VERSION on every release, or phones keep serving the old app.
const CACHE_VERSION = 'swapcheck-v2';
const CORE = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './apple-touch-icon.png',
  './vendor/pdf.min.mjs', './vendor/pdf.worker.min.mjs'];  // pdf.js is bundled so imports work with no signal

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const sameOrigin = new URL(req.url).origin === location.origin;
  // App files: cache first, so it opens with no signal.
  if (sameOrigin) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE_VERSION).then(c => c.put(req, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match('./index.html'))));
    return;
  }
  // The PDF reader from the CDN: network first, fall back to what was cached.
  e.respondWith(fetch(req).then(res => {
    const copy = res.clone();
    caches.open(CACHE_VERSION).then(c => c.put(req, copy)).catch(() => {});
    return res;
  }).catch(() => caches.match(req)));
});
