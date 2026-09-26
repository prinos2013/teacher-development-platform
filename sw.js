const CACHE_NAME = 'happy-home-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './logo.jpg',
  './IMG_20251015_085238_282.jpg',
  './IMG_20260122_093452_226.jpg',
  './IMG_20260902_090719_980.jpg',
  './IMG_20260908_092429_543.jpg',
  './IMG_20260909_100028_834.jpg',
  './IMG_20260915_092712_537.jpg',
  './IMG_20260918_132744_558.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});