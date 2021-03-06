import {BasePage} from "../BasePage.js";
import {Input} from "../Common/Input/Input.js";
import {Button} from "../Common/Button/Button.js";
import {Link} from "../Common/Link/Link.js";
import LoginTemplate from "./LoginPage.hbs"

export class LoginPage extends BasePage {
    constructor(parent) {
        super(parent);
    }

    render = () => {
        const inputFields = [
            new Input({type: 'text', name: "email", placeholder: 'Email address'}),
            new Input({type: 'password', name: 'password', placeholder: 'Password'}),
        ]
        const forgotPassLink = new Link();
        const loginButton = new Button();

        const template = LoginTemplate({
            inputFields: inputFields,
            forgotPassLink: forgotPassLink,
            loginButton: loginButton
        });
        let html = new DOMParser().parseFromString(template, 'text/html').getElementById('login-block');

        const blind = document.createElement('div');
        blind.className = 'blind';
        blind.addEventListener('click', (evt) => {
            this._parent.removeChild(html);
            this._parent.removeChild(blind);
        });
        this._parent.appendChild(blind);

        return html;
    }
}