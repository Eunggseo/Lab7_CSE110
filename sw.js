// sw.js - This file needs to be in the root of the directory to work,
//         so do not move it next to the other scripts

const CACHE_NAME = 'lab-7-starter';

self.addEventListener('fetch', function (event) {
  event.respondWith(
    // B7. Open the cache using the name we gave above (CACHE_NAME)
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.match(event.request).then(function (response) {
        if (response) {
          // B8. If the request is in the cache, return the cached version
          return response;
        } else {
          // Fetch the resource, add it to the cache, and return network response
          return fetch(event.request)
            .then(function (networkResponse) {
              // Check if we received a valid response
              if (
                !networkResponse ||
                networkResponse.status !== 200 ||
                networkResponse.type !== 'basic'
              ) {
                return networkResponse;
              }

              // Clone the response since it can only be consumed once
              const responseToCache = networkResponse.clone();

              // Add the response to the cache
              caches.open(CACHE_NAME).then(function (cache) {
                cache.put(event.request, responseToCache);
              });

              return networkResponse;
            })
            .catch(function (error) {
              console.error('Error fetching resource:', error);
            });
        }
      });
    })
  );
});
