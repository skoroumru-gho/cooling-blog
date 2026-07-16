const CACHE_NAME = 'cooking-blog-v1';

const urlsToCache = [
  '/cooking_site_pwa/',
  '/cooking_site_pwa/index.html',
  '/cooking_site_pwa/recipes.html',
  '/cooking_site_pwa/pasta.html',
  '/cooking_site_pwa/t_soup.html',
  '/cooking_site_pwa/tort.html',
  '/cooking_site_pwa/salat.html',
  '/cooking_site_pwa/pizza.html',
  '/cooking_site_pwa/b_sup.html',
  '/cooking_site_pwa/about.html',
  '/cooking_site_pwa/feedback.html',
  '/cooking_site_pwa/css/style.css',
  '/cooking_site_pwa/images/b_sup copy.jpg',
  '/cooking_site_pwa/manifest.json',   
  '/cooking_site_pwa/icons/2026-07-16 14.52.16 copy.jpg',
  '/cooking_site_pwa/icons/2026-07-16 14.52.16.jpg',
  '/cooking_site_pwa/images/b_sup.jpg',
  '/cooking_site_pwa/images/pasta.jpeg',
  '/cooking_site_pwa/images/pasta.png',
  '/cooking_site_pwa/images/pizza copy.jpg',
  '/cooking_site_pwa/images/pizza.jpg',
  '/cooking_site_pwa/images/salat copy.jpg',
  '/cooking_site_pwa/images/salat.jpg',
  '/cooking_site_pwa/images/t_sup copy.jpg',
  '/cooking_site_pwa/images/t_sup.jpg',
  '/cooking_site_pwa/images/tort copy.jpg',
  '/cooking_site_pwa/images/tort.jpg',

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
});