const appShellFiles = [
  '/pomodoro/',
  '/pomodoro/assets/alarm.mp3',
  '/pomodoro/styles.css',
  '/pomodoro/bundle.js',
  '/pomodoro/favicon.ico',
  '/pomodoro/index.html',
  '/pomodoro/pomodoro.webmanifest'
];

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