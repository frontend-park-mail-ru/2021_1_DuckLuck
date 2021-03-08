import {ProfilePage} from './views/ProfilePage/ProfilePage.js';
import {LoginPage} from "./views/LoginPage/LoginPage.js";
import {SignupPage} from "./views/SignupPage/SignupPage.js";
import {HomePage} from "./views/HomePage/HomePage.js";
import {AjaxModule} from "./modules/Ajax/Ajax.js";

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
        href: '/me',
        text: 'Профиль',
    },
};

config.home.open = () => {
    application.innerHTML = '';

    const page = new HomePage(application);
    page.render(config);
}

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

        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        AjaxModule.postUsingFetch({
            url: '/signup',
            body: {firstName, lastName, email, password},
        })
            .then((response) => {
                if (response.status === 201) {
                    config.me.open();
                } else {
                    const {error} = response;
                    console.log(error);
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
            url: '/login',
            body: {email, password},
        })
            .then((response) => {
                if (response.status === 200) {
                    config.me.open();
                } else {
                    const {error} = response;
                    console.log(error);
                }
            })
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
    application.innerHTML = '';

    const profile = new ProfilePage(application);
    profile.render();
    AjaxModule.getUsingFetch({
        url: '/me',
        body: null
    })
        .then((response) => {
            profile.data = response.json();
            profile.renderData();
        })
        .catch((error) => {
            if (error instanceof Error) {
                console.log(error);
            }
            const {statusCode, responseObject} = error;
            alert(`Нет авторизации ${JSON.stringify({status, responseObject})}`);
            config.login.open();
        });
}

application.addEventListener('click', (evt) => {
    const {target} = evt;

    if (target instanceof HTMLAnchorElement) {
        evt.preventDefault();
        config[target.dataset.section].open();
    }
});

config.home.open();