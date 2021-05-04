import BasePresenter from './BasePresenter.js';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';
import {Bus} from '../utils/bus/bus';
import Router from '../utils/router/Router';

/**
 * @description Presenter for Products View and Model
 */
class ProductsPresenter extends BasePresenter {
    #sortKey;
    #sortDirection;

    /**
     * @param {HTMLElement} application html of application
     * @param {Class} View Class of view object
     * @param {Class} Model Class of model object
     */
    constructor(application, View, Model) {
        super(application, View, Model);
        this.bus.on(Events.ProductLoad, this.loadProduct);
        this.bus.on(Events.ProductLoaded, this.productLoadedReaction);
        Bus.globalBus.on(Events.ProductChangeID, this.changeID);
        Bus.globalBus.on(Events.CartLoadedProductID, this.productCartGotIds);
        Bus.globalBus.on(Events.RenderProductReviews, this.renderProductsReview);
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
     * @return {string}
     */
    get sortKey() {
        return this.#sortKey;
    }

    /**
     * @return {string}
     */
    get sortDirection() {
        return this.#sortDirection;
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
     * @param {String} sortKey
     */
    set sortKey(sortKey) {
        this.#sortKey = sortKey;
    }

    /**
     * @param {String} sortDirection
     */
    set sortDirection(sortDirection) {
        this.#sortDirection = sortDirection;
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
     * @param {Array} reviews
     * @param {Object} paginator
     */
    renderProductsReview = (reviews, paginator) => {
        this.view.renderProductsReview(reviews, paginator);
    }

    setProductAdded = () => {
        this.view.setProductAdded();
    }

    setProductNotAdded = () => {
        this.view.setProductNotAdded();
    }
}

export default ProductsPresenter;
