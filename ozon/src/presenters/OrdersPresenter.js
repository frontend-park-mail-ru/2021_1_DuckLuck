import BasePresenter from './BasePresenter.js';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';
import Router from '../utils/router/Router';

/**
 * @description Presenter for OrderS View and Model
 */
class OrdersPresenter extends BasePresenter {
    /**
     * @return {Array}
     */
    get orders() {
        return this.model.orders;
    }

    /**
     * @return {Object}
     */
    get paginationInfo() {
        return this.model.paginationInfo;
    }

    /**
     * @return {string}
     */
    get sortKey() {
        return this.model.sortKey;
    }

    /**
     * @return {string}
     */
    get sortDirection() {
        return this.model.sortDirection;
    }

    /**
     * @param {string} newSortKey
     */
    set sortKey(newSortKey) {
        return this.model.sortKey = newSortKey;
    }

    /**
     * @param {string} newSortDirection
     */
    set sortDirection(newSortDirection) {
        return this.model.sortDirection = newSortDirection;
    }

    /**
     * @param {HTMLElement} application html of application
     * @param {Class} View Class of view object
     * @param {Class} Model Class of model object
     */
    constructor(application, View, Model) {
        super(application, View, Model);

        this.bus.on(Events.OrdersLoad, this.loadOrders);
        this.bus.on(Events.OrdersLoaded, this.ordersLoadedReaction);
    }

    /**
     *
     * @param {number} page
     * @param {string} sortKey
     * @param {string} sortDirection
     */
    loadOrders = (page, sortKey, sortDirection) => {
        this.model.loadOrders(page, sortKey, sortDirection);
    }

    /**
     * @param {string} result
     */
    ordersLoadedReaction = (result) => {
        switch (result) {
        case Responses.Success: {
            this.view.render();
            break;
        }
        case Responses.Offline: {
            Router.open('/offline');
            break;
        }
        case Responses.Unauthorized: {
            Router.open('/login', {replaceState: true});
            break;
        }
        default: {
            console.error(result);
            break;
        }
        }
    }
}

export default OrdersPresenter;
