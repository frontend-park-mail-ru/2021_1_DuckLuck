import BasePresenter from './BasePresenter.js';
import Bus from '../bus.js';
import Router from '../Router';

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
    }

    /**
     * @description Gets data from View, than validates it and sends to Model.
     */
    sendFormToModel = () => {
        if (!this.isFormValid(['text'])) {
            Bus.emit('login-incorrect-form' );
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
        if (result === 'success') {
            this._view.remove();
            new Router().open('/profile', true);
        } else {
            console.error(result);
        }
    }
}

export default LoginPresenter;
