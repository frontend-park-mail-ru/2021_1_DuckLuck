import BasePresenter from './BasePresenter.js';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';
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
        Bus.globalBus.on(Events.ProductsChangeCategory, this.changeCategory);
        this.bus.on(Events.ProductsLoad, this.loadProducts);
        Bus.globalBus.on(Events.HeaderChangeCategoryID, this.changeCategoryId);
        this.bus.on(Events.ProductsLoaded, this.productLoadedReaction);
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
        if (result === Responses.Success) {
            this.view.render();
            this.view.cache.hidden = false;
        } else {
            console.error('Cant load products');
        }
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
