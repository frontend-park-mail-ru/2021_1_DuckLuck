const CACHE_NAME = 'OZON-CACHE-v1';

const resources = global.serviceWorkerOption.assets.map((elem) => {
    return `${elem}`;
});
resources.push('/');

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(resources))
            .catch((err) => {
                console.error('smth went wrong with caches.open: ', err);
            }),
    );
});

self.addEventListener('fetch', (event) => {
    if (navigator.onLine) {
        return;
        // return fetch(event.request);
    }

    event.respondWith(
        caches
            .match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(event.request);
            })
            .catch((err) => {
                console.error('smth went wrong with caches.match: ', err);
            }),
    );
});
