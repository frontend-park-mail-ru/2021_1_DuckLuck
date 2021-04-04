import {BaseView} from '../BaseView.js';
import {Input} from '../Common/Input/Input.js';
import profileTemplate from './ProfileView.hbs';
import Events from '../../utils/bus/events';

/**
 * @class  ProfileView
 * @extends BaseView
 * @classdesc Class for showing profile of a user
 */
export class ProfileView extends BaseView {
    /**
     * @param {Object} parent parents object
     * @param {Object} bus bus of this mvp part
     */
    constructor(parent, bus) {
        super(parent, bus);
    }


    /**
     * @description redef of show method
     */
    show = () => {
        this.presenter.tryAuth();
    }

    /**
     *
     * @return {void} rendered page
     */
    render = () => {
        this.parent.innerHTML = '';
        if (this.cache !== '') {
            this.parent.appendChild(this.cache);
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
        this.parent.appendChild(this.cache);
        const form = document.getElementById('form');

        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.bus.emit(Events.ProfileFLNameChange, {});
        });

        const avatarInput = document.getElementsByClassName('profile-info__user-avatar-input')[0];
        avatarInput.addEventListener('change', (evt) => {
            evt.preventDefault();
            this.bus.emit(Events.ProfileAvatarChange, {});
        });

        this.renderData();
    }


    /**
     *
     * @param {string} firstName
     * @param {string} lastName
     */
    changeFirstLastName = (firstName, lastName) => {
        document.getElementsByName('firstName')[0].value = firstName;
        document.getElementsByName('lastName')[0].value = lastName;
        document.getElementsByClassName('profile-info__user_name')[0].innerHTML = firstName + ' ' + lastName;
    }

    /**
     *
     * @param {string} avatarURL
     */
    changeAvatar = (avatarURL) => {
        document.getElementsByClassName('profile-info__user-avatar')[0].src = avatarURL;
    }

    /**
     *
     * @param {string} email
     */
    changeEmail = (email) => {
        document.getElementsByName('email')[0].value = email;
    }

    /**
     * @description Using for render data after AJAX methods.
     */
    renderData = () => {
        this.changeFirstLastName(this.presenter.getFirstName(), this.presenter.getLastName());
        this.changeEmail(this.presenter.getEmail());
        this.changeAvatar(this.presenter.getAvatar());
    }
}
