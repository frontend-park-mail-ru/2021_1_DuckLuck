import BasePresenter from './BasePresenter.js';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';
import {Bus} from '../utils/bus/bus';

/**
 * @description Presenter for Products View and Model
 */
class ProductsPresenter extends BasePresenter {
    /**
     *
     * @param {Object} view
     * @param {Object} model
     * @param {Object} bus bus of this mvp part
     */
    constructor(view, model, bus) {
        super(view, model, bus);
        Bus.globalBus.on(Events.ProductChangeID, this.changeID);
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
