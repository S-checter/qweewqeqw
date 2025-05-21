const CACHE_NAME = 'video-cache-v1';
const ASSETS_TO_CACHE = [
  '/video.mp4',
  '/image.jpg'
];

// При установке сервис-воркера — сохраняем ресурсы
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// При запросе — используем кэш
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
