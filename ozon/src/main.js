import {ProfilePage} from './views/ProfilePage/ProfilePage.js';
import {LoginPage} from './views/LoginPage/LoginPage.js';
import {SignupPage} from './views/SignupPage/SignupPage.js';
import {HomePage} from './views/HomePage/HomePage.js';
import {AjaxModule} from './modules/Ajax/Ajax.js';
import {ServerApiPath, Urls} from './utils/urls/urls.js';

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
        if (evt.target === evt.currentTarget) {
            application.removeChild(pageParsed);
        }
    });

    const form = pageParsed.getElementsByClassName('form-body')[0];
    form.addEventListener('submit', (evt) => {
        evt.preventDefault();


        if (page.isValid()) {
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            AjaxModule.postUsingFetch({
                url: ServerApiPath + Urls.signupUrl,
                body: {email, password},
            })
                .then(({status, parsedJson}) => {
                    if (status === 201) {
                        config.me.open();
                    } else {
                        const {error} = parsedJson;
                        console.error(error);
                    }
                });
        }
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
        if (evt.target === evt.currentTarget) {
            application.removeChild(pageParsed);
        }
    });

    const form = pageParsed.getElementsByClassName('form-body')[0];
    form.addEventListener('submit', (evt) => {
        evt.preventDefault();

        if (page.isValid()) {
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
                        alert(error);
                    }
                });
        }
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
    application.innerHTML = '';
    const profile = new ProfilePage(application);
    const profileHTML = profile.render();

    AjaxModule.getUsingFetch({
        url: ServerApiPath + Urls.profileUrl,
        body: null,
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
                    body: formData,
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
};

application.addEventListener('click', (evt) => {
    const {target} = evt;

    if (target instanceof HTMLAnchorElement) {
        evt.preventDefault();
        config[target.dataset.section].open();
    }
});

config.home.open();
