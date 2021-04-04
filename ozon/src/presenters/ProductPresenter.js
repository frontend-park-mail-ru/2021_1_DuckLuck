import BasePresenter from './BasePresenter.js';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';
import {Bus} from '../utils/bus/bus';

/**
 * @description Presenter for Products View and Model
 */
class ProductsPresenter extends BasePresenter {
    /**
     * @param {HTMLElement} application html of application
     * @param {Class} View Class of view object
     * @param {Class} Model Class of model object
     */
    constructor(application, View, Model) {
        super(application, View, Model);
        Bus.globalBus.on(Events.ProductChangeID, this.changeID);
        this.bus.on(Events.ProductLoad, this.loadProduct);
        this.bus.on(Events.ProductLoaded, this.productLoadedReaction);
    }

    /**
     *
     * @return {Object}
     */
    get item() {
        return this.model.item;
    }

    /**
     *
     * @param {Number} productID
     */
    loadProduct = (productID) => {
        this.model.loadProduct(productID);
    }

    /**
     *
     * @param {Number} id ID of a product
     */
    changeID = (id) => {
        this.view.ID = id;
    }

    /**
     *
     * @param {string}result
     */
    productLoadedReaction = (result) => {
        if (result === Responses.Success) {
            this.view.reRender();
            this.view.cache.hidden = false;
        } else {
            console.error('Cant load product');
        }
    }
}

export default ProductsPresenter;
