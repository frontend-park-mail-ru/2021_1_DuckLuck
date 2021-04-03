import BasePresenter from './BasePresenter.js';
import Bus from '../utils/bus/bus';
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
     */
    constructor(view, model) {
        super(view, model);
        Bus.on(Events.ProductsLoad, this.loadProducts);
        Bus.on(Events.ProductsLoaded, this.productLoadedReaction);
    }

    /**
     *
     * @return {Object}
     */
    get products() {
        return this._model.products;
    }

    /**
     *
     * @return {{pagesCount: *, currentPage: Number}|*}
     */
    get paginationInfo() {
        return this._model.paginationInfo;
    }

    /**
     *
     * @param {Number} page
     */
    loadProducts = (page) => {
        this._model.loadProducts(page);
    }

    /**
     *
     * @param {string} result
     */
    productLoadedReaction = (result) => {
        if (result === Responses.Success) {
            this._view.render();
            this._view.cache.hidden = false;
        } else {
            console.error('Cant load products');
        }
    }
}

export default ProductsPresenter;
