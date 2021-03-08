import {ProfilePage} from './views/ProfilePage/ProfilePage.js';
import {LoginPage} from "./views/LoginPage/LoginPage.js";
import {SignupPage} from "./views/SignupPage/SignupPage.js";
import {HomePage} from "./views/HomePage/HomePage.js";
import {AjaxModule} from "./modules/Ajax/Ajax.js";
import {ServerApiPath, Urls} from "./utils/urls/urls.js";

const application = document.getElementById('app');
const fileServerURL = 'http://localhost:8100'
const mainServerURL = 'http://localhost:8080/api/v1/user/'
const defaultAvatarURL = 'http://localhost:8100/avatar/default.png'

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
    const page = new SignupPage(application).render();
    const blind = page.getElementsByClassName('blind')[0];

    blind.addEventListener('click', (evt) => {
        if (evt.target === evt.currentTarget)
            application.removeChild(page);
    });

    const form = page.getElementsByClassName('form-body')[0];
    form.addEventListener('submit', (evt) => {
        evt.preventDefault();


        // const firstName = document.getElementById('first-name').value.trim();
        // const lastName = document.getElementById('last-name').value.trim();
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

let isPageWasOpened = false
config.me.open = () => {
    application.innerHTML = ''
    const profile = new ProfilePage(application);
    const profileHTML = profile.render();

    if (!isPageWasOpened) {
        isPageWasOpened = true;
        application.addEventListener('submit', (evt) => {
            evt.preventDefault();
            let avatar_file = application.getElementsByClassName('profile-info__user-avatar-input')[0];
            if (typeof avatar_file !== 'undefined') {
                avatar_file = avatar_file.files[0];
            }
            const first_name = document.getElementsByName('firstName')[0].value.trim();
            const last_name = document.getElementsByName('lastName')[0].value.trim();

            if (profile.isValid(['text'])) {
                AjaxModule.putUsingFetch({
                    url: ServerApiPath + Urls.profileUrl,
                    body: {first_name, last_name}
                }).then(() => {
                    AjaxModule.getUsingFetch({
                        url: ServerApiPath + Urls.profileUrl,
                        body: null
                    }).then((response) => {
                        return response.json();
                    }).then((response) => {
                        profile.data = response;
                        if (response.avatar === '') {
                            profile.data.avatar = defaultAvatarURL
                        } else {
                            profile.data.avatar = fileServerURL + response.avatar;
                        }
                        profile.renderData();
                    })
                }).catch((err) => {
                    console.error(err);
                })
            }

            if (profile.isValid(['file']) && typeof avatar_file !== "undefined") {
                    const formData = new FormData();
                    formData.append('avatar', avatar_file);
                    AjaxModule.putUsingFetch({
                        data: true,
                        url: ServerApiPath + Urls.profileAvatarUrl,
                        body: formData
                    }).then(() => {
                        AjaxModule.getUsingFetch({
                            url: ServerApiPath + Urls.profileAvatarUrl,
                            body: null
                        }).then((response) => {
                            return response.json();
                        }).then((response) => {
                            profile.data.avatar = fileServerURL + response.result;
                            profile.renderAvatar();
                        })
                    }).catch((err) => {
                        console.error(err);
                    })
                }
        });
    }

    AjaxModule.getUsingFetch({
        url: ServerApiPath + Urls.profileUrl,
        body: null
    }).then((response) => {
        return response.json();
    }).then((response) => {
        profile.data = response;
        if (response.avatar === '') {
            profile.data.avatar = defaultAvatarURL
        } else {
            profile.data.avatar = fileServerURL + response.avatar;
        }
        profile.renderData();
        }).catch((error) => {
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

application.addEventListener('click', (evt) => {
    const {target} = evt;

    if (target instanceof HTMLAnchorElement) {
        evt.preventDefault();
        config[target.dataset.section].open();
    }
});

config.home.open();
