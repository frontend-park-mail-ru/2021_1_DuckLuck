import {BasePage} from "../BasePage.js";
import {Input} from "../Common/Input.js";
import {Link} from "../Common/Link.js";

import SignupTemplate from "./SignupPage.hbs"
import {Button} from "../Common/Button/Button";
import LoginTemplate from "../LoginPage/LoginPage.hbs";

export class SignupPage extends BasePage {
    constructor(parent) {
        super(parent);
    }

    render = () => {
        const inputFields = [
            new Input({type: 'text', name: "first-name", placeholder: 'First name'}),
            new Input({type: 'text', name: "last-name", placeholder: 'Last name'}),
            new Input({type: 'text', name: "email", placeholder: 'Email address'}),
            new Input({type: 'password', name: 'password', placeholder: 'Password'}),
        ]
        const loginButton = new Button();

        const template = SignupTemplate({
            inputFields: inputFields,
            loginButton: loginButton
        });
        return new DOMParser().parseFromString(template, 'text/html').getElementById('signup-block-wrapper');
    }
}