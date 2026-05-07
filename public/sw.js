const CACHE_NAME = 'waveapp-cache-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
  console.log('[ServiceWorker] Install');
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
  console.log('[ServiceWorker] Activate');
});

self.addEventListener('fetch', (event) => {
  // Pass-through stub per la PWA Baseline
  // In futuro questo gestirà la cache per l'uso offline reale
  event.respondWith(fetch(event.request).catch(() => new Response('App Offline')));
});
