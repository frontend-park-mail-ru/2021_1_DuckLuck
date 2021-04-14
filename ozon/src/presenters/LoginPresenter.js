import BasePresenter from './BasePresenter.js';
import Router from '../utils/router/Router';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';
import {Bus} from '../utils/bus/bus';

/**
 * @description Presenter for Login View and Model
 */
class LoginPresenter extends BasePresenter {
    /**
     * @param {HTMLElement} application html of application
     * @param {Class} View Class of view object
     * @param {Class} Model Class of model object
     */
    constructor(application, View, Model) {
        super(application, View, Model);
        this.bus.on(Events.LoginSendData, this.sendFormToModel);
        this.bus.on(Events.LoginEmitResult, this.processLoginResult);
    }

    /**
     * @description Gets data from View, than validates it and sends to Model.
     */
    sendFormToModel = () => {
        if (!this.isFormValid(['text'])) {
            this.bus.emit(Events.LoginIncorrectForm);
            return;
        }
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        this.model.loginUser({email, password});
    }

    /**
     *
     * @param {string} result
     * @description Processes result for login attempt
     */
    processLoginResult = (result) => {
        switch (result) {
        case Responses.Success: {
            this.view.remove();
            Bus.globalBus.emit(Events.ProfileNewUserLoggedIn);
            Router.open('/profile', {replaceState: true});
            break;
        }
        case Responses.Offline: {
            Router.open('/offline', {replaceState: true});
            break;
        }
        default: {
            console.error(result);
            break;
        }
        }
    }
}

export default LoginPresenter;
