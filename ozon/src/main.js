import {ProfilePage} from './views/ProfilePage/ProfilePage.js';
import {LoginPage} from './views/LoginPage/LoginPage.js';
import {SignupPage} from './views/SignupPage/SignupPage.js';
import {HomePage} from './views/HomePage/HomePage.js';
import {AjaxModule} from './modules/Ajax/Ajax.js';

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

};

config.signup.open = () => {

    application.innerHTML = '';
    const page = new SignupPage(application);
    const form = page.render();

    form.addEventListener('submit', (evt) => {

        evt.preventDefault();

        const email = document.getElementsByName('Email')[0].value.trim();
        const password = document.getElementsByName('Pass')[0].value.trim();
        const age = document.getElementsByName('Age')[0].value.valueAsNumber;

        AjaxModule.postUsingFetch({
            url: '/signup',
            body: {email, password, age},
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

};

config.login.open = () => {

    application.innerHTML = '';
    const page = new LoginPage(application);
    const form = page.render();

    form.addEventListener('submit', (evt) => {

        evt.preventDefault();

        const email = form.elements['Емайл'].value.trim();
        const password = form.elements['Пароль'].value.trim();

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

            });

    });


    application.appendChild(form);

};

config.me.open = () => {

    application.innerHTML = '';

    const profile = new ProfilePage(application);
    profile.render();
    AjaxModule.getUsingFetch({
        url: '/me',
        body: null,
    })
        .then((response) => {

            profile.data = response.json();
            profile.renderData();

        })
        .catch((error) => {

            if (error instanceof Error) {

                console.log(error);

            }
            const {responseObject} = error;
            alert(`Нет авторизации
                   ${JSON.stringify({status, responseObject})}`);
            config.login.open();

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
