// Проверяем, поддерживает ли браузер Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration) {
        // Регистрация успешна
        console.log('Service Worker зарегистрирован. Область видимости: ', registration.scope);
      })
      .catch(function(error) {
        // Регистрация не удалась
        console.log('Ошибка при регистрации Service Worker: ', error);
      });
  });
}