import {ProfilePage} from './views/ProfilePage/ProfilePage.js';
import {LoginPage} from './views/LoginPage/LoginPage.js';
import {SignupPage} from './views/SignupPage/SignupPage.js';
import {HomePage} from './views/HomePage/HomePage.js';
import {ProductsPage} from './views/ProductsPage/ProductsPage.js';
import {ProductPage} from './views/ProductPage/ProductPage.js';
import {AjaxModule} from './modules/Ajax/Ajax.js';
import {FileServerHost, ServerApiPath, Urls} from './utils/urls/urls.js';

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

    const page = new HomePage(application);
    page.render(config);
};

config.signup.open = () => {
    const page = new SignupPage(application);
    const pageParsed = page.render();
    const blind = pageParsed.getElementsByClassName('blind')[0];

    blind.addEventListener('click', (evt) => {
        application.removeChild(pageParsed);
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
            url: ServerApiPath + Urls.signupUrl,
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

    application.appendChild(pageParsed);

    document
        .getElementById('form-header__login-link')
        .addEventListener('click', (evt) => {
            evt.preventDefault();
            application.removeChild(pageParsed);
            config.login.open();
        });
};

config.login.open = () => {
    const page = new LoginPage(application);
    const pageParsed = page.render();
    const blind = pageParsed.getElementsByClassName('blind')[0];
    blind.addEventListener('click', (evt) => {
        application.removeChild(pageParsed);
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
            url: ServerApiPath + Urls.loginUrl,
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

    application.appendChild(pageParsed);

    document
        .getElementById('form-header__signup-link')
        .addEventListener('click', (evt) => {
            evt.preventDefault();
            application.removeChild(pageParsed);
            config.signup.open();
        });
};

config.me.open = () => {
    AjaxModule.getUsingFetch({
        url: ServerApiPath + Urls.profileUrl,
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
            profile.data.avatar = FileServerHost + Urls.defaultAvatar;
        } else {
            profile.data.avatar = FileServerHost + response.avatar;
        }
        profile.renderData();
    }).catch((error) => {
        console.error(error);
    });
};

config.item.open = (itemId=1) => {
    application.innerHTML = '';
    AjaxModule.getUsingFetch({
        url: ServerApiPath + `/product/${itemId}`,
    }).then((response) => {
        return response.json();
    }).then((parsedJson) => {
        const base = parsedJson['price']['base_cost'];
        const discount = parsedJson['price']['discount'];
        const discountPrice = base * (1 - discount);
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
        url: ServerApiPath + '/product',
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
