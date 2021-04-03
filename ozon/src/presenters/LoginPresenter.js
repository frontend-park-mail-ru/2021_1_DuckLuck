import BasePresenter from './BasePresenter.js';
import Bus from '../utils/bus/bus.js';
import Router from '../Router';
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
     */
    constructor(view, model) {
        super(view, model);
        Bus.on(Events.LoginSendData, this.sendFormToModel);
        Bus.on(Events.LoginEmitResult, this.processLoginResult);
    }

    /**
     * @description Gets data from View, than validates it and sends to Model.
     */
    sendFormToModel = () => {
        if (!this.isFormValid(['text'])) {
            Bus.emit(Events.LoginIncorrectForm, {});
            return;
        }
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        this._model.loginUser({email, password});
    }

    /**
     *
     * @param {string} result
     * @description Processes result for login attempt
     */
    processLoginResult = (result) => {
        if (result === Responses.Success) {
            this._view.remove();
            Router.open('/profile', {replaceState: true});
        } else {
            console.error(result);
        }
    }
}

export default LoginPresenter;
