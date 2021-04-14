import {BaseView} from '../BaseView.js';
import {Input} from '../Common/Input/Input.js';
import {Button} from '../Common/Button/Button.js';
import {Link} from '../Common/Link/Link.js';
import {Popup} from '../Common/Popup/Popup.js';
import {Blind} from '../Common/Blind/Blind.js';
import {AuthenticationForm} from '../Common/AuthenticationForm/AuthenticationForm.js';
import AuthenticationFormStyles from '../Common/AuthenticationForm/AuthenticationForm.css';
import Router from '../../utils/router/Router';
import Events from '../../utils/bus/events';

/**
 * @class LoginView
 * @extends BaseView
 * @classdesc Class for Login page
 */
export class LoginView extends BaseView {
    /**
     *
     * @return {void} html form
     */
    render = () => {
        if (this.cache !== '') {
            this.parent.appendChild(this.cache);
            return;
        }

        const template = new Popup().getHtmlString({
            popupBody:
                new AuthenticationForm().getHtmlString({
                    formType: 'login',
                    formData: {
                        inputFields: [
                            new Input({
                                type: 'text',
                                name: 'email',
                                placeholder: 'Электронная почта',
                            }),
                            new Input({
                                type: 'password',
                                name: 'password',
                                placeholder: 'Пароль',
                            }),
                        ],
                        link: new Link({
                            href: '/signup',
                            name: 'Зарегистрироваться',
                        }),
                        submitButton: new Button({
                            text: 'Войти',
                            type: 'submit',
                        }),
                    },
                    styles: AuthenticationFormStyles,
                }),
            background: new Blind().getHtmlString(),
            popupType: 'login',
        });
        this.cache = new DOMParser().parseFromString(template, 'text/html').getElementById('popup-wrapper');

        this.cache.getElementsByClassName('blind')[0]
            .addEventListener('click', (evt) => {
                evt.preventDefault();
                this.remove();
                Router.return();
            });

        const form = this.cache.getElementsByClassName(AuthenticationFormStyles.button)[0];
        form.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.bus.emit(Events.LoginSendData);
        });


        this.cache.getElementsByClassName(AuthenticationFormStyles.signup)[0]
            .addEventListener('click', (evt) => {
                evt.preventDefault();
                this.remove();
                Router.open('/signup', {replaceState: true});
            });


        this.parent.appendChild(this.cache);
    }
}
