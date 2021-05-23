import {BaseView} from '../BaseView.js';
import Events from '../../utils/bus/events';
import favoritesTemplate from './FavoritesView.hbs';
import favoriteStyles from './FavoritesView.scss';
import {ListOfProducts} from '../Common/ListOfProducts/ListOfProducts';
import {Pagination} from '../Common/Pagination/Pagination';
import Router from '../../utils/router/Router';
import buttonStyles from '../Common/Button/Button.scss';
import ListOfProductsItemStyles from '../Common/ListOfProducts/ListOfProductsItem/ListOfProductsItem.scss';
import {Bus} from '../../utils/bus/bus';

/**
 * @class FavoritesView
 * @extends BaseView
 * @classdesc Class for showing product
 */
export class FavoritesView extends BaseView {
    /**
     * @param {Object} URLParams
     */
    show = (URLParams = {}) => {
        if (!this.IDs) {
            this.IDs = {};
        }
        if (!this.IDs['page']) {
            this.IDs['page'] = 1;
        }
        if (!this.IDs['category']) {
            this.IDs['category'] = 1;
        }

        if (Object.keys(URLParams).length) {
            this.presenter.changeSortKey(URLParams.sortKey || 'cost');
            this.presenter.changeSortDirection(URLParams.sortDirection || 'ASC');
        } else {
            this.presenter.changeSortKey('cost');
            this.presenter.changeSortDirection('ASC');
        }

        this.bus.emit(Events.FavoritesLoadProducts, this.IDs['page']);
    }

    render = () => {
        this.parent.innerHTML = '';
        const productsListHtmlString = new ListOfProducts(this.presenter.products, 'products').getHtmlString();
        const pagination = new Pagination(this.presenter.paginationInfo).getHtmlString();
        const template = favoritesTemplate({
            isEmpty: this.presenter.products.length === 0,
            favoritesStyles: favoriteStyles,
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
        });
        this.cache = new DOMParser().parseFromString(template, 'text/html')
            .getElementsByClassName(favoriteStyles.block)[0];
        this.parent.appendChild(this.cache);


        const select = this.cache.getElementsByClassName(favoriteStyles.select)[0];
        select.addEventListener('change', () => {
            const selected = select.selectedOptions[0];
            const sortKey = selected.getAttribute('key');
            const sortDirection = selected.getAttribute('direction');
            this.presenter.changeSortKey(sortKey);
            this.presenter.changeSortDirection(sortDirection);
            Router.open('/favorites', {}, {
                sortKey: this.presenter.sortKey,
                sortDirection: this.presenter.sortDirection,
            });
        });

        for (const button of this.cache.getElementsByClassName(buttonStyles.paginator)) {
            button.addEventListener('click', () => {
                const page = parseInt(button.getAttribute('page'));
                this.ID = page;
                Router.open(`/favorites/${page}`, {}, {
                    sortKey: this.presenter.sortKey,
                    sortDirection: this.presenter.sortDirection,
                });
            });
        }


        for (const itemContainer of this.cache.getElementsByClassName(ListOfProductsItemStyles.block)) {
            const productID = parseInt(itemContainer.getAttribute('item-id'));
            itemContainer.getElementsByClassName(ListOfProductsItemStyles.infoWrapper)[0]
                .addEventListener('click', () => {
                    Bus.globalBus.emit(Events.ProductChangeID, productID);
                    Router.open(`/item/${productID}`);
                });

            let item = itemContainer.getElementsByClassName(buttonStyles.notInCartProducts)[0];
            if (item === undefined) {
                item = itemContainer.getElementsByClassName(buttonStyles.inCartProducts)[0];
            }

            item.addEventListener('click', (evt) => {
                evt.preventDefault();
                Bus.globalBus.emit(Events.CartAddProduct, productID, 1);
            });
        }

        Bus.globalBus.emit(Events.CartGetProductsID);
        Bus.globalBus.emit(Events.FavoritesGetProductsID);
    };
}
