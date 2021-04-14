import {BaseView} from '../BaseView.js';
import cartPageTemplate from './CartView.hbs';
import {Bus} from '../../utils/bus/bus';
import Events from '../../utils/bus/events';
import cartStyles from './CartView.css';
import Router from '../../utils/router/Router';

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
            baseCost += Math.floor(+product.count * Math.floor(+product.price.base_cost));
            discount += +product.count * Math.floor(Math.floor(+product.price.base_cost) *
                                                   (+product.price.discount * 0.01));
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

        for (const elemList of document.getElementsByClassName(cartStyles.productsListElem)) {
            const itemId = Number(elemList.getAttribute('product_id'));

            elemList.getElementsByClassName(cartStyles.incButton)[0].addEventListener('click', (evt) => {
                evt.preventDefault();
                const count = +elemList.getElementsByClassName(cartStyles.count)[0].textContent;
                if (count <= 1) {
                    return;
                }
                Bus.globalBus.emit(Events.CartProductChange, {
                    id: itemId,
                    count: count - 1,
                });
                if (count > 0) {
                    this.changeContent(itemId, count - 1);
                }
            });

            elemList.getElementsByClassName(cartStyles.decButton)[0].addEventListener('click', (evt) => {
                evt.preventDefault();
                const count = +elemList.getElementsByClassName(cartStyles.count)[0].textContent;
                Bus.globalBus.emit(Events.CartProductChange, {
                    id: itemId,
                    count: count + 1,
                });
                this.changeContent(itemId, count + 1);
            });
        }

        document.getElementsByClassName(cartStyles.orderButtonWrapper)[0].addEventListener('click', (evt) => {
            evt.preventDefault();
            Router.open('/order');
        });
    };

    /**
     *
     * @param {number} changedID
     * @param {number} newCount
     */
    changeContent = (changedID, newCount) => {
        let baseCost = 0;
        let discount = 0;
        for (const product of this.presenter.products) {
            baseCost += Math.floor(+product.count * Math.floor(+product.price.base_cost));
            discount += +product.count * Math.floor(Math.floor(+product.price.base_cost) *
                                                   (+product.price.discount * 0.01));
        }

        document.getElementsByClassName(cartStyles.orderInfoPrice)[0].innerHTML =
            baseCost.toString() + '₽';
        document.getElementsByClassName(cartStyles.orderInfoDiscount)[0].innerHTML =
            '- ' + discount.toString() + ' ₽';
        document.getElementsByClassName(cartStyles.totalPriceText)[0].innerHTML =
            (baseCost - discount).toString() + ' ₽';

        for (const elemList of document.getElementsByClassName(cartStyles.productsListElem)) {
            if (+elemList.getAttribute('product_id') === changedID) {
                if (newCount === 0) {
                    elemList.remove();
                }
                elemList.getElementsByClassName(cartStyles.count)[0].textContent = newCount;
            }
        }
    }
}
