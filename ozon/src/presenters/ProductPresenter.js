import BasePresenter from './BasePresenter.js';

/**
 * @description Presenter for Products View and Model
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
    get item() {
        return this._model.item;
    }

    /**
     *
     * @param {Number} productID
     */
    loadProduct = (productID) => {
        this._model.loadProduct(productID);
    }

    /**
     *
     * @param {Number} id ID of a product
     */
    changeID = (id) => {
        this._view._itemID = id;
    }

    /**
     *
     * @param {string}result
     */
    productLoadedReaction = (result) => {
        if (result === 'success') {
            this._view.reRender();
            this._view._cache.hidden = false;
        } else {
            console.error('Cant load product');
        }
    }
}

export default ProductsPresenter;
