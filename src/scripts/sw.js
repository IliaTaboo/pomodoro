const { assets } = global.serviceWorkerOption;

let appShellFiles = [...assets, './', './static/alarm.mp3', './styles.css'];

const cacheName = `pomodoro-${new Date().toISOString()}`;

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(appShellFiles);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (r) {
      return r || fetch(e.request).then(function (response) {
        return caches.open(cacheName).then(function (cache) {
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});