const CACHE_NAME = 'OZON-CACHE-v1';


const resources = [
    '/dist/bundle.js',
    '/index.html',
    '/styles.css',
    '/views/decorators.css',
    '/views/ProductView/ProductView.css',
    '/views/ProfileView/ProfileView.css',
    '/views/Common/Button/Button.css',
    '/views/Common/Rating/Rating.css',
    '/views/Common/ListOfProducts/ListOfProductsItem/ListOfProductsItem.css',
    '/views/Common/ListOfProducts/ListOfProducts.css',
    '/views/Common/Img/Img.css',
    '/views/Common/Popup/Popup.css',
    '/views/Common/Pagination/Pagination.css',
    '/views/Common/Input/Input.css',
    '/views/Common/Link/Link.css',
    '/views/Common/AuthenticationForm/AuthenticationForm.css',
    '/views/Common/Blind/Blind.css',
    '/views/HeaderView/HeaderView.css',
    '/constants.css',
    '/',
];

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
