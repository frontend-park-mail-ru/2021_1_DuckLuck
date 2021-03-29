import {BaseView} from '../BaseView.js';
import {Input} from '../Common/Input/Input.js';
import profileTemplate from './ProfileView.hbs';
import {isValidForm} from '../../utils/validator.js';
import {AjaxModule} from '../../modules/Ajax/Ajax';
import {fileServerHost, serverApiPath, urls} from '../../utils/urls/urls';

/**
 * @class  ProfileView
 * @extends BaseView
 * @classdesc Class for showing profile of a user
 */
export class ProfileView extends BaseView {
    /**
     * @param {Object} parent parents object
     */
    constructor(parent) {
        if (ProfileView.__instance) {
            return ProfileView.__instance;
        }

        super(parent);
        ProfileView.__instance = this;
    }


    /**
     *
     * @return {void} rendered page
     */
    render = () => {
        if (this.cache !== '') {
            this._cache.hidden = false;
            return;
        }

        const htmlTemplate = profileTemplate({
            inputFields: [new Input({type: 'email', name: 'email', placeholder: 'Email address', isDisabled: true}),
                new Input({type: 'text', name: 'firstName', placeholder: 'First Name'}),
                new Input({type: 'text', name: 'lastName', placeholder: 'Last name'})],
            avatarUpload: new Input({type: 'file', name: 'avatar', placeholder: 'Upload new Avatar'}),
        });

        this.cache = new DOMParser().parseFromString(htmlTemplate, 'text/html').getElementById('profile-page');

        this.el.appendChild(this.cache);
    }

    addFormEventListener = () => {
        const form = document.getElementById('form');

        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
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
                    url: serverApiPath + urls.profileUrl,
                    body: {first_name: firstName, last_name: lastName},
                }).then(() => {
                    AjaxModule.getUsingFetch({
                        url: serverApiPath + urls.profileUrl,
                        body: null,
                    }).then((response) => {
                        return response.json();
                    }).then((response) => {
                        this.data = response;
                        if (response.avatar === '') {
                            this.data.avatar = fileServerHost + urls.defaultAvatar;
                        } else {
                            this.data.avatar = fileServerHost + response.avatar;
                        }
                        this.renderData();
                    });
                }).catch((err) => {
                    console.error(err);
                });
            }
        });


        const avatarInput = document.getElementsByClassName('profile-info__user-avatar-input')[0];
        avatarInput.addEventListener('change', (evt) => {
            evt.preventDefault();
            const avatarFile = avatarInput.files[0];
            if (this.isValid(['file']) && avatarFile !== undefined) {
                const formData = new FormData();
                formData.append('avatar', avatarFile);
                AjaxModule.putUsingFetch({
                    data: true,
                    url: serverApiPath + urls.profileAvatarUrl,
                    body: formData,
                }).then(() => {
                    AjaxModule.getUsingFetch({
                        url: serverApiPath + urls.profileAvatarUrl,
                        body: null,
                    }).then((response) => {
                        return response.json();
                    }).then((response) => {
                        this.data.avatar = fileServerHost + response.result;
                        this.renderAvatar();
                    });
                }).catch((err) => {
                    console.error(err);
                });
            }
        });
    }


    /**
     * @description Using for render data after AJAX methods.
     */
    renderData = () => {
        const {first_name = '',
            email = '',
            last_name = ''} = this.data;
        const firstNameInput = document.getElementsByName('firstName')[0];
        const lastNameInput = document.getElementsByName('lastName')[0];
        const emailInput = document.getElementsByName('email')[0];
        const nameLabel = document.getElementsByClassName('profile-info__user_name')[0];

        firstNameInput.value = first_name;
        emailInput.value = email;
        lastNameInput.value = last_name;
        nameLabel.innerHTML = first_name + ' ' + last_name;

        this.renderAvatar();
    }

    /**
     * Renders avatar of user if page is loading or he uploads new
     */
    renderAvatar = () => {
        const {avatar = ''} = this.data;
        const avatarImage = document.getElementsByClassName('profile-info__user-avatar')[0];
        avatarImage.src = avatar;
    }

    /**
     *
     * @param {string[]} specificTypeToCheck if this parameter is not empty, only inputs of a certain
     * type specified in this parameter will be checked
     * @return {boolean} true if form valid, false otherwise
     */
    isValid = (specificTypeToCheck = []) => {
        return isValidForm(document.getElementsByClassName('profile-credentials__form')[0], specificTypeToCheck);
    }
}
