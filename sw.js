// sw.js - This file needs to be in the root of the directory to work,
//         so do not move it next to the other scripts

const CACHE_NAME = 'lab-7-starter';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      // B6. Add all of the URLs from RECIPE_URLs to the cache
      return cache.addAll(RECIPE_URLs);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    // B7. Open the cache using the name we gave above (CACHE_NAME)
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        if (response) {
          // B8. If the request is in the cache, return the cached version
          return response;
        } else {
          // Fetch the resource, add it to the cache, and return network response
          return fetch(event.request).then(function(networkResponse) {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        }
      });
    })
  );
});

