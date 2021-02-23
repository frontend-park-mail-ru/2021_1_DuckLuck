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
    application.innerHTML = '';
    const page = new SignupPage(application);
    const form = page.render();

    form.addEventListener('submit', (evt) => {
        evt.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const age = +ageInput.value;

        AjaxModule.postUsingFetch({
            url: '/signup',
            body: {email, password, age},
        })
            .then(({statusCode, responseObject}) => {
                if (statusCode === 201) {
                    config.profile.open();
                } else {
                    const {error} = responseObject;
                    alert(error);
                }
            });
    });
}

config.login.open = () => {
    application.innerHTML = '';
    const page = new LoginPage(application);
    const form = page.render();

    form.addEventListener('submit', (evt) => {
        evt.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        AjaxModule.postUsingFetch({
            url: '/login',
            body: {email, password},
        })
            .then(({statusCode, responseObject}) => {
                if (statusCode === 200) {
                    config.profile.open();
                } else {
                    const {error} = responseObject;
                    alert(error);
                }
            })
    });


    application.appendChild(form);
}

config.me.open = () => {
    application.innerHTML = '';

    AjaxModule.getUsingFetch({
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