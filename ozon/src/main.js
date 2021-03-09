import {ProfilePage} from './views/ProfilePage/ProfilePage.js';
import {LoginPage} from "./views/LoginPage/LoginPage.js";
import {SignupPage} from "./views/SignupPage/SignupPage.js";
import {HomePage} from "./views/HomePage/HomePage.js";
import {ProductsPage} from "./views/ProductsPage/ProductsPage.js";
import {ProductPage} from "./views/ProductPage/ProductPage.js";
import {AjaxModule} from "./modules/Ajax/Ajax.js";
import {ServerApiPath, Urls} from "./utils/urls/urls.js";

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
    const page = new SignupPage(application).render();
    const blind = page.getElementsByClassName('blind')[0];

    blind.addEventListener('click', (evt) => {
        if (evt.target === evt.currentTarget)
            application.removeChild(page);
    });

    const form = page.getElementsByClassName('form-body')[0];
    form.addEventListener('submit', (evt) => {
        evt.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        AjaxModule.postUsingFetch({
            url: ServerApiPath + Urls.signupUrl,
            body: { email, password},
        })
            .then(({status, parsedJson}) => {
                if (status === 201) {
                    config.me.open();
                } else {
                    const {error} = parsedJson;
                    console.error(error);
                }
            });
    });

    application.appendChild(page);

    document
        .getElementById('form-header__login-link')
        .addEventListener('click', (evt) => {
            evt.preventDefault();
            application.removeChild(page);
            config.login.open();
        });
}

config.login.open = () => {
    const page = new LoginPage(application).render();
    const blind = page.getElementsByClassName('blind')[0];
    blind.addEventListener('click', (evt) => {
        if (evt.target === evt.currentTarget)
            application.removeChild(page);
    });

    const form = page.getElementsByClassName('form-body')[0];
    form.addEventListener('submit', (evt) => {
        evt.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        AjaxModule.postUsingFetch({
            url: ServerApiPath + Urls.loginUrl,
            body: {email, password},
        })
            .then(({status, parsedJson}) => {
                if (status === 200) {
                    config.me.open();
                } else {
                    const {error} = parsedJson;
                    console.error(error);
                }
            });
    });

    application.appendChild(page);

    document
        .getElementById('form-header__signup-link')
        .addEventListener('click', (evt)  => {
            evt.preventDefault();
            application.removeChild(page);
            config.signup.open();
        });
}

config.me.open = () => {
    application.innerHTML = ''
    const profile = new ProfilePage(application);
    const profileHTML = profile.render()

    AjaxModule.getUsingFetch({
        url: ServerApiPath + Urls.profileUrl,
        body: null
    })
        .then(({status, parsedJson}) => {
            profile.data = parsedJson;
            profile.renderData();

            const avatar = application.getElementsByClassName('profile-info__user-avatar-input')[0];
            application.addEventListener('submit', (evt) => {
                evt.preventDefault();
                const formData = new FormData();
                formData.append('avatar', application.getElementsByClassName('profile-info__user-avatar-input')[0].files[0]);

                AjaxModule.putUsingFetch({
                    data: true,
                    url: ServerApiPath + Urls.profileAvatarUrl,
                    body: formData
                }).then(() => console.log('success'));

            });

        })
        .catch((error) => {
            if (error instanceof Error) {
                console.error(error);
            }
            const {responseObject} = error;
            alert(`Нет авторизации
                   ${JSON.stringify({status, responseObject})}`);
            config.login.open();
        });

    application.appendChild(profileHTML);
}

config.item.open = (itemId=1) => {
    application.innerHTML = '';
    AjaxModule.getUsingFetch({
        url: ServerApiPath + `/product/${itemId}`,
    })
        .then(({status, parsedJson}) => {
            const base = parsedJson['price']['base_cost'];
            const discount = parsedJson['price']['discount'];
            const discountPrice = base * (1 - discount*0.01);
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
            }
            const page = new ProductPage(application).render({item: item});
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
            count: 10,
            sort_key: 'cost',
            sort_direction: 'ASC',
        }
    })
        .then(({status, parsedJson}) => {
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
