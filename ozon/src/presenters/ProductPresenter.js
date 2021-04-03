import BasePresenter from './BasePresenter.js';
import Bus from '../utils/bus/bus';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';

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
        Bus.on(Events.ProductChangeID, this.changeID);
        Bus.on(Events.ProductLoaded, this.productLoadedReaction);
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
        if (result === Responses.Success) {
            this._view.reRender();
            this._view.cache.hidden = false;
        } else {
            console.error('Cant load product');
        }
    }
}

export default ProductsPresenter;
