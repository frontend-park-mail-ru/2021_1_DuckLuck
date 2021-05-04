import BasePresenter from './BasePresenter.js';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';
import {Bus} from '../utils/bus/bus';
import Router from '../utils/router/Router';
import {staticServerHost} from '../utils/urls/urls';

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
        Bus.globalBus.on(Events.ProductTransmitData, this.returnProductData);
        Bus.globalBus.on(Events.ProductItemAdded, this.setProductAdded);
        Bus.globalBus.on(Events.ProductItemNotAdded, this.setProductNotAdded);
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
            this.view.render();
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
     * @param {Set} ids
     */
    productCartGotIds = (ids) => {
        if (ids.has(this.model.item.id)) {
            this.view.setProductAdded();
        }
    }

    /**
     * @param {string} eventToEmit
     */
    returnProductData = (eventToEmit) => {
        const product = this.model.item;
        Bus.globalBus.emit(eventToEmit, {
            id: product.id,
            category: product.description.category,
            image: `${staticServerHost}${product.images[0]}`,
            title: product.name,
            href: `/item/${product.id}`,
        });
    }

    setProductAdded = () => {
        this.view.setProductAdded();
    }

    setProductNotAdded = () => {
        this.view.setProductNotAdded();
    }
}

export default ProductsPresenter;
