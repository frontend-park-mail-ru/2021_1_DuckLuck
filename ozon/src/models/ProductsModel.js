import {AjaxModule} from '../modules/Ajax/Ajax';
import {serverApiPath} from '../utils/urls/urls';
import Bus from '../bus';

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
     */
    loadProducts(currentPage) {
        AjaxModule.postUsingFetch({
            url: serverApiPath + '/product',
            body: {
                page_num: currentPage,
                count: 4,
                sort_key: 'cost',
                sort_direction: 'ASC',
            },
        }).then((response) => {
            return response.json();
        }).then((parsedJson) => {
            this._products = parsedJson['list_preview_products'];
            this._paginationInfo = {
                pagesCount: parsedJson['max_count_pages'],
                currentPage: currentPage,
            };

            Bus.emit('products-model-loaded', 'success');
        });
    }
}

export default ProductsModel;
