// Este arquivo é gerenciado pelo plugin next-pwa
// Você pode estender sua funcionalidade, se necessário

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('plenitude-cache').then((cache) => {
      return cache.addAll([
        '/offline.html',
        '/images/background.jpg',
        '/icons/icon-192x192.png',
        '/icons/icon-512x512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/offline.html');
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
