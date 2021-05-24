import BaseView from '../BaseView.js';
import Events from '../../utils/bus/events';
import ordersTemplate from './OrdersView.hbs';
import ordersStyles from './OrdersView.scss';
import Pagination from '../Common/Pagination/Pagination';
import Bus from '../../utils/bus/bus';
import Router from '../../utils/router/Router';
import paginatorStyles from '../Common/Pagination/Pagination.scss';


/**
 * @class OrdersView
 * @extends BaseView
 * @classdesc Class for showing orderS
 */
class OrdersView extends BaseView {
    show = () => {
        if (!this.IDs) {
            this.IDs = {};
        }
        if (!this.IDs['page']) {
            this.IDs['page'] = 1;
        }

        if (!this.presenter.sortKey) {
            this.presenter.sortKey = 'date';
        }
        if (!this.presenter.sortDirection) {
            this.presenter.sortDirection = 'DESC';
        }

        this.bus.emit(Events.OrdersLoad,
            this.IDs['page'],
            this.presenter.sortKey,
            this.presenter.sortDirection);
    }

    render = () => {
        this.parent.innerHTML = '';
        const orders = this.presenter.orders;
        let pagination = '';
        if (orders.length) {
            pagination = new Pagination(this.presenter.paginationInfo).getHtmlString();
        }
        const template = ordersTemplate({
            pagination: pagination,
            orderList: orders,
            isEmpty: !orders.length,
            ordersStyles: ordersStyles,
            select: [
                {
                    key: 'date',
                    direction: 'DESC',
                    name: 'Сначала новые',
                },
                {
                    key: 'date',
                    direction: 'ASC',
                    name: 'Сначала старые',
                },
            ],
            sort: {
                key: this.presenter.sortKey,
                direction: this.presenter.sortDirection,
            },
        });
        this.cache = new DOMParser().parseFromString(template, 'text/html').getElementById('orders-list-block');
        this.parent.appendChild(this.cache);

        const select = this.cache.getElementsByClassName(ordersStyles.select)[0];
        select.addEventListener('change', () => {
            const selected = select.selectedOptions[0];
            this.presenter.sortKey = selected.getAttribute('key');
            this.presenter.sortDirection = selected.getAttribute('direction');
            Router.open('/orders');
        });

        for (const itemContainer of this.cache.getElementsByClassName(ordersStyles.image)) {
            const productID = parseInt(itemContainer.getAttribute('item-id'));
            itemContainer.addEventListener('click', () => {
                Bus.globalBus.emit(Events.ProductChangeID, productID);
                Router.open(`/item/${productID}`);
            });
        }

        for (const button of this.cache.getElementsByClassName(paginatorStyles.button)) {
            button.addEventListener('click', () => {
                const page = parseInt(button.getAttribute('page'));
                this.ID = page;
                Router.open(`/orders/${page}`, {id: page});
            });
        }
    }
}

export default OrdersView;