import {ProfileView} from './views/ProfileView/ProfileView.js';
import {LoginView} from './views/LoginView/LoginView.js';
import {SignupView} from './views/SignupView/SignupView.js';
import {HomeView} from './views/HomeView/HomeView.js';
import {ProductView} from './views/ProductView/ProductView.js';
import {AjaxModule} from './modules/Ajax/Ajax.js';
import Bus from './bus.js';
import ProfilePresenter from './presenters/ProfilePresenter';
import Router from './Router.js';
import SignupModel from './models/SignupModel';
import SignupPresenter from './presenters/SignupPresenter';
import ProfileModel from './models/ProfileModel';
import LoginModel from './models/LoginModel';
import LoginPresenter from './presenters/LoginPresenter';
import {ProductsView} from './views/ProductsView/ProductsView';
import ProductsModel from './models/ProductsModel';
import ProductsPresenter from './presenters/ProductsPresenter';
import ProductModel from './models/ProductModel';
import ProductPresenter from './presenters/ProductPresenter';

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


// config.home.open = () => {
//     application.innerHTML = '';
//
//     const page = new HomeView(application);
//     page.show();
// };


const router = new Router(application);

const signupView = new SignupView(application);
const signupModel = new SignupModel();
const signupPresenter = new SignupPresenter(signupView, signupModel);
signupView.presenter = signupPresenter;
Bus.on('signup-send-data', signupPresenter.sendFormToModel);
Bus.on('signup-emit-result', signupPresenter.processSignupResult);

const loginView = new LoginView(application);
const loginModel = new LoginModel();
const loginPresenter = new LoginPresenter(loginView, loginModel);
Bus.on('login-send-data', loginPresenter.sendFormToModel);
Bus.on('login-emit-result', loginPresenter.processLoginResult);


const profileView = new ProfileView(application);
const profileModel = new ProfileModel();
const profilePresenter = new ProfilePresenter(profileView, profileModel);
profileView.presenter = profilePresenter;
Bus.on('profile-flname-change', profilePresenter.changeFirstLastName);
Bus.on('profile-flname-result', profilePresenter.firstLastNameChangeProcessResult);

Bus.on('profile-avatar-change', profilePresenter.changeAvatar);
Bus.on('profile-avatar-result', profilePresenter.avatarChangeProcessResult);

Bus.on('profile-email-result', profilePresenter.emailChangeProcessResult);

Bus.on('check-auth-result', profilePresenter.tryAuthProcessResult);


const productsView = new ProductsView(application);
const productsModel = new ProductsModel();
const productsPresenter = new ProductsPresenter(productsView, productsModel);
productsView.presenter = productsPresenter;
Bus.on('products-model-loaded', productsPresenter.productLoadedReaction);

const productView = new ProductView(application);
const productModel = new ProductModel();
const productPresenter = new ProductPresenter(productView, productModel);
productView.presenter = productPresenter;
Bus.on('product-model-changeID', productPresenter.changeID);
Bus.on('product-model-loaded', productPresenter.productLoadedReaction);


router
    .register('/', HomeView)
    .register('/signup', SignupView)
    .register('/login', LoginView)
    .register('/profile', ProfileView)
    .register('/items', ProductsView)
    .register('/item', ProductView);

router.start();
router.open('/');


