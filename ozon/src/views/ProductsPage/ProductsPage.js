import {BasePage} from '../BasePage.js';
import {ListOfProducts} from '../Common/ListOfProducts/ListOfProducts.js';
import {Pagination} from '../Common/Pagination/Pagination';
import ProductsPageTemplate from './ProductsPage.hbs';

/**
 * @class ProductsPage
 * @extends BasePage
 * @classdesc Class for showing product
 */
export class ProductsPage extends BasePage {
    /**
     * @param {Object} parent parents object
     */
    constructor(parent) {
        super(parent);
    }

    /**
     *
     * @param {Object[]} products array of product
     * @param {Object} paginationInfo info about current pagination state
     * @return {HTMLElement} rendered page
     */
    render = ({products, paginationInfo}) => {
        const productsListHtmlString = new ListOfProducts(products).getHtmlString();
        const pagination = new Pagination(paginationInfo).getHtmlString();
        const template = ProductsPageTemplate({
            productsList: productsListHtmlString,
            pagination: pagination,
        });
        return new DOMParser().parseFromString(template, 'text/html').getElementById('products-list-block');
    };
}
