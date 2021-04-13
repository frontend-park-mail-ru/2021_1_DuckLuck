import {AjaxModule} from '../modules/Ajax/Ajax';
import {serverApiPath} from '../utils/urls/urls';
import BaseModel from './BaseModel';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';
import HTTPResponses from '../utils/http-responses/httpResponses';

/**
 * @description Model for ProductS in MVP Arch
 */
class ProductsModel extends BaseModel {
    #products
    #paginationInfo
    #categoryId

    /**
     *
     * @return {Object} Array of products
     */
    get products() {
        return this.#products;
    }

    /**
     *
     * @return {Object} Pagination info
     */
    get paginationInfo() {
        return this.#paginationInfo;
    }

    /**
     *
     * @return {Number}
     */
    get categoryId() {
        return this.#categoryId;
    }

    /**
     *
     * @param {Number} id
     */
    set categoryId(id) {
        this.#categoryId = id;
    }

    /**
     *
     * @param {Number|String} currentPage
     * @param {Object} body Body of request
     */
    loadProducts(currentPage, body = {
        page_num: parseInt(currentPage),
        count: 4,
        sort_key: 'cost',
        sort_direction: 'ASC',
        category: this.categoryId,
    }) {
        AjaxModule.postUsingFetch({
            url: serverApiPath + '/product',
            body: body,
        }).then((response) => {
            if (response.status !== HTTPResponses.Success) {
                throw response.status;
            }
            return response.json();
        }).then((parsedJson) => {
            this.#products = parsedJson['list_preview_products'];
            this.#paginationInfo = {
                pagesCount: parsedJson['max_count_pages'],
                currentPage: currentPage,
            };
            this.bus.emit(Events.ProductsLoaded, Responses.Success);
        }).catch((err) => {
            switch (err) {
            case HTTPResponses.Unauthorized: {
                this.bus.emit(Events.ProductsLoaded, Responses.Unauthorized);
                break;
            }
            case HTTPResponses.Offline: {
                this.bus.emit(Events.ProductsLoaded, Responses.Offline);
                break;
            }
            default: {
                this.bus.emit(Events.ProductsLoaded, Responses.Error);
                break;
            }
            }
        });
    }
}

export default ProductsModel;
