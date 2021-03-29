import {BaseView} from '../BaseView.js';
import {Input} from '../Common/Input/Input.js';
import {Button} from '../Common/Button/Button.js';
import {Link} from '../Common/Link/Link.js';
import {Popup} from '../Common/Popup/Popup.js';
import {Blind} from '../Common/Blind/Blind.js';
import {AuthenticationForm} from '../Common/AuthenticationForm/AuthenticationForm.js';
import {isValidForm} from '../../utils/validator';

/**
 * @class LoginView
 * @extends BaseView
 * @classdesc Class for Login page
 */
export class LoginView extends BaseView {
    /**
     * @param {Object} parent parents object
     */
    constructor(parent) {
        if (LoginView.__instance) {
            return LoginView.__instance;
        }

        super(parent);
        LoginView.__instance = this;
    }

    /**
     *
     * @return {void} html form
     */
    render = () => {
        if (this.cache !== '') {
            this.el.appendChild(this.cache);
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
        this.el.appendChild(this.cache);
    }

    /**
     *
     * @param {string[]} specificTypeToCheck if this parameter is not empty, only inputs of a certain
     * type specified in this parameter will be checked
     * @return {boolean} true if form valid, false otherwise
     */
    isValid = (specificTypeToCheck = []) => {
        const form = this.cache.getElementsByClassName('form-body')[0].getElementsByTagName('form')[0];
        return isValidForm(form, specificTypeToCheck);
    }
}
