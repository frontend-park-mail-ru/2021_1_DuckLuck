import BasePresenter from './BasePresenter.js';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';
import {Bus} from '../utils/bus/bus';
import Router from '../utils/router/Router';

/**
 * @description Presenter for Login View and Model
 */
class CartPresenter extends BasePresenter {
    /**
     * @param {HTMLElement} application html of application
     * @param {Class} View Class of view object
     * @param {Class} Model Class of model object
     */
    constructor(application, View, Model) {
        super(application, View, Model);
        this.bus.on(Events.CartLoad, this.loadProducts);
        this.bus.on(Events.CartLoaded, this.cartLoadedReaction);
        this.bus.on(Events.CartUserUnauthorized, this.cartUserUnauthorizedReaction);

        Bus.globalBus.on(Events.CartProductRemoved, this.productRemovedReaction);
        Bus.globalBus.on(Events.CartAddProduct, this.addProduct);
        Bus.globalBus.on(Events.CartRemoveProduct, this.removeProduct);
    }

    /**
     * @return {Object} array of products
     */
    get products() {
        return this.model.products;
    }

    /**
     * @return {boolean} is view needs to be rerendered
     */
    get needsRerender() {
        return this.model.needsRerender;
    }

    /**
     * @description loads all products
     */
    loadProducts = () => {
        if (!navigator.onLine) {
            Router.open('/offline');
            return;
        }
        this.model.loadProducts();
    }

    /**
     * @param {Responses} status
     */
    cartLoadedReaction = (status) => {
        if (status === Responses.Success) {
            this.view.render();
            return;
        }
        Router.open('/login', {replaceState: true});
    }

    /**
     *
     * @param {number} id
     * @param {number|string} count
     */
    addProduct = ({id, count}) => {
        if (count < 0 || id < 0) {
            return;
        }
        this.model.addProduct(id, count);
    }

    /**
     * @param {number} id
     */
    removeProduct = (id) => {
        this.model.removeProduct(id);
    }

    /**
     * @param {Responses} result
     */
    productRemovedReaction = (result) => {
        if (result === Responses.Success) {
            this.view.show();
            return;
        }
        console.error(result);
    }

    cartUserUnauthorizedReaction = () => {
        Router.open('/login', {replaceState: true});
    }
}

export default CartPresenter;
