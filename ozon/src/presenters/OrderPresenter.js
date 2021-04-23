import BasePresenter from './BasePresenter.js';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';
import Router from '../utils/router/Router';

/**
 * @description Presenter for Login View and Model
 */
class OrderPresenter extends BasePresenter {
    /**
     * @param {HTMLElement} application html of application
     * @param {Class} View Class of view object
     * @param {Class} Model Class of model object
     */
    constructor(application, View, Model) {
        super(application, View, Model);
        this.bus.on(Events.OrderLoad, this.loadOrder);
        this.bus.on(Events.OrderLoaded, this.orderLoadedReaction);
        this.bus.on(Events.SendOrder, this.sendOrder);
    }

    /**
     * @return {Array} array of products
     */
    get products() {
        return this.model.products;
    }

    /**
     * @return {Object} total price, discount price, discount size
     */
    get price() {
        return this.model.price;
    }

    /**
     * @return {Object} Information about recipient
     */
    get recipient() {
        return this.model.recipient;
    }

    /**
     * @return {String} Address
     */
    get address() {
        return this.model.address;
    }

    /**
     * @description Loads all information about order from model
     */

    loadOrder = () => {
        this.model.loadOrder();
    }

    /**
     * @param {string} result
     * @description Reaction on order loading
     */
    orderLoadedReaction = (result) => {
        if (result === Responses.Success) {
            this.view.render();
            this.view.cache.hidden = false;
        } else {
            console.error('Cant load order');
            Router.open('/items', {replaceState: true});
        }
    }

    /**
     * @description Sends order form to model
     */
    sendOrder = () => {
        this.model.address = document.getElementsByName('address')[0].value.trim();
        const email = document.getElementsByName('email')[0].value.trim();
        const first_name = document.getElementsByName('firstName')[0].value.trim();
        const last_name = document.getElementsByName('lastName')[0].value.trim();

        this.model.recipient = {first_name, last_name, email};
        this.model.sendOrder();
    }
}

export default OrderPresenter;