// config.signup.open = () => {
//     const page = new SignupView(application);
//     if (page.cache === '') {
//         page.show()
//         const pageParsed = page.cache;
//         const blind = pageParsed.getElementsByClassName('blind')[0];
//
//         blind.addEventListener('click', (evt) => {
//             page.remove();
//         });
//
//         const form = pageParsed.getElementsByClassName('form-body')[0];
//         form.addEventListener('submit', (evt) => {
//             evt.preventDefault();
//
//             if (!page.isValid()) {
//                 return;
//             }
//
//             const email = document.getElementById('email').value.trim();
//             const password = document.getElementById('password').value.trim();
//
//             AjaxModule.postUsingFetch({
//                 url: serverApiPath + urls.signupUrl,
//                 body: {email, password},
//             }).then(({status, parsedJson}) => {
//                 if (status === 201) {
//                     config.me.open();
//                 } else {
//                     const {error} = parsedJson;
//                     console.error(error);
//                 }
//             });
//         });
//
//         pageParsed.getElementsByClassName('link link_weight-h1')[1]
//             .addEventListener('click', (evt) => {
//                 evt.preventDefault();
//                 page.remove();
//                 config.login.open();
//             });
//     } else {
//         page.show();
//     }
// };
//
// config.login.open = () => {
//     const page = new LoginView(application);
//     if (page.cache === '') {
//         page.show();
//         const pageParsed = page.cache;
//         const blind = pageParsed.getElementsByClassName('blind')[0];
//         blind.addEventListener('click', (evt) => {
//             page.remove();
//         });
//
//         const form = pageParsed.getElementsByClassName('form-body')[0];
//         form.addEventListener('submit', (evt) => {
//             evt.preventDefault();
//             if (!page.isValid()) {
//                 return;
//             }
//
//             const email = document.getElementById('email').value.trim();
//             const password = document.getElementById('password').value.trim();
//
//             AjaxModule.postUsingFetch({
//                 url: serverApiPath + urls.loginUrl,
//                 body: {email, password},
//             }).then(({status, parsedJson}) => {
//                 if (status === 200) {
//                     config.me.open();
//                 } else {
//                     const {error} = parsedJson;
//                     alert(error);
//                 }
//             });
//         });
//
//
//             pageParsed.getElementsByClassName('link link_weight-h1')[0]
//             .addEventListener('click', (evt) => {
//                 evt.preventDefault();
//                 page.remove();
//                 config.signup.open();
//             });
//     } else {
//         page.show();
//     }
// };
//
// config.me.open = () => {
//     const profile = new ProfileView(application);
//     if (profile.cache === '') {
//         AjaxModule.getUsingFetch({
//             url: serverApiPath + urls.profileUrl,
//             body: null,
//         }).then((response) => {
//             return response.json();
//         }).then((response) => {
//             if (response.error === 'user is unauthorized') {
//                 config.login.open();
//                 return;
//             }
//             application.innerHTML = '';
//             const profile = new ProfileView(application);
//             profile.show()
//             const profileHTML = profile.cache;
//             profile.addFormEventListener();
//             profile.data = response;
//             if (response.avatar === '') {
//                 profile.data.avatar = fileServerHost + urls.defaultAvatar;
//             } else {
//                 profile.data.avatar = fileServerHost + response.avatar;
//             }
//             profile.renderData();
//         }).catch((error) => {
//             console.error(error);
//         });
//     } else {
//         profile.show();
//     }
// };
//
config.item.open = (itemId=1) => {
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
        const page = new ProductView(application);
        page.item = item;
        page.show();
        for (const button of page.cache.getElementsByClassName('button_pagination')) {
            button.addEventListener('click', () => {
                config.items.open(parseInt(button.textContent));
            });
        }
    });
};
//
// config.items.open = (currentPage=1) => {
//     AjaxModule.postUsingFetch({
//         url: serverApiPath + '/product',
//         body: {
//             page_num: currentPage,
//             count: 4,
//             sort_key: 'cost',
//             sort_direction: 'ASC',
//         },
//     }).then((response) => {
//         return response.json();
//     }).then((parsedJson) => {
//         const page = new ProductsView(application)
//         page.products = parsedJson['list_preview_products'];
//         page.paginationInfo = {
//             pagesCount: parsedJson['max_count_pages'],
//             currentPage: currentPage,
//         };
//         page.show();
//         for (const button of page.cache.getElementsByClassName('button_pagination')) {
//             button.addEventListener('click', () => {
//                 config.items.open(parseInt(button.textContent));
//             });
//         }
//         for (const itemContainer of page.cache.getElementsByClassName('item-container')) {
//             itemContainer.addEventListener('click', () => {
//                 config.item.open(parseInt(itemContainer.getElementsByClassName('item-id')[0].textContent));
//             });
//         }
//     });
// };


// application.addEventListener('click', (evt) => {
//     const {target} = evt;
//
//     if (target instanceof HTMLAnchorElement) {
//         evt.preventDefault();
//         config[target.dataset.section].open();
//     }
// });

// config.home.open();
