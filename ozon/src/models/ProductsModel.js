import {AjaxModule} from '../modules/Ajax/Ajax';
import {serverApiPath} from '../utils/urls/urls';
import Bus from '../utils/bus/bus';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';

/**
 * @description Model for ProductS in MVP Arch
 */
class ProductsModel {
    /**
     *
     * @return {Object} Array of products
     */
    get products() {
        return this._products;
    }

    /**
     *
     * @return {Object} Pagination info
     */
    get paginationInfo() {
        return this._paginationInfo;
    }

    /**
     *
     * @param {Number} currentPage
     * @param {Object} body Body of request
     */
    loadProducts(currentPage, body = {
        page_num: currentPage,
        count: 4,
        sort_key: 'cost',
        sort_direction: 'ASC',
    }) {
        AjaxModule.postUsingFetch({
            url: serverApiPath + '/product',
            body: body,
        }).then((response) => {
            return response.json();
        }).then((parsedJson) => {
            this._products = parsedJson['list_preview_products'];
            this._paginationInfo = {
                pagesCount: parsedJson['max_count_pages'],
                currentPage: currentPage,
            };
            Bus.emit(Events.ProductsLoaded, Responses.Success);
        }).catch(() => {
            Bus.emit(Events.ProductsLoaded, Responses.Error);
        });
    }
}

export default ProductsModel;
