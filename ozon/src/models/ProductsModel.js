import {AjaxModule} from '../modules/Ajax/Ajax';
import {serverApiPath} from '../utils/urls/urls';
import BaseModel from './BaseModel';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';

/**
 * @description Model for ProductS in MVP Arch
 */
class ProductsModel extends BaseModel {
    #products
    #paginationInfo

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
     * @param {Number|String} currentPage
     * @param {Object} body Body of request
     */
    loadProducts(currentPage, body = {
        page_num: parseInt(currentPage),
        count: 4,
        sort_key: 'cost',
        sort_direction: 'ASC',
        category: 1,
    }) {
        AjaxModule.postUsingFetch({
            url: serverApiPath + '/product',
            body: body,
        }).then((response) => {
            return response.json();
        }).then((parsedJson) => {
            this.#products = parsedJson['list_preview_products'];
            this.#paginationInfo = {
                pagesCount: parsedJson['max_count_pages'],
                currentPage: currentPage,
            };
            this.bus.emit(Events.ProductsLoaded, Responses.Success);
        }).catch(() => {
            this.bus.emit(Events.ProductsLoaded, Responses.Error);
        });
    }
}

export default ProductsModel;
