const CACHE_NAME = 'lina-store-v1';
const ASSETS = [
  './',
  './index.html',
  './landing.css',
  './pwa-install.js',
  './banner.linastore.jpg'
];

// تثبيت الـ Service Worker وحفظ الملفات الأساسية
self.addEventListener('install', (e) => {
  e.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
          return cache.addAll(ASSETS);
      }).then(() => self.skipWaiting())
  );
});

// تفعيل وتحديث الكاش
self.addEventListener('activate', (e) => {
  e.waitUntil(
      caches.keys().then((keys) => {
          return Promise.all(
              keys.map((key) => {
                  if (key !== CACHE_NAME) {
                      return caches.delete(key);
                  }
              })
          );
      }).then(() => self.clients.claim())
  );
});

// الاستجابة للطلبات
self.addEventListener('fetch', (e) => {
  e.respondWith(
      fetch(e.request).catch(() => {
          return caches.match(e.request);
      })
  );
});
