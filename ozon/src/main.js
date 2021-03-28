import {ProfilePage} from './views/ProfilePage/ProfilePage.js';
import {LoginPage} from './views/LoginPage/LoginPage.js';
import {SignupPage} from './views/SignupPage/SignupPage.js';
import {HomeView} from './views/HomePage/HomeView.js';
import {ProductsPage} from './views/ProductsPage/ProductsPage.js';
import {ProductPage} from './views/ProductPage/ProductPage.js';
import {AjaxModule} from './modules/Ajax/Ajax.js';
import {fileServerHost, serverApiPath, urls} from './utils/urls/urls.js';

const application = document.getElementById('app');

const config = {
    home: {
        href: '/home',
        text: 'Главная',
    },
    signup: {
        href: '/signup',
        text: 'Зарегистрироваться',
    },
    login: {
        href: '/login',
        text: 'Авторизоваться',
    },
    me: {
        href: '/profile',
        text: 'Профиль',
    },
    item: {
        href: '/item',
        text: 'Товар',
    },
    items: {
        href: '/items',
        text: 'Товары',
    },
};

config.home.open = () => {
    application.innerHTML = '';

    const page = new HomeView(application);
    page.render(config);
    page.show();
};

config.signup.open = () => {
    const page = new SignupPage(application);
    if (page.cache === '') {
        page.show()
        const pageParsed = page.cache;
        const blind = pageParsed.getElementsByClassName('blind')[0];

        blind.addEventListener('click', (evt) => {
            console.log("HIDDEN");
            page.hide()
            // application.removeChild(pageParsed);
        });

        const form = pageParsed.getElementsByClassName('form-body')[0];
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            if (!page.isValid()) {
                return;
            }

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            AjaxModule.postUsingFetch({
                url: serverApiPath + urls.signupUrl,
                body: {email, password},
            }).then(({status, parsedJson}) => {
                if (status === 201) {
                    config.me.open();
                } else {
                    const {error} = parsedJson;
                    console.error(error);
                }
            });
        });

        document
            .getElementById('form-header__login-link')
            .addEventListener('click', (evt) => {
                evt.preventDefault();
                console.log("TO LOGIN");
                // application.removeChild(pageParsed);
                page.hide()
                config.login.open();
            });
    } else {
        page.show();
    }
};

config.login.open = () => {
    const page = new LoginPage(application);
    if (page.cache === '') {
        page.show();
        const pageParsed = page.cache;
        const blind = pageParsed.getElementsByClassName('blind')[0];
        blind.addEventListener('click', (evt) => {
            page.hide()
            // application.removeChild(pageParsed);
        });

        const form = pageParsed.getElementsByClassName('form-body')[0];
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            if (!page.isValid()) {
                return;
            }

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            AjaxModule.postUsingFetch({
                url: serverApiPath + urls.loginUrl,
                body: {email, password},
            }).then(({status, parsedJson}) => {
                if (status === 200) {
                    config.me.open();
                } else {
                    const {error} = parsedJson;
                    alert(error);
                }
            });
        });

        document
            .getElementById('form-header__signup-link')
            .addEventListener('click', (evt) => {
                evt.preventDefault();
                console.log("TO SIGNUP");
                page.hide()
                // application.removeChild(pageParsed);
                config.signup.open();
            });
    } else {
        page.show();
    }
};

config.me.open = () => {
    AjaxModule.getUsingFetch({
        url: serverApiPath + urls.profileUrl,
        body: null,
    }).then((response) => {
        return response.json();
    }).then((response) => {
        if (response.error === 'user is unauthorized') {
            config.login.open();
            return;
        }
        application.innerHTML = '';
        const profile = new ProfilePage(application);
        const profileHTML = profile.render();
        application.appendChild(profileHTML);
        profile.addFormEventListener();
        profile.data = response;
        if (response.avatar === '') {
            profile.data.avatar = fileServerHost + urls.defaultAvatar;
        } else {
            profile.data.avatar = fileServerHost + response.avatar;
        }
        profile.renderData();
    }).catch((error) => {
        console.error(error);
    });
};

config.item.open = (itemId=1) => {
    application.innerHTML = '';
    AjaxModule.getUsingFetch({
        url: serverApiPath + `/product/${itemId}`,
    }).then((response) => {
        return response.json();
    }).then((parsedJson) => {
        const base = parsedJson['price']['base_cost'];
        const discount = parsedJson['price']['discount'];
        const discountPrice = (base * (1 - discount*0.01)).toFixed(2);
        const item = {
            name: parsedJson['title'],
            price: {
                discountPrice: discountPrice,
                base: base,
                discount: discount,
            },
            rating: parsedJson['rating'],
            description: {
                Category: parsedJson['category'],
            },
            images: parsedJson['images'],
        };
        const page = new ProductPage(application).render(item);
        for (const button of page.getElementsByClassName('button_pagination')) {
            button.addEventListener('click', () => {
                config.items.open(parseInt(button.textContent));
            });
        }
        application.appendChild(page);
    });
};

config.items.open = (currentPage=1) => {
    application.innerHTML = '';
    AjaxModule.postUsingFetch({
        url: serverApiPath + '/product',
        body: {
            page_num: currentPage,
            count: 4,
            sort_key: 'cost',
            sort_direction: 'ASC',
        },
    }).then((response) => {
        return response.json();
    }).then((parsedJson) => {
        const page = new ProductsPage(application).render({
            products: parsedJson['list_preview_products'],
            paginationInfo: {
                pagesCount: parsedJson['max_count_pages'],
                currentPage: currentPage,
            },
        });
        for (const button of page.getElementsByClassName('button_pagination')) {
            button.addEventListener('click', () => {
                config.items.open(parseInt(button.textContent));
            });
        }
        for (const itemContainer of page.getElementsByClassName('item-container')) {
            itemContainer.addEventListener('click', () => {
                config.item.open(parseInt(itemContainer.getElementsByClassName('item-id')[0].textContent));
            });
        }
        application.appendChild(page);
    });
};


application.addEventListener('click', (evt) => {
    const {target} = evt;

    if (target instanceof HTMLAnchorElement) {
        evt.preventDefault();
        config[target.dataset.section].open();
    }
});

config.home.open();
