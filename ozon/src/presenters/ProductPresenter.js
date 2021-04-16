import BasePresenter from './BasePresenter.js';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';
import {Bus} from '../utils/bus/bus';
import Router from '../utils/router/Router';

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
        Bus.globalBus.on(Events.CartLoadedProductID, this.productCartGotIds);
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
        switch (result) {
        case Responses.Success: {
            Bus.globalBus.emit(Events.CartGetProductID);
            break;
        }
        case Responses.Offline: {
            Router.open('/offline', {replaceState: true});
            break;
        }
        default: {
            console.error(result);
            break;
        }
        }
    }

    /**
     * @param {number[]}ids
     */
    productCartGotIds = (ids) => {
        this.model.item['inCart'] = !!ids.includes(this.model.item.id);
        this.view.render();
        this.view.cache.hidden = false;
    }
}

export default ProductsPresenter;
