import {isValidForm} from '../modules/Valiadtor/validator.js';

/**
 * @description Base Presenter class
 */
class BasePresenter {
    #view
    #model
    #bus

    /**
     *
     * @param {Object} view
     * @param {Object} model
     * @param {Object} bus bus of this mvp part
     */
    constructor(view, model, bus) {
        this.#view = view;
        this.#model = model;
        this.#bus = bus;
    }

    /**
     * @return {Object} View, which linked with this presenter part
     */
    get view() {
        return this.#view;
    }

    /**
     * @return {Object} Model, which linked with this presenter part
     */
    get model() {
        return this.#model;
    }

    /**
     * @return {Object} Bus, which connects all parts of this mvp part
     */
    get bus() {
        return this.#bus;
    }


    /**
     *
     * @param {Object }specificTypeToCheck
     * @return {boolean}
     */
    isFormValid(specificTypeToCheck) {
        const form = this.#view.cache.getElementsByClassName('form-body')[0].getElementsByTagName('form')[0];
        return isValidForm(form, specificTypeToCheck);
    }
}

export default BasePresenter;
