import {BasePage} from "../BasePage.js";
import {Input} from "../Common/Input/Input.js";
import {Button} from "../Common/Button/Button.js";
import {Link} from "../Common/Link.js";
import {TextArea} from "../Common/TextArea/TextArea.js";
import ProfileTemplate from "./ProfilePage.hbs"
import SignupTemplate from "../SignupPage/SignupPage.hbs";

export class ProfilePage extends BasePage {
    constructor(parent) {
        super(parent);
    }

    render = () => {
        const page = document.createElement('div');

        const inputFields = [
            new Input({type: 'email', name: 'email', placeholder: 'Email address', isDisabled: true}),
            new Input({type: 'text', name: 'firstName', placeholder: 'First Name'}),
            new Input({type: 'text', name: 'lastName', placeholder: 'Last name'}),
        ];

        const avatarUpload = new Input({type: 'file', name: 'avatar', placeholder: 'Uplad new Avatar'})


        const backLink = new Link({href: '/home', textContent: '<', dataset: 'home'});
        page.innerHTML = ProfileTemplate({
            inputFields: inputFields,
            backLink: backLink,
            avatarUpload: avatarUpload
        });
        this._parent.appendChild(page);

        return page;
    }


    renderData = () => {
        const {firstName = '',
               email = '',
               lastName = '',
               mobilePhone = ''} = this.data;
        const firstNameInput = document.getElementsByName('firstName')[0];
        firstNameInput.placeholder = firstName;
        const emailInput = document.getElementsByName('email')[0];
        emailInput.placeholder = email;
        const lastNameInput = document.getElementsByName('lastName')[0];
        lastNameInput.placeholder = lastName;
    }
}