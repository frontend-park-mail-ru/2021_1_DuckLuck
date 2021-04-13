const CACHE_NAME = 'OZON-CACHE-v1';

const resources = [];
resources.push('/dist/bundle.js');
resources.push('/index.html');
resources.push('/styles.css');
resources.push('/views/decorators.css');
resources.push('/views/ProductView/ProductView.css');
resources.push('/views/ProfileView/ProfileView.css');
resources.push('/views/Common/Button/Button.css');
resources.push('/views/Common/Rating/Rating.css');
resources.push('/views/Common/ListOfProducts/ListOfProductsItem/ListOfProductsItem.css');
resources.push('/views/Common/ListOfProducts/ListOfProducts.css');
resources.push('/views/Common/Img/Img.css');
resources.push('/views/Common/Popup/Popup.css');
resources.push('/views/Common/Pagination/Pagination.css');
resources.push('/views/Common/Input/Input.css');
resources.push('/views/Common/Link/Link.css');
resources.push('/views/Common/AuthenticationForm/AuthenticationForm.css');
resources.push('/views/Common/Blind/Blind.css');
resources.push('/views/HeaderView/HeaderView.css');
resources.push('/constants.css');
resources.push('/dist/bundle.css');
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
