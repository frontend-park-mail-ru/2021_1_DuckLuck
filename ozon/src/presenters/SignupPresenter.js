import BasePresenter from './BasePresenter.js';
import Bus from '../utils/bus/bus.js';
import Router from '../Router';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';

/**
 * @description Presenter for Signup View and Model
 */
class SignupPresenter extends BasePresenter {
    /**
     *
     * @param {Object} view
     * @param {Object} model
     */
    constructor(view, model) {
        super(view, model);
        Bus.on(Events.SignupSendData, this.sendFormToModel);
        Bus.on(Events.SignupEmitResult, this.processSignupResult);
    }

    /**
     * @description get data from view and send to model
     */
    sendFormToModel = () => {
        if (!this.isFormValid(['text'])) {
            Bus.emit(Events.SignupIncorrectForm, {});
            return;
        }
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        this._model.signupUser({email, password});
    }

    /**
     *
     * @param {string} result
     */
    processSignupResult = (result) => {
        if (result === Responses.Success) {
            this._view.remove();
            Router.open('/profile', {replaceState: true});
        } else {
            console.error(result);
        }
    }
}

export default SignupPresenter;
