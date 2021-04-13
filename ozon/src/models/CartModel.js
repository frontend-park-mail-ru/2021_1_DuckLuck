import {AjaxModule} from '../modules/Ajax/Ajax';
import {serverApiPath, urls} from '../utils/urls/urls';
import BaseModel from './BaseModel';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';
import {Bus} from '../utils/bus/bus';
import HTTPResponses from '../utils/http-responses/httpResponses';

/**
 * @description Model for Product in MVP Arch
 */
class CartModel extends BaseModel {
    #ids = []
    #products
    #needsRerender;

    /**
     * @return {Object} item
     */
    get products() {
        return this.#products;
    }

    /**
     * @return {boolean} Is View needs to be rerendered.
     */
    get needsRerender() {
        return this.#needsRerender;
    }

    /**
     *
     * @param {number} id id of product
     * @param {number | string} count amount of product
     */
    addProduct(id, count) {
        if (this.#ids.includes(id)) {
            this.changeItemAmount(id, count);
            return;
        }

        AjaxModule.postUsingFetch({
            url: serverApiPath + urls.cartProduct,
            body: {product_id: +id,
                count: +count,
            },
        }).then((response) => {
            if (response.status !== Responses.Success) {
                throw response.status;
            }
            return response.json();
        }).then((parsedJson) => {
            this.#needsRerender = true;
            this.#ids.push(id);
        }).catch((err) => {
            switch (err) {
            case HTTPResponses.Unauthorized: {
                this.bus.emit(Events.CartProductAdded, Responses.Unauthorized);
                break;
            }
            case HTTPResponses.Offline: {
                this.bus.emit(Events.CartProductAdded, Responses.Offline);
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
     * @param {number} id id of product
     * @param {number | string} count new amount of product
     */
    changeItemAmount(id, count) {
        AjaxModule.putUsingFetch({
            url: serverApiPath + urls.cartProduct,
            body: {product_id: +id,
                count: +count},
        }).then((response) => {
            return response.json();
        }).then((parsedJson) => {
            this.#needsRerender = true;
        }).catch((err) => {
            console.error(err);
        });
    }

    /**
     * @param {number} id id of removed product
     */
    removeProduct = (id) => {
        AjaxModule.deleteUsingFetch({
            url: serverApiPath + urls.cartProduct,
            body: {product_id: +id},
        }).then((response) => {
            if (response.status !== HTTPResponses.Success) {
                throw response.status;
            }
            this.#needsRerender = true;
            if (this.#ids.indexOf(id) !== -1) {
                this.#ids.splice(this.#ids.indexOf(id), 1);
            }
            Bus.globalBus.emit(Events.CartProductRemoved, Responses.Success);
        }).catch((err) => {
            switch (err) {
            case HTTPResponses.Offline: {
                this.bus.emit(Events.CartProductRemoved, Responses.Offline);
                break;
            }
            default: {
                Bus.globalBus.emit(Events.CartProductRemoved, Responses.Error);
            }
            }
        });
    }

    /**
     * @description loads product from cart
     */
    loadProducts() {
        AjaxModule.getUsingFetch({
            url: serverApiPath + urls.cart,
        }).then((response) => {
            if (response.status !== Responses.Success) {
                throw response.status;
            }
            return response.json();
        }).then((parsedJson) => {
            this.#needsRerender = false;
            this.#products = parsedJson.products || [];
            this.#ids = this.#products.map((elem) => {
                return elem.id;
            }) || [];
            this.bus.emit(Events.CartLoaded, Responses.Success);
        }).catch(() => {
            this.bus.emit(Events.CartLoaded, Responses.Error);
        });
    }
}

export default CartModel;
