import {BaseView} from '../BaseView.js';
import cartPageTemplate from './CartView.hbs';
import {Bus} from '../../utils/bus/bus';
import Events from '../../utils/bus/events';
import cartStyles from './CartView.css';

/**
 * @class ProductsView
 * @extends BaseView
 * @classdesc Class for showing product
 */
export class CartView extends BaseView {
    show = () => {
        this.bus.emit(Events.CartLoad);
    }

    render = () => {
        this.parent.innerHTML = '';
        let baseCost = 0;
        let discount = 0;
        for (const product of this.presenter.products) {
            baseCost += +product.count * +product.price.base_cost;
            discount += +product.count * +product.price.discount;
        }
        const template = cartPageTemplate({
            productsList: this.presenter.products,
            cartStyles: cartStyles,
            cartSize: this.presenter.products.length,
            baseCost: baseCost,
            discount: discount,
            totalCost: baseCost - discount,

        });
        this.cache = new DOMParser().parseFromString(template, 'text/html').getElementById('products-list-block');
        this.parent.appendChild(this.cache);


        for (const product of document.getElementsByClassName(cartStyles.productMenuText)) {
            product.addEventListener('click', (evt) => {
                evt.preventDefault();
                if (!product.title) {
                    return;
                }
                Bus.globalBus.emit(Events.CartRemoveProduct, product.title);
            });
        }

        for (const amountButton of document.getElementsByClassName(cartStyles.countButton)) {
            if (amountButton.innerHTML === '+') {
                amountButton.addEventListener('click', (evt) => {
                    evt.preventDefault();
                    const amount = +document.querySelectorAll(
                        `span.${cartStyles.count}[title='${amountButton.title}']`)[0].innerHTML;
                    Bus.globalBus.emit(Events.CartAddProduct, amountButton.title, amount + 1);
                    this.show();
                });
            }
            if (amountButton.innerHTML === '-') {
                amountButton.addEventListener('click', (evt) => {
                    evt.preventDefault();
                    const amount = +document.querySelectorAll(
                        `span.${cartStyles.count}[title='${amountButton.title}']`)[0].innerHTML;
                    Bus.globalBus.emit(Events.CartAddProduct, amountButton.title, amount - 1);
                    this.show();
                });
            }
        }
    };
}
