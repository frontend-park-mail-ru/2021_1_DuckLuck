import {BasePage} from '../BasePage.js';
import {Input} from '../Common/Input/Input.js';
import {Button} from '../Common/Button/Button.js';
import {Link} from '../Common/Link/Link.js';
import {Popup} from '../Common/Popup/Popup.js';
import {Blind} from '../Common/Blind/Blind.js';
import {AuthenticationForm} from '../Common/AuthenticationForm/AuthenticationForm.js';

/**
 * This is a description of the MyClass constructor function.
 * @class
 * @classdesc This is a description of the MyClass class.
 */
export class LoginPage extends BasePage {
    /**
     *
     * @param {Object} parent parents object
     */
    constructor(parent) {
        super(parent);
    }

    /**
     *
     * @return {HTMLFormElement} html form
     */
    render = () => {
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
        return new DOMParser().parseFromString(template, 'text/html')
            .getElementById('popup-wrapper');
    }
}
