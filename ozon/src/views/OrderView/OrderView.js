import {BaseView} from '../BaseView.js';
import Events from '../../utils/bus/events';
import orderTemplate from './OrderView.hbs';
import {Input} from '../Common/Input/Input';
import orderStyles from './OrderView.css';
import Router from '../../utils/router/Router';

/**
 * @class ProductsView
 * @extends BaseView
 * @classdesc Class for showing product
 */
export class OrderView extends BaseView {
    show = () => {
        this.bus.emit(Events.OrderLoad);
    }

    render = () => {
        this.parent.innerHTML = '';
        const template = orderTemplate({
            productsList: this.presenter.products,
            inputFields: [new Input({type: 'email', name: 'email', placeholder: 'Электронная почта',
                value: this.presenter.recipient.email}),
            new Input({type: 'text', name: 'firstName', placeholder: 'Имя',
                value: this.presenter.recipient.first_name}),
            new Input({type: 'text', name: 'lastName', placeholder: 'Фамилия',
                value: this.presenter.recipient.last_name}),
            new Input({type: 'text', name: 'address', placeholder: 'Адрес доставки'})],
            orderStyles: orderStyles,
            cartSize: this.presenter.products.length,
            baseCost: +this.presenter.price.total_base_cost,
            discount: +this.presenter.price.total_discount,
            totalCost: +this.presenter.price.total_cost,
        });
        this.cache = new DOMParser().parseFromString(template, 'text/html').getElementById('products-list-block');
        this.parent.appendChild(this.cache);

        this.cache.getElementsByClassName(orderStyles.orderButton)[0].addEventListener('click', (evt) => {
            evt.preventDefault();
            this.bus.emit(Events.SendOrder);
            this.remove();
            Router.open('/', {replaceState: true});
        });
    };
}
