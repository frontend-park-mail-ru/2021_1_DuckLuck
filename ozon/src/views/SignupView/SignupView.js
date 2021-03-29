import {BaseView} from '../BaseView.js';
import {Input} from '../Common/Input/Input.js';
import {Button} from '../Common/Button/Button.js';
import {Link} from '../Common/Link/Link.js';
import {Popup} from '../Common/Popup/Popup.js';
import {Blind} from '../Common/Blind/Blind.js';
import {AuthenticationForm} from '../Common/AuthenticationForm/AuthenticationForm.js';
import Router from '../../Router.js';
import Bus from '../../bus.js';

/**
 * @class  SignupView
 * @extends BaseView
 * @classdesc Class for signup page
 */
export class SignupView extends BaseView {
    /**
     *
     * @param {Object} parent parents object
     */
    constructor(parent) {
        if (SignupView.__instance) {
            return SignupView.__instance;
        }

        super(parent);
        SignupView.__instance = this;
    }

    /**
     *
     * @return {void} rendered page
     */
    render = () => {
        if (this.cache !== '') {
            this.el.appendChild(this.cache);
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
                                placeholder: 'Email address',
                            }),
                            new Input({
                                type: 'password',
                                name: 'password',
                                placeholder: 'Password',
                            }),
                            new Input({
                                type: 'password',
                                name: 'repeat_password',
                                placeholder: 'Repeat password',
                            }),
                        ],
                        forgotPassLink: new Link({
                            href: 'test',
                        }),
                        submitButton: new Button({
                            text: 'Register',
                            type: 'submit',
                        }),
                    },
                }),
            background: new Blind().getHtmlString(),
            popupType: 'signup',
        });

        this.cache = new DOMParser().parseFromString(template, 'text/html').getElementById('popup-wrapper');

        const blind = this.cache.getElementsByClassName('blind')[0];
        blind.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.remove();
            (new Router()).return();
        });

        const form = this.cache.getElementsByClassName('form-body')[0];
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            Bus.emit('signup-send-data');
        });

        this.cache.getElementsByClassName('link link_weight-h1')[1]
            .addEventListener('click', (evt) => {
                evt.preventDefault();
                this.remove();
                new Router().open('/login', true);
            });
        this.el.appendChild(this.cache);
    }
}
