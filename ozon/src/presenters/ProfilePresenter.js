import BasePresenter from './BasePresenter.js';
import {isValidForm} from '../modules/Valiadtor/validator';
import Router from '../utils/router/Router';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';
import {Bus} from '../utils/bus/bus';

/**
 * @description Presenter for Profile View and Model
 */
class ProfilePresenter extends BasePresenter {
    /**
     * @param {HTMLElement} application html of application
     * @param {Class} View Class of view object
     * @param {Class} Model Class of model object
     */
    constructor(application, View, Model) {
        super(application, View, Model);
        this.bus.on(Events.ProfileFLNameChange, this.sendFirstLastName);
        this.bus.on(Events.ProfileFLNameResult, this.firstLastNameSendProcessResult);
        this.bus.on(Events.ProfileAvatarChange, this.sendAvatar);
        this.bus.on(Events.ProfileAvatarResult, this.avatarSendProcessResult);
        this.bus.on(Events.ProfileEmailResult, this.emailSendProcessResult);
        this.bus.on(Events.ProfileCheckAuthResult, this.tryAuthProcessResult);
        this.bus.on(Events.ProfileAllGet, this.getAllData);
        this.bus.on(Events.ProfileAllResult, this.renderAllData);
        this.bus.on(Events.ProfileLogout, this.profileLogout);

        Bus.globalBus.on(Events.ProfileNewUserLoggedIn, this.removeData);
    }

    /**
     *
     * @param {Object} specificTypeToCheck
     * @return {boolean}
     */
    isFormValid = (specificTypeToCheck = []) => {
        return isValidForm(document.getElementById('form'), specificTypeToCheck);
    }

    /**
     * @description Send data to model
     */
    sendFirstLastName = () => {
        if (!this.isFormValid(['text'])) {
            this.bus.emit(Events.ProfileIncorrectFLName);
            return;
        }
        const firstName = document.getElementsByName('firstName')[0].value.trim();
        const lastName = document.getElementsByName('lastName')[0].value.trim();
        this.model.changeFirstLastName(firstName, lastName);
    }

    /**
     * @param {string} result
     * @description Processed a signal
     */
    firstLastNameSendProcessResult = (result) => {
        switch (result) {
        case Responses.Success: {
            this.view.changeFirstLastName(this.getFirstName(), this.getLastName());
            break;
        }
        case Responses.Offline: {
            Router.open('/offline');
            break;
        }
        default: {
            console.error(result);
            break;
        }
        }
    }

    /**
     *
     * @return {string}
     */
    getFirstName = () => {
        if (this.model.firstName !== undefined) {
            return this.model.firstName;
        }

        this.model.getFirstLastName();
        return '';
    }

    /**
     *
     * @return {string}
     */
    getLastName = () => {
        if (this.model.lastName !== undefined) {
            return this.model.lastName;
        }

        this.model.getFirstLastName();
        return '';
    }

    /**
     *
     * @return {string}
     */
    getEmail = () => {
        if (this.model.email !== undefined) {
            return this.model.email;
        }

        this.model.getEmail();
        return '';
    }

    /**
     *
     * @return {string}
     */
    getAvatar = () => {
        if (this.model.avatarURL !== undefined) {
            return this.model.avatarURL;
        }

        this.model.getAvatar();
        return '';
    }

    /**
     * @description get data view and send to model
     */
    sendAvatar = () => {
        const avatarInput = document.getElementById('avatar-input');
        this.model.changeAvatar(avatarInput.files[0]);
    }

    /**
     * @description logout from profile
     */
    profileLogout = () => {
        if (!navigator.onLine) {
            Router.open('/offline');
            return;
        }
        this.view.remove();
        Router.open('/', {replaceState: true});
        Bus.globalBus.emit(Events.HeaderChangeCartItems, 0);
        this.model.profileLogout();
    }

    /**
     *
     * @param {string} result
     */
    avatarSendProcessResult = (result) => {
        switch (result) {
        case Responses.Success: {
            this.view.changeAvatar(this.getAvatar());
            break;
        }
        case Responses.Offline: {
            Router.open('/offline');
            break;
        }
        default: {
            console.error(result);
            break;
        }
        }
    }

    /**
     *
     * @param {string} result
     */
    emailSendProcessResult = (result) => {
        switch (result) {
        case Responses.Success: {
            this.view.changeEmail(this.getEmail());

            break;
        }
        case Responses.Offline: {
            Router.open('/offline');
            break;
        }
        default: {
            console.error(result);
            break;
        }
        }
    }

    /**
     * @description attempts to authorize
     */
    tryAuth = () => {
        this.model.checkAuth();
    }

    /**
     *
     * @param {string} result
     */
    tryAuthProcessResult = (result) => {
        switch (result) {
        case Responses.Success: {
            this.view.render();
            this.view.cache.hidden = false;
            break;
        }
        case Responses.Offline: {
            Router.open('/offline');
            break;
        }
        default: {
            Router.open('/login', {replaceState: true});
            break;
        }
        }
    }

    /**
     * @description This function is used when user is re-loginned or creates a new account
     * Just clear cache and model
     */
    removeData = () => {
        this.model.clear();
        this.view.clearCache();
    }

    getAllData = () => {
        this.model.getProfileData();
    }

    /**
     *
     * @param {Responses} status
     */
    renderAllData = (status) => {
        if (status === Responses.Success) {
            this.view.renderData();
            return;
        }
        if (status === Responses.Offline) {
            Router.open('/offline', {replaceState: true});
            return;
        }
        console.error(status);
    }
}

export default ProfilePresenter;
