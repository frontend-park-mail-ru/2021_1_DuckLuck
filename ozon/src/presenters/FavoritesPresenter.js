import BasePresenter from './BasePresenter.js';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';
import {Bus} from '../utils/bus/bus';
import Router from '../utils/router/Router';

/**
 * @description Presenter for Favorites View and Model
 */
class FavoritesPresenter extends BasePresenter {
    /**
     * @param {HTMLElement} application html of application
     * @param {Class} View Class of view object
     * @param {Class} Model Class of model object
     */
    constructor(application, View, Model) {
        super(application, View, Model);
        this.bus.on(Events.FavoritesLoadProducts, this.loadProducts);
        this.bus.on(Events.FavoritesProductsLoaded, this.productsLoadedReaction);
        this.bus.on(Events.FavoritesProductAdded, this.productAddedReaction);
        this.bus.on(Events.FavoritesProductRemoved, this.productRemovedReaction);

        Bus.globalBus.on(Events.FavoritesGetProductsID, this.getFavoritesIDs);
        Bus.globalBus.on(Events.FavoritesGetProductID, this.getFavoritesID);
        Bus.globalBus.on(Events.FavoritesAddProduct, this.addProduct);
        Bus.globalBus.on(Events.FavoritesRemoveProduct, this.removeProduct);
        Bus.globalBus.on(Events.FavoritesLoadProductsAmount, this.loadProductsAmount);
        Bus.globalBus.on(Events.FavoritesLoadedProductsAmountReaction, this.loadProductsAmountReaction);
    }

    /**
     * @return {String}
     */
    get sortKey() {
        return this.model.sortKey;
    }

    /**
     * @return {String}
     */
    get sortDirection() {
        return this.model.sortDirection;
    }

    /**
     * @return {Object}
     */
    get products() {
        return this.model.products;
    }

    /**
     * @return {{pagesCount: *, currentPage: Number}|*}
     */
    get paginationInfo() {
        return this.model.paginationInfo;
    }

    /**
     * @param {String} sortKey
     */
    changeSortKey = (sortKey) => {
        this.model.sortKey = sortKey;
    }

    /**
     * @param {String} sortDirection
     */
    changeSortDirection = (sortDirection) => {
        this.model.sortDirection = sortDirection;
    }

    /**
     * @param {number} page
     */
    loadProducts = (page) => {
        this.model.loadProducts(page);
    }

    /**
     * @param {number} id
     */
    addProduct = (id) => {
        this.model.addProduct(+id);
    }

    /**
     * @param {string} result
     */
    productsLoadedReaction = (result) => {
        switch (result) {
        case Responses.Success: {
            this.view.render();
            this.view.cache.hidden = false;
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

    getFavoritesIDs = () => {
        this.model.getIDs(Events.FavoritesLoadedProductsIDs);
    }

    getFavoritesID = () => {
        this.model.getIDs(Events.FavoritesLoadedProductID);
    }

    /**
     * @param {number} id
     */
    removeProduct = (id) => {
        this.model.removeFavorites(+id);
    }

    /**
     * @param {string} result
     */
    productAddedReaction = (result) => {
        switch (result) {
        case Responses.Success: {
            break;
        }
        case Responses.Offline: {
            Router.open('/offline');
            break;
        }
        case Responses.Unauthorized: {
            Router.open('/login');
            break;
        }
        default: {
            console.error(result);
            break;
        }
        }
    }

    loadProductsAmount = () => {
        this.model.loadProductsAmount();
    }

    /**
     * @param {number} count
     */
    loadProductsAmountReaction = (count) => {
        Bus.globalBus.emit(Events.HeaderSetFavoriteItems, count);
    }

    /**
     * @param {string} result
     */
    productRemovedReaction = (result) => {
        switch (result) {
        case Responses.Success: {
            break;
        }
        case Responses.Offline: {
            Router.open('/offline');
            break;
        }
        case Responses.Unauthorized: {
            Router.open('/login');
            break;
        }
        default: {
            console.error(result);
            break;
        }
        }
    }
}

export default FavoritesPresenter;
