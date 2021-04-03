import BasePresenter from './BasePresenter.js';
import Router from '../utils/router/Router';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';

/**
 * @description Presenter for Login View and Model
 */
class LoginPresenter extends BasePresenter {
    /**
     *
     * @param {Object} view
     * @param {Object} model
     * @param {Object} bus bus of this mvp part
     */
    constructor(view, model, bus) {
        super(view, model, bus);
        this.bus.on(Events.LoginSendData, this.sendFormToModel);
        this.bus.on(Events.LoginEmitResult, this.processLoginResult);
    }

    /**
     * @description Gets data from View, than validates it and sends to Model.
     */
    sendFormToModel = () => {
        if (!this.isFormValid(['text'])) {
            this.bus.emit(Events.LoginIncorrectForm, {});
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
        if (result === Responses.Success) {
            this.view.remove();
            Router.open('/profile', {replaceState: true});
        } else {
            console.error(result);
        }
    }
}

export default LoginPresenter;
