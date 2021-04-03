import {BaseView} from '../BaseView.js';
import {ListOfProducts} from '../Common/ListOfProducts/ListOfProducts.js';
import {Pagination} from '../Common/Pagination/Pagination';
import productsPageTemplate from './ProductsView.hbs';
import Bus from '../../utils/bus/bus';
import Router from '../../Router';
import Events from '../../utils/bus/events';

/**
 * @class ProductsView
 * @extends BaseView
 * @classdesc Class for showing product
 */
export class ProductsView extends BaseView {
    static #instance;
    /**
     * @param {Object} parent parents object
     */

    /**
     *
     * @param {Object}parent
     * @param {Number} page
     * @return {ProductsView}
     */
    constructor(parent, page) {
        if (ProductsView.#instance) {
            ProductsView.#instance._currentPage = page === undefined ? 1 : page;
            return ProductsView.#instance;
        }

        super(parent);
        this._currentPage = page === undefined ? 1 : page;
        ProductsView.#instance = this;
    }


    show = () => {
        Bus.emit(Events.ProductsLoad, this._currentPage);
    }

    /**
     *
     * @param {Object[]} products array of product
     * @param {Object} paginationInfo info about current pagination state
     */
    render = () => {
        this.parent.innerHTML = '';
        const productsListHtmlString = new ListOfProducts(this.presenter.products).getHtmlString();
        const pagination = new Pagination(this.presenter.paginationInfo).getHtmlString();
        const template = productsPageTemplate({
            productsList: productsListHtmlString,
            pagination: pagination,
        });
        this.cache = new DOMParser().parseFromString(template, 'text/html').getElementById('products-list-block');

        for (const button of this.cache.getElementsByClassName('button_pagination')) {
            button.addEventListener('click', () => {
                const page = parseInt(button.textContent);
                this._currentPage = page;
                Router.open('/items', {id: page});
            });
        }
        for (const itemContainer of this.cache.getElementsByClassName('item-container')) {
            itemContainer.addEventListener('click', () => {
                const productID = parseInt(itemContainer.getElementsByClassName('item-id')[0].textContent);
                Bus.emit(Events.ProductChangeID, productID);
                Router.open('/item', {id: productID});
            });
        }

        this.parent.appendChild(this.cache);
    };
}
