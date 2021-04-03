import BasePresenter from './BasePresenter.js';
import Bus from '../utils/bus/bus.js';
import {isValidForm} from '../modules/Valiadtor/validator';
import Router from '../Router';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';

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
        Bus.on(Events.ProfileFLNameChange, this.sendFirstLastName);
        Bus.on(Events.ProfileFLNameResult, this.firstLastNameSendProcessResult);
        Bus.on(Events.ProfileAvatarChange, this.sendAvatar);
        Bus.on(Events.ProfileAvatarResult, this.avatarSendProcessResult);
        Bus.on(Events.ProfileEmailResult, this.emailSendProcessResult);
        Bus.on(Events.ProfileCheckAuthResult, this.tryAuthProcessResult);
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
    sendFirstLastName = () => {
        if (!this.isFormValid(['text'])) {
            Bus.emit(Events.ProfileIncorrectFLName, {});
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
    firstLastNameSendProcessResult = (result) => {
        if (result === Responses.Success) {
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
        if (this._model.email === undefined) {
            this._model.getEmail();
            return '';
        }

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
    sendAvatar = () => {
        if (!this.isFormValid(['file'])) {
            Bus.emit(Events.ProfileIncorrectAvatar, {});
            return;
        }

        const avatarInput = document.getElementsByClassName('profile-info__user-avatar-input')[0];
        this._model.changeAvatar(avatarInput.files[0]);
    }

    /**
     *
     * @param {string} result
     */
    avatarSendProcessResult = (result) => {
        if (result === Responses.Success) {
            this._view.changeAvatar(this.getAvatar());
        } else {
            console.error(result);
        }
    }

    /**
     *
     * @param {string} result
     */
    emailSendProcessResult = (result) => {
        if (result === Responses.Success) {
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
        if (result === Responses.Success) {
            this._view.render();
            (this._view.cache).hidden = false;
        } else {
            Router.open('/login', {replaceState: true});
        }
    }
}

export default ProfilePresenter;
