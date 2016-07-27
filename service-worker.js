var cacheName = 'my=pwa-sample-1.0.0.0';
var filesToCache = [
  '/',
  '/index.html',
  'styles.css',
  'app.js'
];

self.addEventListener('install', function(e) {
  console.log('SVC] installing service worker');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('SVC] caching files...');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('SVC] activating service worker');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if(key !== cacheName) {
          console.log('SVC] Removing old cache : '+key);
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(e) {
  console.log('SVC] fetching using service worker : '+e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
