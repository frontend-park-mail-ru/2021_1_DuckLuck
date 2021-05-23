import {AjaxModule} from '../modules/Ajax/Ajax';
import {serverApiPath, urls} from '../utils/urls/urls';
import BaseModel from './BaseModel';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';
import HTTPResponses from '../utils/http-responses/httpResponses';
import {Bus} from '../utils/bus/bus';

/**
 * @description Model for Product in MVP Arch
 */
class FavoritesModel extends BaseModel {
    #paginationInfo
    #sortKey
    #sortDirection
    #isUserOnline
    #products
    #ids

    /**
     *
     * @return {Object} Pagination info
     */
    get paginationInfo() {
        return this.#paginationInfo;
    }


    /**
     * @return {String}
     */
    get sortKey() {
        return this.#sortKey;
    }

    /**
     * @return {String}
     */
    get sortDirection() {
        return this.#sortDirection;
    }

    /**
     * @return {String}
     */
    get products() {
        return this.#products;
    }


    /**
     *
     * @param {String} sortKey
     */
    set sortKey(sortKey) {
        this.#sortKey = sortKey;
    }

    /**
     *
     * @param {String} sortDirection
     */
    set sortDirection(sortDirection) {
        this.#sortDirection = sortDirection;
    }


    /**
     * @param {number | string} page
     * @param {string} sortKey
     * @param {string} sortDirection
     * @param {Object} body
     */
    loadProducts = (page, sortKey = this.#sortKey, sortDirection = this.#sortDirection, body = {
        page_num: +page,
        count: 2,
        sort_key: sortKey,
        sort_direction: sortDirection,
        category: 1,
    }) => {
        AjaxModule.postUsingFetch({
            url: serverApiPath + urls.favorites,
            body: body,
        }).then((response) => {
            return response.json();
        }).then((parsedJson) => {
            this.#products = parsedJson['list_preview_products'];
            this.#paginationInfo = {
                pagesCount: parsedJson['max_count_pages'],
                currentPage: page,
            };
            this.bus.emit(Events.FavoritesProductsLoaded, Responses.Success);
        }).catch((err) => {
            switch (err) {
            case HTTPResponses.Unauthorized: {
                this.bus.emit(Events.FavoritesProductsLoaded, Responses.Unauthorized);
                break;
            }
            case HTTPResponses.Offline: {
                this.#products = [];
                this.#paginationInfo = {
                    pagesCount: 1,
                    currentPage: 1,
                };
                this.bus.emit(Events.FavoritesProductsLoaded, Responses.Success);
                break;
            }
            default: {
                this.bus.emit(Events.FavoritesProductsLoaded, Responses.Error);
                break;
            }
            }
        });
    }

    /**
     * @param {number} id
     */
    addProduct = (id) => {
        AjaxModule.postUsingFetch({
            url: serverApiPath + urls.favorites + `/product/${id}`,
        }).then((response) => {
            if (response.status !== HTTPResponses.Success) {
                throw response.status;
            }
            return response.json();
        }).then(() => {
            Bus.globalBus.emit(Events.HeaderChangeFavoriteItems, 1);
            Bus.globalBus.emit(Events.ProductsItemFavoriteAdded, id);
            Bus.globalBus.emit(Events.ProductItemFavoriteAdded, id);
            (this.#ids = this.#ids === undefined ? new Set : this.#ids).add(id);
        }).catch((err) => {
            switch (err) {
            case HTTPResponses.Unauthorized: {
                this.bus.emit(Events.FavoritesProductAdded, Responses.Unauthorized);
                break;
            }
            case HTTPResponses.Offline: {
                this.bus.emit(Events.FavoritesProductAdded, Responses.Offline);
                break;
            }
            default: {
                console.error(err);
                break;
            }
            }
        });
    }

    /**
     * @param {Events} event
     */
    getIDs = (event) => {
        if (this.#ids) {
            Bus.globalBus.emit(event, this.#ids);
            return;
        }

        AjaxModule.getUsingFetch({
            url: serverApiPath + urls.favorites,
        }).then((response) => {
            if (response.status !== HTTPResponses.Success) {
                throw response.status;
            }
            return response.json();
        }).then((parsedJson) => {
            this.#ids = new Set((parsedJson.products || []).map((elem) => {
                return elem;
            }) || []);
            Bus.globalBus.emit(event, this.#ids);
        }).catch((err) => {
            console.error(err);
            Bus.globalBus.emit(event, new Set());
        });
    }

    /**
     * @param {number | string} id
     */
    removeFavorites = (id) => {
        if (!(this.#ids.has(+id))) {
            return;
        }
        this.#ids.delete(+id);
        Bus.globalBus.emit(Events.HeaderChangeFavoriteItems, -1);
        Bus.globalBus.emit(Events.ProductsItemFavoriteRemoved, id);
        Bus.globalBus.emit(Events.ProductItemFavoriteRemoved, id);

        AjaxModule.deleteUsingFetch({
            url: serverApiPath + urls.favorites + `/product/${id}`,
        }).then((response) => {
            if (response.status !== HTTPResponses.Success) {
                throw response.status;
            }
        }).catch((err) => {
            switch (err) {
            case HTTPResponses.Offline: {
                this.bus.emit(Events.FavoritesProductRemoved, Responses.Offline);
                break;
            }
            default: {
                Bus.globalBus.emit(Events.FavoritesProductRemoved, Responses.Error);
            }
            }
        });
    }

    loadProductsAmount = () => {
        AjaxModule.getUsingFetch({
            url: serverApiPath + urls.favorites,
        }).then((response) => {
            if (response.status !== HTTPResponses.Success) {
                throw response.status;
            }
            return response.json();
        }).then((parsedJson) => {
            this.#products = parsedJson.products;
            this.#ids = new Set(this.#products.map((elem) => {
                return elem;
            }) || []);
            Bus.globalBus.emit(Events.FavoritesLoadedProductsAmountReaction, this.#products.length);
        }).catch((err) => {
            this.bus.emit(Events.FavoritesLoadedProductsAmountReaction, 0);
        });
    }
}

export default FavoritesModel;
