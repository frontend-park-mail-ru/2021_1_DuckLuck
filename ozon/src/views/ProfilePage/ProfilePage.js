import {BasePage} from '../BasePage.js';
import {Input} from '../Common/Input/Input.js';
import {Link} from '../Common/Link.js';
import ProfileTemplate from './ProfilePage.hbs';
import {isValidForm} from '../../utils/validator.js';
import {AjaxModule} from "../../modules/Ajax/Ajax";
import {FileServerHost, ServerApiPath, Urls} from "../../utils/urls/urls";

export class ProfilePage extends BasePage {
    constructor(parent) {
        super(parent);
    }

    render = () => {
        const htmlTemplate = ProfileTemplate({
            inputFields: [new Input({type: 'email', name: 'email', placeholder: 'Email address', isDisabled: true}),
                new Input({type: 'text', name: 'firstName', placeholder: 'First Name'}),
                new Input({type: 'text', name: 'lastName', placeholder: 'Last name'})],
            backLink: new Link({href: '/home', textContent: '<', dataset: 'home'}),
            avatarUpload: new Input({type: 'file', name: 'avatar', placeholder: 'Upload new Avatar'}),
        });

        return new DOMParser().parseFromString(htmlTemplate, 'text/html')
            .getElementById('profile-page');
    }

    addFormEventListener = () => {
        const form = document.getElementById('form')
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            let avatarFile = document.getElementsByClassName('profile-info__user-avatar-input')[0];
            if (typeof avatarFile !== 'undefined') {
                avatarFile = avatarFile.files[0];
            }
            let firstName;
            let lastName;
            if (typeof document.getElementsByName('firstName')[0] !== 'undefined') {
                firstName = document.getElementsByName('firstName')[0].value.trim();
            }
            if (typeof document.getElementsByName('lastName')[0] !== 'undefined') {
                lastName = document.getElementsByName('lastName')[0].value.trim();
            }

            if (this.isValid(['text'])) {
                AjaxModule.putUsingFetch({
                    url: ServerApiPath + Urls.profileUrl,
                    body: {first_name: firstName, last_name: lastName},
                }).then(() => {
                    AjaxModule.getUsingFetch({
                        url: ServerApiPath + Urls.profileUrl,
                        body: null,
                    }).then((response) => {
                        return response.json();
                    }).then((response) => {
                        this.data = response;
                        if (response.avatar === '') {
                            this.data.avatar = FileServerHost + Urls.defaultAvatar;
                        } else {
                            this.data.avatar = FileServerHost + response.avatar;
                        }
                        this.renderData();
                    });
                }).catch((err) => {
                    console.error(err);
                });
            }

            if (this.isValid(['file']) && typeof avatarFile !== 'undefined') {
                const formData = new FormData();
                formData.append('avatar', avatarFile);
                AjaxModule.putUsingFetch({
                    data: true,
                    url: ServerApiPath + Urls.profileAvatarUrl,
                    body: formData,
                }).then(() => {
                    AjaxModule.getUsingFetch({
                        url: ServerApiPath + Urls.profileAvatarUrl,
                        body: null,
                    }).then((response) => {
                        return response.json();
                    }).then((response) => {
                        this.data.avatar = FileServerHost + response.result;
                        this.renderAvatar();
                    });
                }).catch((err) => {
                    console.error(err);
                });
            }
        });
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
        emailInput.value = '';
        emailInput.placeholder = email;
        lastNameInput.value = '';
        lastNameInput.placeholder = last_name;
        nameLabel.innerHTML = first_name + ' ' + last_name;

        this.renderAvatar();
    }

    renderAvatar = () => {
        const {avatar = ''} = this.data;
        const avatarImage = document.getElementsByClassName('profile-info__user-avatar')[0];
        avatarImage.src = avatar;
    }

    isValid = (specificTypeToCheck = []) => {
        return isValidForm(document.getElementsByClassName('profile-credentials__form')[0], specificTypeToCheck);
    }
}
