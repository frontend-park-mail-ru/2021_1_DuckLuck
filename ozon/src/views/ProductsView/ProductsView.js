import {BaseView} from '../BaseView.js';
import {ListOfProducts} from '../Common/ListOfProducts/ListOfProducts.js';
import {Pagination} from '../Common/Pagination/Pagination';
import productsPageTemplate from './ProductsView.hbs';

/**
 * @class ProductsView
 * @extends BaseView
 * @classdesc Class for showing product
 */
export class ProductsView extends BaseView {
    /**
     * @param {Object} parent parents object
     */
    constructor(parent) {
        super(parent);
    }


    set products(products) {
       this._products = products
    }

    set paginationInfo(paginationInfo) {
        this._paginationInfo = paginationInfo
    }

    /**
     *
     * @param {Object[]} products array of product
     * @param {Object} paginationInfo info about current pagination state
     * @return {HTMLElement} rendered page
     */
    render = () => {
        this.el.innerHTML = '';
        const productsListHtmlString = new ListOfProducts(this._products).getHtmlString();
        const pagination = new Pagination(this._paginationInfo).getHtmlString();
        const template = productsPageTemplate({
            productsList: productsListHtmlString,
            pagination: pagination,
        });
        this.cache = new DOMParser().parseFromString(template, 'text/html').getElementById('products-list-block');
        console.log(this.cache);
        this.el.appendChild(this.cache);
    };
}
