// service-worker.js

// Шаг 1: Установка и кэширование статических ресурсов
const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  '/',
  '/style.css',
  '/main.js',
  '/public'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Кэш открыт');
        return cache.addAll(urlsToCache);
      })
  );
});

// Шаг 2: Перехват сетевых запросов
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Возвращаем ресурс из кэша или делаем сетевой запрос
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});