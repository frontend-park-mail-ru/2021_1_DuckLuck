import {BaseView} from '../BaseView.js';
import {ListOfProducts} from '../Common/ListOfProducts/ListOfProducts.js';
import ListOfProductsItemStyles from '../Common/ListOfProducts/ListOfProductsItem/ListOfProductsItem.css';
import {Pagination} from '../Common/Pagination/Pagination';
import productsPageTemplate from './ProductsView.hbs';
import productsStyles from './ProductsView.css';
import {Bus} from '../../utils/bus/bus';
import Router from '../../utils/router/Router';
import Events from '../../utils/bus/events';

/**
 * @class ProductsView
 * @extends BaseView
 * @classdesc Class for showing product
 */
export class ProductsView extends BaseView {
    show = () => {
        if (!this.IDs['category']) {
            this.IDs['category'] = 1;
        }
        if (!this.IDs['page']) {
            this.IDs['page'] = 1;
        }
        this.bus.emit(Events.ProductsLoad, this.IDs['category'], this.IDs['page']);
    }

    render = () => {
        this.parent.innerHTML = '';
        const productsListHtmlString = new ListOfProducts(this.presenter.products).getHtmlString();
        const pagination = new Pagination(this.presenter.paginationInfo).getHtmlString();
        const template = productsPageTemplate({
            productsList: productsListHtmlString,
            pagination: pagination,
            productsStyles: productsStyles,
        });
        this.cache = new DOMParser().parseFromString(template, 'text/html')
            .getElementsByClassName(productsStyles.block)[0];

        for (const button of this.cache.getElementsByClassName('button_pagination')) {
            button.addEventListener('click', () => {
                const page = parseInt(button.textContent);
                this.ID = page;
                Router.open(`/items/${this.IDs['category']}/${page}`, {id: page});
            });
        }
        for (const itemContainer of this.cache.getElementsByClassName(ListOfProductsItemStyles.block)) {
            const productID = parseInt(itemContainer.getAttribute('item-id'));
            itemContainer.getElementsByClassName(ListOfProductsItemStyles.infoWrapper)[0]
                .addEventListener('click', () => {
                    Bus.globalBus.emit(Events.ProductChangeID, productID);
                    Router.open(`/item/${productID}`);
                });

            itemContainer.getElementsByClassName(ListOfProductsItemStyles.cartButton)[0]
                .addEventListener('click', (evt) => {
                    evt.preventDefault();
                    Bus.globalBus.emit(Events.CartAddProduct, {
                        id: productID,
                        count: 1,
                    });
                });
        }

        this.parent.appendChild(this.cache);
    };
}
