// public/service-worker.js
const CACHE_NAME = 'v1_cache';  // Define the cache version.
const urlsToCache = [
  '/',  // Home page
  '/index.html',  // Main HTML file
  '/static/css/main.css',  // Main CSS file
  '/static/js/main.js',  // Main JavaScript file
];

// On install, cache all resources listed in the urlsToCache array
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);  // Add the resources to the cache
    })
  );
});

// On fetch, serve cached resources if available
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Serve the cached response if it's available, otherwise fetch from the network
      return cachedResponse || fetch(event.request);
    })
  );
});

// Clear old caches when a new service worker is activated
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];  // Only keep the current cache version
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      // Delete caches that aren't in the cacheWhitelist
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
