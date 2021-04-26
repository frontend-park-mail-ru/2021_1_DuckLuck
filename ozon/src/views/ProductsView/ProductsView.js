import {BaseView} from '../BaseView.js';
import {ListOfProducts} from '../Common/ListOfProducts/ListOfProducts.js';
import ListOfProductsItemStyles from '../Common/ListOfProducts/ListOfProductsItem/ListOfProductsItem.css';
import {Pagination} from '../Common/Pagination/Pagination';
import productsPageTemplate from './ProductsView.hbs';
import productsStyles from './ProductsView.css';
import paginatorStyles from '../Common/Pagination/Pagination.css';
import {Bus} from '../../utils/bus/bus';
import Router from '../../utils/router/Router';
import Events from '../../utils/bus/events';

/**
 * @class ProductsView
 * @extends BaseView
 * @classdesc Class for showing product
 */
export class ProductsView extends BaseView {
    types = {
        search: 'search',
        category: 'category',
    }

    #viewType

    show = () => {
        if (!this.IDs) {
            this.IDs = {};
        }
        if (!this.IDs['page']) {
            this.IDs['page'] = 1;
        }
        if (!this.presenter.sortKey) {
            this.presenter.changeSortKey('cost');
        }
        if (!this.presenter.sortDirection) {
            this.presenter.changeSortDirection('ASC');
        }
        this.bus.emit(
            Events.ProductsLoad,
            this.IDs['category'],
            this.IDs['page'],
            this.presenter.sortKey,
            this.presenter.sortDirection,
        );
    }

    render = () => {
        this.parent.innerHTML = '';
        const productsListHtmlString = new ListOfProducts(this.presenter.products).getHtmlString();
        const pagination = new Pagination(this.presenter.paginationInfo).getHtmlString();
        const template = productsPageTemplate({
            productsList: productsListHtmlString,
            pagination: pagination,
            select: [
                {
                    key: 'cost',
                    direction: 'ASC',
                    name: 'Сначала дешевые',
                },
                {
                    key: 'cost',
                    direction: 'DESC',
                    name: 'Сначала дорогие',
                },
                {
                    key: 'date',
                    direction: 'DESC',
                    name: 'Новинки',
                },
                {
                    key: 'rating',
                    direction: 'DESC',
                    name: 'Высокий рейтинг',
                },
                {
                    key: 'discount',
                    direction: 'DESC',
                    name: 'По размеру скидки',
                },
            ],
            sort: {
                key: this.presenter.sortKey,
                direction: this.presenter.sortDirection,
            },
            productsStyles: productsStyles,
        });
        this.cache = new DOMParser().parseFromString(template, 'text/html')
            .getElementsByClassName(productsStyles.block)[0];

        const select = this.cache.getElementsByClassName(productsStyles.select)[0];
        select.addEventListener('change', () => {
            const selected = select.selectedOptions[0];
            const sortKey = selected.getAttribute('key');
            const sortDirection = selected.getAttribute('direction');
            this.presenter.changeSortKey(sortKey);
            this.presenter.changeSortDirection(sortDirection);
            Router.open(`/items/${this.IDs['category']}`);
        });


        for (const button of this.cache.getElementsByClassName(paginatorStyles.button)) {
            button.addEventListener('click', () => {
                const page = parseInt(button.getAttribute('page'));
                this.ID = page;
                switch (this.#viewType) {
                case this.types.category:
                    Router.open(`/items/${this.IDs['category']}/${page}`, {id: page});
                    break;
                case this.types.search:
                    Router.open(`/search/${page}/?text=${this.IDs['searchText']}`, {id: page});
                    break;
                }
            });
        }

        for (const itemContainer of this.cache.getElementsByClassName(ListOfProductsItemStyles.block)) {
            const productID = parseInt(itemContainer.getAttribute('item-id'));
            itemContainer.getElementsByClassName(ListOfProductsItemStyles.infoWrapper)[0]
                .addEventListener('click', () => {
                    Bus.globalBus.emit(Events.ProductChangeID, productID);
                    Router.open(`/item/${productID}`);
                });

            let item = itemContainer.getElementsByClassName(ListOfProductsItemStyles.notInCartButton)[0];
            if (item === undefined) {
                item = itemContainer.getElementsByClassName(ListOfProductsItemStyles.inCartButton)[0];
            }

            item.addEventListener('click', (evt) => {
                evt.preventDefault();
                Bus.globalBus.emit(Events.CartAddProduct, productID, 1);
                item.className = ListOfProductsItemStyles.inCartButton;
                item.getElementsByTagName('span')[0].innerHTML = 'Добавить +1';
            });
        }

        this.parent.appendChild(this.cache);
    };
}
