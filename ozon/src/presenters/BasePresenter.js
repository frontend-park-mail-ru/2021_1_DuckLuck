import {isValidForm} from '../modules/Valiadtor/validator.js';

/**
 * @description Base Presenter class
 */
class BasePresenter {
    /**
     *
     * @param {Object} view
     * @param {Object} model
     */
    constructor(view, model) {
        this._view = view;
        this._model = model;
    }

    /**
     *
     * @param {Object }specificTypeToCheck
     * @return {boolean}
     */
    isFormValid(specificTypeToCheck) {
        const form = this._view.cache.getElementsByClassName('form-body')[0].getElementsByTagName('form')[0];
        return isValidForm(form, specificTypeToCheck);
    }
}

export default BasePresenter;
