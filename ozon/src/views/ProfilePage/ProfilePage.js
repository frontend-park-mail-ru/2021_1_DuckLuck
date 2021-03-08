import {BasePage} from "../BasePage.js";
import {Input} from "../Common/Input/Input.js";
import {Link} from "../Common/Link.js";
import ProfileTemplate from "./ProfilePage.hbs"
import {isValidForm} from "../../utils/validator.js"

export class ProfilePage extends BasePage {
    constructor(parent) {
        super(parent);
    }

    render = () => {
        const htmlTemplate = ProfileTemplate({
                    inputFields: [new Input({type: 'email', name: 'email', placeholder: 'Email address', isDisabled: true}),
                                  new Input({type: 'text', name: 'firstName', placeholder: 'First Name'}),
                                  new Input({type: 'text', name: 'lastName', placeholder: 'Last name'}),],
                    backLink: new Link({href: '/home', textContent: '<', dataset: 'home'}),
                    avatarUpload: new Input({type: 'file', name: 'avatar', placeholder: 'Upload new Avatar'}),
        });
        return new DOMParser().parseFromString(htmlTemplate, 'text/html')
            .getElementById('profile-page');
    }


    renderData = () => {
        const {first_name = '',
               email = '',
               last_name = '',
               avatar = ''} = this.data;
        const firstNameInput = document.getElementsByName('firstName')[0];
        const lastNameInput = document.getElementsByName('lastName')[0];
        const emailInput = document.getElementsByName('email')[0];
        const nameLabel = document.getElementsByClassName('profile-info__user_name')[0];

        firstNameInput.value = '';
        firstNameInput.placeholder = first_name;
        emailInput.value = ''
        emailInput.placeholder = email;
        lastNameInput.value = '';
        lastNameInput.placeholder = last_name;
        nameLabel.innerHTML = first_name + ' ' + last_name;

        this.renderAvatar()
    }

    renderAvatar = () => {
        const { avatar = ''} = this.data;
        const avatarImage = document.getElementsByClassName('profile-info__user-avatar')[0];
        avatarImage.src = avatar;
    }

    isValid = (specificTypeToCheck = []) => {
        return isValidForm(document.getElementsByClassName('profile-credentials__form')[0], specificTypeToCheck);
    }
}
