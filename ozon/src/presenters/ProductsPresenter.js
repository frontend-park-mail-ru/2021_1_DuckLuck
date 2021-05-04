import BasePresenter from './BasePresenter.js';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';
import Router from '../utils/router/Router';
import {Bus} from '../utils/bus/bus';

/**
 * @description Presenter for Product View and Model
 */
class ProductsPresenter extends BasePresenter {
    /**
     * @param {HTMLElement} application html of application
     * @param {Class} View Class of view object
     * @param {Class} Model Class of model object
     */
    constructor(application, View, Model) {
        super(application, View, Model);
        this.bus.on(Events.ProductsLoad, this.loadProducts);
        this.bus.on(Events.ProductsLoadSearch, this.loadSearchProducts);
        this.bus.on(Events.ProductsLoaded, this.productLoadedReaction);
        Bus.globalBus.on(Events.ProductsChangeCategory, this.changeCategory);
        Bus.globalBus.on(Events.ProductsItemAdded, this.setProductAdded);
        Bus.globalBus.on(Events.ProductsItemNotAdded, this.setProductNotAdded);
        Bus.globalBus.on(Events.HeaderChangeCategoryID, this.changeCategoryId);
        Bus.globalBus.on(Events.CartLoadedProductsID, this.productsCartGotIds);
    }

    /**
     *
     * @return {Object}
     */
    get products() {
        return this.model.products;
    }

    /**
     *
     * @return {{pagesCount: *, currentPage: Number}|*}
     */
    get paginationInfo() {
        return this.model.paginationInfo;
    }


    /**
     * @return {Number}
     */
    get categoryId() {
        return this.model.categoryId;
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
     *
     * @param {Number} id
     */
    changeCategoryId = (id) => {
        this.model.categoryId = id;
    }

    /**
     *
     * @param {String} sortKey
     */
    changeSortKey = (sortKey) => {
        this.model.sortKey = sortKey;
    }

    /**
     *
     * @param {String} sortDirection
     */
    changeSortDirection = (sortDirection) => {
        this.model.sortDirection = sortDirection;
    }

    /**
     * @param {Number} category
     * @param {Number} page
     * @param {String} sortKey
     * @param {String} sortDirection
     */
    loadProducts = (category, page, sortKey, sortDirection) => {
        this.model.loadProducts(category, page, sortKey, sortDirection);
    }

    /**
     * @param {string} searchData
     * @param {number} page
     * @param {String} sortKey
     * @param {String} sortDirection
     */
    loadSearchProducts = (searchData, page, sortKey, sortDirection) => {
        this.model.loadProductsSearch(searchData, page, sortKey, sortDirection);
    }

    /**
     *
     * @param {string} result
     */
    productLoadedReaction = (result) => {
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

    /**
     *
     * @param {Set} ids
     */
    productsCartGotIds = (ids) => {
        if (ids.size) {
            this.view.setAddedProducts(ids);
        }
    }

    /**
     * @param {number} newCategory
     */
    changeCategory = (newCategory) => {
        this.view.ID = newCategory;
        this.view.subID = 1; // first page of pagination!
    }

    /**
     * @param {number} itemID
     */
    setProductAdded = (itemID) => {
        this.view.setProductAdded(itemID);
    }

    /**
     * @param {number} itemID
     */
    setProductNotAdded = (itemID) => {
        this.view.setProductNotAdded(itemID);
    }
}

export default ProductsPresenter;
