import BasePresenter from './BasePresenter.js';
import Bus from '../bus.js';
import Router from '../Router';

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
    }

    /**
     * @description get data from view and send to model
     */
    sendFormToModel = () => {
        if (!this.isFormValid(['text'])) {
            Bus.emit('signup-incorrect-form' );
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
        if (result === 'success') {
            this._view.remove();
            new Router().open('/profile', true);
        } else {
            console.error(result);
        }
    }
}

export default SignupPresenter;
