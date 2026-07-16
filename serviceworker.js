const CACHE_NAME = 'cooking-blog-v1';

const urlsToCache = [
  '/cooling-blog/',
  '/cooling-blog/index.html',
  '/cooling-blog/recipes.html',
  '/cooling-blog/pasta.html',
  '/cooling-blog/t_soup.html',
  '/cooling-blog/tort.html',
  '/cooling-blog/salat.html',
  '/cooling-blog/pizza.html',
  '/cooling-blog/b_sup.html',
  '/cooling-blog/about.html',
  '/cooling-blog/feedback.html',
  '/cooling-blog/css/style.css',
  '/cooling-blog/images/b_sup copy.jpg',
  '/cooling-blog/manifest.json',   
  '/cooling-blog/icons/2026-07-16 14.52.16 copy.jpg',
  '/cooling-blog/icons/2026-07-16 14.52.16.jpg',
  '/cooling-blog/images/b_sup.jpg',
  '/cooling-blog/images/pasta.jpeg',
  '/cooling-blog/images/pasta.png',
  '/cooling-blog/images/pizza copy.jpg',
  '/cooling-blog/images/pizza.jpg',
  '/cooling-blog/images/salat copy.jpg',
  '/cooling-blog/images/salat.jpg',
  '/cooling-blog/images/t_sup copy.jpg',
  '/cooling-blog/images/t_sup.jpg',
  '/cooling-blog/images/tort copy.jpg',
  '/cooling-blog/images/tort.jpg',

];


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Кэш открыт');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.log('Ошибка кэширования:', error);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; 
        }
        return fetch(event.request); 
      })
      .catch(() => {
        return caches.match('/cooking_site_pwa/index.html');
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  self.addEventListener('push', event => {
  const data = event.data?.json() || {};
  event.waitUntil(
    self.registration.showNotification(data.title || 'Новое уведомление', {
      body: data.body || 'Откройте приложение',
      icon: data.icon || '/icons/icon-192x192.png'
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || '/')
  );
});

});
