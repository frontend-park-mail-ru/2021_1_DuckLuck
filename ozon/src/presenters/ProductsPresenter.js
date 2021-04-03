import BasePresenter from './BasePresenter.js';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';

/**
 * @description Presenter for Product View and Model
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
        this.bus.on(Events.ProductsLoad, this.loadProducts);
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
     *
     * @param {Number} page
     */
    loadProducts = (page) => {
        this.model.loadProducts(page);
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
}

export default ProductsPresenter;
