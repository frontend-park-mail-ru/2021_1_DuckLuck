import {AjaxModule} from '../modules/Ajax/Ajax';
import {fileServerHost, serverApiPath, urls} from '../utils/urls/urls';
import BaseModel from './BaseModel';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';
import HTTPResponses from '../utils/http-responses/httpResponses';

/**
 * @description Model for OrderS in MVP Arch
 */
class OrdersModel extends BaseModel {
    #orders;
    #sortKey;
    #sortDirection;
    #paginationInfo

    /**
     * @return {Array} array of orders
     */
    get orders() {
        return this.#orders;
    }

    /**
     * @return {Object} pagination info
     */
    get paginationInfo() {
        return this.#paginationInfo;
    }

    /**
     * @return {string}
     */
    get sortDirection() {
        return this.#sortDirection;
    }

    /**
     * @return {string}
     */
    get sortKey() {
        return this.#sortKey;
    }

    /**
     * @param {string} newSortKey
     */
    set sortKey(newSortKey) {
        return this.#sortKey = newSortKey;
    }

    /**
     * @param {string} newSortDirection
     */
    set sortDirection(newSortDirection) {
        return this.#sortDirection = newSortDirection;
    }

    /**
     *
     * @param {number} page
     * @param {string} sortKey
     * @param {string} sortDirection
     * @param {Object} body
     */
    loadOrders = (page, sortKey, sortDirection, body = {
        page_num: +page,
        count: 3,
        sort_key: sortKey,
        sort_direction: sortDirection,
    }) => {
        AjaxModule.postUsingFetch({
            url: serverApiPath + urls.orders,
            body: body,
        }).then((response) => {
            if (response.status !== HTTPResponses.Success) {
                throw response.status;
            }
            return response.json();
        }).then((parsedJson) => {
            this.#paginationInfo = {
                pagesCount: parsedJson['max_count_pages'],
                currentPage: page,
            };
            this.#orders = parsedJson.list_placed_orders;
            for (const order of this.#orders) {
                order.date_added = order.date_added.substring(0, order.date_added.indexOf('T'));
                for (const image of order.product_images) {
                    image.preview_image = fileServerHost + image.preview_image;
                }
            }
            this.bus.emit(Events.OrdersLoaded, Responses.Success);
        }).catch((err) => {
            switch (err) {
            case HTTPResponses.Unauthorized: {
                this.bus.emit(Events.OrdersLoaded, Responses.Unauthorized);
                break;
            }
            case HTTPResponses.Offline: {
                this.bus.emit(Events.OrdersLoaded, Responses.Offline);
                break;
            }
            default: {
                console.error(err);
                break;
            }
            }
        });
    }
}

export default OrdersModel;
