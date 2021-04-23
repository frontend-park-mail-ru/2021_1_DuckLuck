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
        this.bus.on(Events.ProductsLoaded, this.productLoadedReaction);
        Bus.globalBus.on(Events.ProductsChangeCategory, this.changeCategory);
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
     *
     * @param {Number} id
     */
    changeCategoryId = (id) => {
        this.model.categoryId = id;
    }

    /**
     * @param {Number} category
     * @param {Number} page
     */
    loadProducts = (category, page) => {
        this.model.loadProducts(category, page);
    }

    /**
     *
     * @param {string} result
     */
    productLoadedReaction = (result) => {
        switch (result) {
        case Responses.Success: {
            Bus.globalBus.emit(Events.CartGetProductsID);
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
     * @param {number[]}ids
     */
    productsCartGotIds = (ids) => {
        this.model.products = this.model.products.map((elem) => {
            elem['inCart'] = !!ids.includes(elem.id);
            return elem;
        });
        this.view.render();
        this.view.cache.hidden = false;
    }

    /**
     * @param {number} newCategory
     */
    changeCategory = (newCategory) => {
        this.view.ID = newCategory;
        this.view.subID = 1; // first page of pagination!
    }
}

export default ProductsPresenter;
