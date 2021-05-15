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
        this.bus.on(Events.ProductLoad, this.loadProduct);
        this.bus.on(Events.ProductLoaded, this.productLoadedReaction);
        this.bus.on(Events.RecommendationLoad, this.loadRecommendations);
        this.bus.on(Events.RecommendationLoaded, this.recommendationsLoadedReaction);
        Bus.globalBus.on(Events.ProductChangeID, this.changeID);
        Bus.globalBus.on(Events.CartLoadedProductID, this.productCartGotIds);
        Bus.globalBus.on(Events.RenderProductReviews, this.renderProductsReview);
        Bus.globalBus.on(Events.ProductTransmitData, this.returnProductData);
        Bus.globalBus.on(Events.ProductItemAdded, this.setProductAdded);
        Bus.globalBus.on(Events.ProductItemNotAdded, this.setProductNotAdded);
        Bus.globalBus.on(Events.ProductRenderReviewButton, this.addReviewButton);
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
        return this.model.sortKey;
    }

    /**
     * @return {string}
     */
    get sortDirection() {
        return this.model.sortDirection;
    }

    /**
     * @return {Array}
     */
    get recommendations() {
        return this.model.recommendations;
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
     * @param {Number} productID
     */
    loadRecommendations = (productID) => {
        this.model.loadRecommendations(productID);
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
        this.model.sortKey = sortKey;
    }

    /**
     * @param {String} sortDirection
     */
    set sortDirection(sortDirection) {
        this.model.sortDirection = sortDirection;
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
     *
     * @param {string}result
     */
    recommendationsLoadedReaction = (result) => {
        switch (result) {
        case Responses.Success: {
            this.view.renderRecommendations();
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

    addReviewButton = () => {
        this.view.addReviewButton();
    }
}

export default ProductsPresenter;
