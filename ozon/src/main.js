import {ProfilePage} from './views/ProfilePage/ProfilePage.js';
import {LoginPage} from "./views/LoginPage/LoginPage.js";
import {SignupPage} from "./views/SignupPage/SignupPage.js";
import {HomePage} from "./views/HomePage/HomePage.js";

const {ajaxPutUsingFetch, ajaxDeleteUsingFetch, ajaxPostUsingFetch, ajaxGetUsingFetch} = globalThis.AjaxModule;

const application = document.getElementById('app');

const config = {
    menu: {
        href: '/',
        text: 'Главная',
        open: homePage,
    },
    signup: {
        href: '/signup',
        text: 'Зарегистрироваться',
        open: signupPage,
    },
    login: {
        href: '/login',
        text: 'Авторизоваться',
        open: loginPage,
    },
    profile: {
        href: '/profile',
        text: 'Профиль',
        open: profilePage,
    },
};

function homePage() {
    application.innerHTML = '';

    const page = new HomePage(application);
    page.render(config);
}

function signupPage() {
    application.innerHTML = '';
    const page = new SignupPage(application);
    const form = page.render();

    application.appendChild(form);

    form.addEventListener('submit', (evt) => {
        evt.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const age = +ageInput.value;

        ajaxPostUsingFetch({
            url: '/signup',
            body: {email, password, age},
        })
            .then(({statusCode, responseObject}) => {
                if (statusCode === 201) {
                    profilePage();
                } else {
                    const {error} = responseObject;
                    alert(error);
                }
            });
    });
}

function loginPage() {
    application.innerHTML = '';
    const page = new LoginPage(application);
    const form = page.render();

    form.addEventListener('submit', (evt) => {
        evt.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        ajaxPostUsingFetch({
            url: '/login',
            body: {email, password},
        })
            .then(({statusCode, responseObject}) => {
                if (statusCode === 200) {
                    profilePage();
                } else {
                    const {error} = responseObject;
                    alert(error);
                }
            })
    });


    application.appendChild(form);
}

function profilePage() {
    application.innerHTML = '';

    ajaxGetUsingFetch({
        url: '/me',
        body: null
    })
        .then(({statusCode, responseObject}) => {
            const profile = new ProfilePage(application);
            profile.data = responseObject;
            profile.render();
        })
        .catch((err) => {
            if (err instanceof Error) {
                // handle JSON.parse error
            }
            const {statusCode, responseObject} = err;
            alert(`Нет авторизации ${JSON.stringify({status, responseObject})}`);
            loginPage();
        });
}

application.addEventListener('click', (evt) => {
    const {target} = evt;

    if (target instanceof HTMLAnchorElement) {
        evt.preventDefault();
        config[target.dataset.section].open();
    }
});

homePage();