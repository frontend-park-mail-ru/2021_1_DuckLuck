import BasePresenter from './BasePresenter.js';
import Bus from '../bus.js';
import {isValidForm} from '../modules/Valiadtor/validator';
import Router from '../Router';

/**
 * @description Presenter for Profile View and Model
 */
class ProfilePresenter extends BasePresenter {
    /**
     *
     * @param {Object} view
     * @param {Object} model
     */
    constructor(view, model) {
        super(view, model);
    }

    /**
     *
     * @param {Object} specificTypeToCheck
     * @return {boolean}
     */
    isFormValid = (specificTypeToCheck = []) => {
        return isValidForm(document.getElementsByClassName('profile-credentials__form')[0], specificTypeToCheck);
    }

    /**
     * @description Send data to model
     */
    changeFirstLastName = () => {
        if (!this.isFormValid(['text'])) {
            Bus.emit('profile-incorrect-flname' );
            return;
        }
        const firstName = document.getElementsByName('firstName')[0].value.trim();
        const lastName = document.getElementsByName('lastName')[0].value.trim();
        this._model.changeFirstLastName(firstName, lastName);
    }

    /**
     * @param {string} result
     * @description Processed a signal
     */
    firstLastNameChangeProcessResult = (result) => {
        if (result === 'success') {
            this._view.changeFirstLastName(this.getFirstName(), this.getLastName());
        } else {
            console.error(result);
        }
    }

    /**
     *
     * @return {string}
     */
    getFirstName = () => {
        if (this._model.firstName === undefined) {
            this._model.getFirstLastName();
            return '';
        }

        return this._model.firstName;
    }

    /**
     *
     * @return {string}
     */
    getLastName = () => {
        if (this._model.lastName === undefined) {
            this._model.getFirstLastName();
            return '';
        }

        return this._model.lastName;
    }

    /**
     *
     * @return {string}
     */
    getEmail = () => {
        return this._model.email;
    }

    /**
     *
     * @return {string}
     */
    getAvatar = () => {
        if (this._model.avatarURL === undefined) {
            this._model.getAvatar();
            return '';
        }

        return this._model.avatarURL;
    }

    /**
     * @description get data view and send to model
     */
    changeAvatar = () => {
        if (!this.isFormValid(['file'])) {
            Bus.emit('profile-incorrect-avatar' );
            return;
        }

        const avatarInput = document.getElementsByClassName('profile-info__user-avatar-input')[0];
        this._model.changeAvatar(avatarInput.files[0]);
    }

    /**
     *
     * @param {string} result
     */
    avatarChangeProcessResult = (result) => {
        if (result === 'success') {
            this._view.changeAvatar(this.getAvatar());
        } else {
            console.error(result);
        }
    }

    /**
     *
     * @param {string} result
     */
    emailChangeProcessResult = (result) => {
        if (result === 'success') {
            this._view.changeEmail(this.getEmail());
        } else {
            console.error(result);
        }
    }

    /**
     * @description attempts to authorize
     */
    tryAuth = () => {
        this._model.checkAuth();
    }

    /**
     *
     * @param {string} result
     */
    tryAuthProcessResult = (result) => {
        if (result === 'success') {
            this._view.render();
            this._view._cache.hidden = false;
        } else {
            new Router().open('/login', true);
        }
    }
}

export default ProfilePresenter;
