import {fields} from '../utils/validationFields/validationFields';

/**
 * @class BaseView
 * @classdesc Base class for all other views
 */
export class BaseView {
    #parent
    #cache
    #presenter
    #bus
    #ids

    /**
     *
     * @param {Object} parent  Parent HTML element
     * @param {Object} presenter Presenter of this view
     * @param {Object} bus bus of this mvp part
     */
    constructor(parent, presenter, bus) {
        this.#parent = parent;
        this.#parent.dataset.view = this.constructor.name;
        this.#parent.hidden = false;
        this.#cache = '';
        this.#bus = bus;
        this.#ids = {};
        this.#presenter = presenter;
    }

    /**
     *
     * @return {boolean} is element Active?
     */
    get isActive() {
        return !this.parent.hidden;
    }

    /**
     *
     * @return {HTMLElement} Cache of View
     */
    get cache() {
        return this.#cache;
    }

    /**
     *
     * @return {Object} Presenter of View
     */
    get presenter() {
        return this.#presenter;
    }

    /**
     *
     * @return {HTMLElement} Parent of this View
     */
    get parent() {
        return this.#parent;
    }

    /**
     *
     * @return {Object} Bus of this mvp part
     */
    get bus() {
        return this.#bus;
    }

    /**
     *
     * @return {number} id,page number,item id, etc. for this view (use if needs)
     */
    get IDs() {
        return this.#ids;
    }

    /**
     *
     * @param {HTMLElement} cache Cache of View
     */
    set cache(cache) {
        this.#cache = cache;
    }

    /**
     *
     * @param {Object} ids new ids
     */
    set IDs(ids) {
        this.#ids = ids;
    }


    /**
     * @description Hides an element in HTML
     */
    hide = () => {
        this.#cache.hidden = true;
    }

    /**
     * @description Removes Element from HTML
     */
    remove = () => {
        this.#parent.removeChild(this.cache);
    }

    /**
     * @description Show element in HTML
     */
    show = () => {
        this.render();
        this.#cache.hidden = false;
    }

    /**
     * @description clears cache of View
     */
    clearCache = () => {
        this.#cache = '';
    }

    /**
     * @param {HTMLElement} input
     * @param {string} placeholder
     */
    static setInvalidInputPlaceholder(input, placeholder) {
        input.value = '';
        input.placeholder = placeholder;
        input.style['border-color'] = '#ff726f';
    }

    /**
     * @param {array} invalidFields
     */
    invalidForm = (invalidFields) => {
        for (const input of this.cache.getElementsByTagName('input')) {
            switch (input.name) {
            case 'firstName':
                if (invalidFields.includes(fields.firstName)) {
                    BaseView.setInvalidInputPlaceholder(input, 'Некорр. новое имя');
                }
                break;
            case 'lastName':
                if (invalidFields.includes(fields.lastName)) {
                    BaseView.setInvalidInputPlaceholder(input, 'Некорр. новая фамилия');
                }
                break;
            case 'email':
                if (invalidFields.includes(fields.email)) {
                    BaseView.setInvalidInputPlaceholder(input, 'Некорректная электронная почта');
                }
                break;
            case 'password':
                if (invalidFields.includes(fields.password)) {
                    BaseView.setInvalidInputPlaceholder(input, 'Некорректный пароль');
                }
                break;
            case 'repeat_password':
                if (invalidFields.includes(fields.repeatPassword)) {
                    BaseView.setInvalidInputPlaceholder(input, 'Пароли не совпадают');
                }
                break;
            }
        }
    }

    /**
     * @description Drop cache and render
     */
    reRender = () => {
        this.clearCache();
        this.render();
    }

    /**
     * Render from template
     */
    render = () => {

    }
}
