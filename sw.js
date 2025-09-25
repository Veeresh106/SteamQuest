const CACHE_NAME = 'stemquest-v2'; // Updated cache name
const DATA_CACHE_NAME = 'stemquest-data-cache-v1';

const urlsToCache = [
  '/', 'index.html', 'dashboard.html', 'style.css',
  'script.js', 'dashboard.js'
];

// 1. Installation: Cache the app shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache and caching app shell');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// 2. Activation: Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
          console.log('Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

// 3. Fetch: Handle requests with a "Network falling back to cache" strategy for API calls
self.addEventListener('fetch', event => {
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      caches.open(DATA_CACHE_NAME).then(cache => {
        return fetch(event.request)
          .then(response => {
            if (response.status === 200) {
              cache.put(event.request.url, response.clone());
            }
            return response;
          })
          .catch(err => {
            // Network failed, try to get it from the cache.
            return cache.match(event.request);
          });
      })
    );
    return;
  }

  // For non-API requests, use cache-first strategy
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// 4. 🔄 Sync: This is triggered when connection is restored
self.addEventListener('sync', event => {
    if (event.tag === 'sync-new-attempt') {
        console.log('Sync event triggered for new attempts!');
        event.waitUntil(syncQuizAttempts());
    }
});

// Helper function to handle the syncing process
function syncQuizAttempts() {
    // This part is complex and requires IndexedDB access from the service worker.
    // We'll build the logic to save to IndexedDB in dashboard.js.
    // For now, this is a placeholder for the logic that will read from IndexedDB and POST to the server.
    console.log('Attempting to sync quiz attempts with the server...');
    // In a full implementation, you'd open IndexedDB here, read pending posts,
    // fetch them to your server, and then delete them from IndexedDB on success.
}