import BasePresenter from './BasePresenter.js';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';
import {Bus} from "../utils/bus/bus";

/**
 * @description Presenter for Header View and Model
 */
class HeaderPresenter extends BasePresenter {
    /**
     * @param {HTMLElement} application html of application
     * @param {Class} View Class of view object
     * @param {Class} Model Class of model object
     */
    constructor(application, View, Model) {
        super(application, View, Model);
        Bus.globalBus.on(Events.HeaderChangeCatalogID, this.changeCatalogID);
        this.bus.on(Events.HeaderLoad, this.loadHeader);
        this.bus.on(Events.HeaderLoaded, this.headerLoadedReaction);
    }

    /**
     *
     * @return {Object}
     */
    get categories() {
        return this.model.categories;
    }

    /**
     *
     * @return {Number}
     */
    get currentCategoryIndex() {
        return this.model.currentCategoryIndex;
    }

    /**
     *
     *
     */
    set currentCategoryIndex(index) {
        this.model.currentCategoryIndex = index;
    }

    /**
     *
     * @param {Number} id ID of a category
     */
    changeCatalogID = (id) => {
        this.view.ID = id;
    }

    /**
     *
     */
    loadHeader = () => {
        this.model.loadHeader();
    }

    /**
     *
     * @param {string}result
     */
    headerLoadedReaction = (result) => {
        if (result === Responses.Success) {
            this.view.reRender();
            this.view.cache.hidden = false;
        } else {
            console.error('Cant load header');
        }
    }
}

export default HeaderPresenter;
