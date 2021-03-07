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

        const email = document.getElementsByName('Email')[0].value.trim();
        const password = document.getElementsByName('Pass')[0].value.trim();
        const age = document.getElementsByName('Age')[0].value;


        AjaxModule.postUsingFetch({
            url: 'http://localhost:8080/api/v1/user/signup',
            // url: '/signup',
            body: {email, password, age},
        })
            .then(({status, parsedJson}) => {
                if (status === 201) {
                    config.me.open();
                } else {
                    const {error} = parsedJson;
                    console.log(error);
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

        const email = form.elements['Емайл'].value.trim();
        const password = form.elements['Пароль'].value.trim();

        AjaxModule.postUsingFetch({
            url: 'http://localhost:8080/api/v1/user/login',
            body: {email, password},
        })
            .then(({status, parsedJson}) => {
                if (status === 200) {
                    config.me.open();
                } else {
                    const {error} = parsedJson;
                    console.log(error);
                }
            })
    });


    application.appendChild(form);
}

config.me.open = () => {
    application.innerHTML = '';
    const profile = new ProfilePage(application);

    AjaxModule.getUsingFetch({
        url: 'http://localhost:8080/api/v1/user/profile',
        body: null
    })
        .then(({status, parsedJson}) => {
            profile.render();
            profile.data = parsedJson;
            profile.renderData();

            const avatar = application.getElementsByClassName('profile-info__user-avatar-input')[0];
            application.addEventListener('submit', (evt) => {
                evt.preventDefault();

                        let reader = new FileReader();

                        // Closure to capture the file information.
                        reader.onload = (function(theFile) {
                            return function(e) {
                                let avatar = e.target.result;
                                // https://developer.mozilla.org/en/JavaScript_typed_arrays
                                // let avatar = new Uint8Array(raw);
                                AjaxModule.putUsingFetch({
                                    url: 'http://localhost:8080/api/v1/user/profile/avatar',
                                    body: {avatar},
                                }).then(({status, parsedJson}) => {
                                        console.log(status, parsedJson);
                                    }
                                )

                                console.log(avatar);
                            };
                        })(application.getElementsByClassName('profile-info__user-avatar-input')[0].files[0]);


                        // console.log(application.getElementsByClassName('profile-info__user-avatar-input')[0].files[0]);
                        // Read in the image file as a data URL.
                        reader.readAsBinaryString(application.getElementsByClassName('profile-info__user-avatar-input')[0].files[0]);

            });

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