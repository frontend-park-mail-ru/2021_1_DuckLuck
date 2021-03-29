import BasePresenter from './BasePresenter.js';

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
        if (result === 'success') {
            this._view.render();
            this._view._cache.hidden = false;
        } else {
            console.error('Cant load products');
        }
    }
}

export default ProductsPresenter;
