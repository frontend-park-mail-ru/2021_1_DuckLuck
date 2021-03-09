import {BasePage} from "../BasePage.js";
import {Input} from "../Common/Input/Input.js";
import {Button} from "../Common/Button/Button.js";
import {Link} from "../Common/Link/Link.js";
import {Popup} from "../Common/Popup/Popup.js";
import {Blind} from "../Common/Blind/Blind.js";
import {AuthenticationForm} from "../Common/AuthenticationForm/AuthenticationForm.js";
import {isValidForm} from "../../utils/validator.js";

/**
 * This is a description of the MyClass constructor function.
 * @class
 * @classdesc This is a description of the MyClass class.
 */
export class SignupPage extends BasePage {
    /**
     *
     * @param {Object} parent parents object
     */
    constructor(parent) {
        super(parent);
    }

    render = () => {
        const template = new Popup().getHtmlString({
            popupBody:
                new AuthenticationForm().getHtmlString({
                    formType: 'signup',
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
                            type: 'submit'
                        }),
                    },
                }),
            background: new Blind().getHtmlString(),
            popupType: 'signup',
        });
        return new DOMParser().parseFromString(template, 'text/html')
            .getElementById('popup-wrapper');
    }

    isValid = (specificTypeToCheck = []) => {
        const form = document.getElementsByClassName('form-body')[0].getElementsByTagName('form')[0];
        return isValidForm(form, specificTypeToCheck);
    }
}
