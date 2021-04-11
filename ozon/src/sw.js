const CACHE_NAME = 'OZON-CACHE-v1';
const { assets } = global.serviceWorkerOption;
for (let i = 0; i < assets.length; i++) {
    assets[i] = `.${assets[i]}`;
}
assets.push('/');

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(assets))
            .catch((err) => {
                console.error('smth went wrong with caches.open: ', err);
            }),
    );
});

self.addEventListener('fetch', (event) => {
    if (navigator.onLine) {
        // return fetch(event.request);
    } else {
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
    }
});
