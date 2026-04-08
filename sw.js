const CACHE_NAME = 'xeztik-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Install Service Worker & Simpan Cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Intercept Request (Syarat wajib PWA)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Kembalikan file dari cache jika ada, kalau tidak ambil dari internet
      return response || fetch(event.request);
    })
  );
});
