import {BaseView} from '../BaseView.js';
import {Input} from '../Common/Input/Input.js';
import profileTemplate from './ProfileView.hbs';
import Bus from '../../bus.js';

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
     * @description redef of show method
     */
    show() {
        this._presenter.tryAuth();
    }

    /**
     *
     * @return {void} rendered page
     */
    render = () => {
        this.el.innerHTML = '';
        if (this.cache !== '') {
            this.el.appendChild(this.cache);
            this.renderData();
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
        const form = document.getElementById('form');

        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            Bus.emit('profile-flname-change' );
        });

        const avatarInput = document.getElementsByClassName('profile-info__user-avatar-input')[0];
        avatarInput.addEventListener('change', (evt) => {
            evt.preventDefault();
            Bus.emit('profile-avatar-change' );
        });

        this.renderData();
    }


    /**
     *
     * @param {string} firstName
     * @param {string} lastName
     */
    changeFirstLastName = (firstName, lastName) => {
        const firstNameInput = document.getElementsByName('firstName')[0];
        const lastNameInput = document.getElementsByName('lastName')[0];
        const nameLabel = document.getElementsByClassName('profile-info__user_name')[0];

        firstNameInput.value = firstName;
        lastNameInput.value = lastName;
        nameLabel.innerHTML = firstName + ' ' + lastName;
    }

    /**
     *
     * @param {string} avatarURL
     */
    changeAvatar = (avatarURL) => {
        const avatarImage = document.getElementsByClassName('profile-info__user-avatar')[0];
        avatarImage.src = avatarURL;
    }

    /**
     *
     * @param {string} email
     */
    changeEmail = (email) => {
        const emailInput = document.getElementsByName('email')[0];
        emailInput.value = email;
    }

    /**
     * @description Using for render data after AJAX methods.
     */
    renderData = () => {
        const firstNameInput = document.getElementsByName('firstName')[0];
        const lastNameInput = document.getElementsByName('lastName')[0];
        const emailInput = document.getElementsByName('email')[0];
        const nameLabel = document.getElementsByClassName('profile-info__user_name')[0];

        const firstName = this._presenter.getFirstName();
        const lastName = this._presenter.getLastName();
        firstNameInput.value = firstName;
        emailInput.value = this._presenter.getEmail();
        lastNameInput.value = lastName;
        nameLabel.innerHTML = firstName + ' ' + lastName;

        this.renderAvatar();
    }

    /**
     * Renders avatar of user if page is loading or he uploads new
     */
    renderAvatar = () => {
        const avatar = this._presenter.getAvatar();
        const avatarImage = document.getElementsByClassName('profile-info__user-avatar')[0];
        avatarImage.src = avatar;
    }
}
