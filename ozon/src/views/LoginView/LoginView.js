import {BaseView} from '../BaseView.js';
import {Input} from '../Common/Input/Input.js';
import {Button} from '../Common/Button/Button.js';
import {Link} from '../Common/Link/Link.js';
import {Popup} from '../Common/Popup/Popup.js';
import {Blind} from '../Common/Blind/Blind.js';
import {AuthenticationForm} from '../Common/AuthenticationForm/AuthenticationForm.js';
import Router from '../../Router';
import Bus from '../../utils/bus/bus';
import Events from '../../utils/bus/events';

/**
 * @class LoginView
 * @extends BaseView
 * @classdesc Class for Login page
 */
export class LoginView extends BaseView {
    static #instance
    /**
     * @param {HTMLElement} parent Parent element
     */
    constructor(parent) {
        if (LoginView.#instance) {
            return LoginView.#instance;
        }

        super(parent);
        LoginView.#instance = this;
    }

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
                                placeholder: 'Email address',
                            }),
                            new Input({
                                type: 'password',
                                name: 'password',
                                placeholder: 'Password',
                            }),
                        ],
                        forgotPassLink: new Link({
                            href: 'test',
                        }),
                        submitButton: new Button({
                            text: 'Log in',
                            type: 'submit',
                        }),
                    },
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

        const form = this.cache.getElementsByClassName('form-body')[0];
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            Bus.emit(Events.LoginSendData, {});
        });


        this.cache.getElementsByClassName('link link_weight-h1')[0]
            .addEventListener('click', (evt) => {
                evt.preventDefault();
                this.remove();
                Router.open('/signup', {replaceState: true});
            });

        this.parent.appendChild(this.cache);
    }
}
