import {BaseView} from '../BaseView.js';
import {Input} from '../Common/Input/Input.js';
import {Button} from '../Common/Button/Button.js';
import {Link} from '../Common/Link/Link.js';
import {Popup} from '../Common/Popup/Popup.js';
import {Blind} from '../Common/Blind/Blind.js';
import {AuthenticationForm} from '../Common/AuthenticationForm/AuthenticationForm.js';
import Router from '../../utils/router/Router.js';
import Events from '../../utils/bus/events';
import AuthenticationFormStyles from '../Common/AuthenticationForm/AuthenticationForm.css';
import decorator from '../decorators.css';

/**
 * @class  SignupView
 * @extends BaseView
 * @classdesc Class for signup page
 */
export class SignupView extends BaseView {
    /**
     *
     * @return {void} rendered page
     */
    render = () => {
        const body = document.getElementsByTagName('body')[0];
        body.classList.add(decorator.noScroll);

        if (this.cache !== '') {
            const inputs = this.cache.getElementsByTagName('input');
            inputs[0].placeholder = 'Электронная почта';
            inputs[1].placeholder = 'Пароль';
            inputs[2].placeholder = 'Повтор пароля';
            for (const input of inputs) {
                input.style['border-color'] = '';
            }

            this.parent.appendChild(this.cache);
            return;
        }

        const template = new Popup().getHtmlString({
            popupBody:
                new AuthenticationForm().getHtmlString({
                    formType: 'signup',
                    formData: {
                        inputFields: [
                            new Input({
                                type: 'email',
                                name: 'email',
                                placeholder: 'Электронная почта',
                            }),
                            new Input({
                                type: 'password',
                                name: 'password',
                                placeholder: 'Пароль',
                            }),
                            new Input({
                                type: 'password',
                                name: 'repeat_password',
                                placeholder: 'Повтор пароля',
                            }),
                        ],
                        link: new Link({
                            href: '/login',
                            name: 'Войти',
                        }),
                        submitButton: new Button({
                            text: 'Зарегистрироваться',
                            type: 'submit',
                        }),
                    },
                    styles: AuthenticationFormStyles,
                }),
            background: new Blind().getHtmlString(),
            popupType: 'signup',
        });

        this.cache = new DOMParser().parseFromString(template, 'text/html').getElementById('popup-wrapper');

        this.cache.getElementsByClassName('blind')[0]
            .addEventListener('click', (evt) => {
                evt.preventDefault();
                body.classList.remove(decorator.noScroll);
                this.remove();
                Router.return();
            });

        const form = this.cache.getElementsByClassName(AuthenticationFormStyles.button)[0];
        form.addEventListener('click', (evt) => {
            evt.preventDefault();
            body.classList.remove(decorator.noScroll);
            this.bus.emit(Events.SignupSendData);
        });


        this.cache.getElementsByClassName(AuthenticationFormStyles.signup)[0]
            .addEventListener('click', (evt) => {
                evt.preventDefault();
                body.classList.remove(decorator.noScroll);
                this.remove();
                Router.open('/login', {replaceState: true});
            });
        this.parent.appendChild(this.cache);
    }

    invalidForm = () => {
        for (const input of this.cache.getElementsByTagName('input')) {
            input.value = '';
            input.placeholder = 'Некорректные данные';
            input.style['border-color'] = '#ff726f';
        }
    }
}
