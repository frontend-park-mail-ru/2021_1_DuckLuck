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
        const blind = document.createElement('div');
        blind.className = 'blind';
        this._parent.appendChild(blind);

        const div = document.createElement('div');
        div.className = 'login-block';
        const inputFields = [
            new Input({type: 'text', name: "email", placeholder: 'Email address'}),
            new Input({type: 'password', name: 'password', placeholder: 'Password'}),
        ]
        const forgotPassLink = new Link();
        const loginButton = new Button();

        div.innerHTML = LoginTemplate({
            inputFields: inputFields,
            forgotPassLink: forgotPassLink,
            loginButton: loginButton
        });

        this._parent.appendChild(div);

        return div;
    }
}