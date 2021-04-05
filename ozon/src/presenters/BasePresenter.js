import {isValidForm} from '../modules/Valiadtor/validator.js';
import {Bus} from '../utils/bus/bus';

/**
 * @description Base Presenter class
 */
class BasePresenter {
    #view
    #model
    #bus

    /**
     *
     * @param {HTMLElement} application html of application
     * @param {Class} View Class of view object
     * @param {Class} Model Class of model object
     */
    constructor(application, View, Model) {
        this.#bus = new Bus();
        this.#view = new View(application, this, this.#bus);
        this.#model = new Model(this.#bus);
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
