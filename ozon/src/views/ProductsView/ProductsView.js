import {BaseView} from '../BaseView.js';
import {ListOfProducts} from '../Common/ListOfProducts/ListOfProducts.js';
import {Pagination} from '../Common/Pagination/Pagination';
import productsPageTemplate from './ProductsView.hbs';
import Bus from '../../bus';
import Router from '../../Router';

/**
 * @class ProductsView
 * @extends BaseView
 * @classdesc Class for showing product
 */
export class ProductsView extends BaseView {
    /**
     * @param {Object} parent parents object
     */

    /**
     *
     * @param {Object}parent
     * @return {ProductsView}
     */
    constructor(parent) {
        if (ProductsView.__instance) {
            return ProductsView.__instance;
        }

        super(parent);
        this._currentPage = 1;
        ProductsView.__instance = this;
    }


    show = () => {
        this._presenter.loadProducts(this._currentPage);
    }

    /**
     *
     * @param {Object[]} products array of product
     * @param {Object} paginationInfo info about current pagination state
     */
    render = () => {
        this.el.innerHTML = '';
        const productsListHtmlString = new ListOfProducts(this._presenter.products).getHtmlString();
        const pagination = new Pagination(this._presenter.paginationInfo).getHtmlString();
        const template = productsPageTemplate({
            productsList: productsListHtmlString,
            pagination: pagination,
        });
        this.cache = new DOMParser().parseFromString(template, 'text/html').getElementById('products-list-block');

        for (const button of this.cache.getElementsByClassName('button_pagination')) {
            button.addEventListener('click', () => {
                this._currentPage = parseInt(button.textContent);
                this.show();
            });
        }
        for (const itemContainer of this.cache.getElementsByClassName('item-container')) {
            itemContainer.addEventListener('click', () => {
                Bus.emit('product-model-changeID',
                    parseInt(itemContainer.getElementsByClassName('item-id')[0].textContent));
                new Router().open('/item');
                // TODO:
                // config.item.open(parseInt(itemContainer.getElementsByClassName('item-id')[0].textContent));
            });
        }

        this.el.appendChild(this.cache);
    };
}
