const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  '/icon.png',
  '/styles.css',
  '/main.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Кэш открыт');
        
        // Способ 1: Обработка каждого файла отдельно
        const promises = urlsToCache.map(url => {
          return cache.add(url).catch(error => {
            console.error('Ошибка кэширования:', url, error);
            // Продолжаем выполнение, даже если один файл не закэшировался
            return Promise.resolve();
          });
        });
        
        return Promise.all(promises);
      })
      .then(() => {
        console.log('Все файлы обработаны');
      })
      .catch(error => {
        console.error('Ошибка установки Service Worker:', error);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});