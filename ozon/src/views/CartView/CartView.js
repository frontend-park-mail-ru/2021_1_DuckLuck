import {BaseView} from '../BaseView.js';
import cartPageTemplate from './CartView.hbs';
import emptyCartPageTemplate from './CartViewEmpty.hbs';
import {Bus} from '../../utils/bus/bus';
import Events from '../../utils/bus/events';
import cartStyles from './CartView.scss';
import decorators from '../decorators.css';
import Router from '../../utils/router/Router';

/**
 * @class ProductsView
 * @extends BaseView
 * @classdesc Class for showing product
 */
export class CartView extends BaseView {
    /**
     * @param {Object} URLParams
     */
    show = (URLParams = {}) => {
        this.bus.emit(Events.CartLoad);
    }

    render = () => {
        this.parent.innerHTML = '';
        const price = this.presenter.price;
        let template;
        if (this.presenter.products.length) {
            template = cartPageTemplate({
                productsList: this.presenter.products,
                cartStyles: cartStyles,
                cartSize: this.presenter.products.length,
                baseCost: price.total_base_cost,
                discount: price.total_discount,
                totalCost: price.total_cost,
                decorators: decorators,
            });
        } else {
            template = emptyCartPageTemplate({
                cartStyles: cartStyles,
                decorators: decorators,
            });
        }
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
                const count = +elemList.getElementsByClassName('count')[0].textContent;
                Bus.globalBus.emit(Events.CartProductChange, {
                    id: itemId,
                    count: count - 1,
                });
                if (count > 0) {
                    this.changeContent(itemId, -1);
                }
            });

            elemList.getElementsByClassName(cartStyles.decButton)[0].addEventListener('click', (evt) => {
                evt.preventDefault();
                const count = +elemList.getElementsByClassName('count')[0].textContent;
                Bus.globalBus.emit(Events.CartProductChange, {
                    id: itemId,
                    count: count + 1,
                });
                this.changeContent(itemId, 1);
            });
        }

        for (const itemContainer of this.cache.getElementsByClassName(cartStyles.productsListElem)) {
            const productID = parseInt(itemContainer.getAttribute('product_id'));
            itemContainer.getElementsByClassName(cartStyles.image)[0]
                .addEventListener('click', () => {
                    Bus.globalBus.emit(Events.ProductChangeID, productID);
                    Router.open(`/item/${productID}`);
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
     * @param {number} diff
     */
    changeContent = (changedID, diff) => {
        const product = this.presenter.products.find((elem) => {
            return elem.id === changedID;
        });


        document.getElementsByClassName(cartStyles.orderInfoPrice)[0].innerHTML =
            (parseInt(document.getElementsByClassName(cartStyles.orderInfoPrice)[0].innerHTML) +
                diff * product.price.base_cost).toString() + '₽';
        document.getElementsByClassName(cartStyles.totalPriceText)[0].innerHTML =
            (parseInt(document.getElementsByClassName(cartStyles.totalPriceText)[0].innerHTML) +
                diff * product.price.total_cost).toString() + '₽';

        document.getElementsByClassName(cartStyles.orderInfoDiscount)[0].innerHTML =
            (parseInt(document.getElementsByClassName(cartStyles.orderInfoPrice)[0].innerHTML) -
            parseInt(document.getElementsByClassName(cartStyles.totalPriceText)[0].innerHTML)).toString() + '₽';


        const item = Array.from(document.getElementsByClassName(cartStyles.productsListElem)).find((elem) => {
            return +elem.getAttribute('product_id') === changedID;
        });
        const counter = item.getElementsByClassName('count')[0];
        counter.textContent = (+counter.textContent + diff).toString();
        if (!+counter.textContent) {
            item.remove();
            return;
        }
        item.getElementsByClassName(cartStyles.endPrice)[0].innerHTML =
            (parseInt(item.getElementsByClassName(cartStyles.endPrice)[0].innerHTML) +
                diff * product.price.total_cost).toString() + '₽';
        item.getElementsByClassName(cartStyles.oldPrice)[0].innerHTML =
            (parseInt(item.getElementsByClassName(cartStyles.oldPrice)[0].innerHTML) +
                diff * product.price.base_cost).toString() + '₽';
        item.getElementsByClassName(cartStyles.discountPrice)[0].innerHTML = 'Скидка ' +
            (parseInt(item.getElementsByClassName(cartStyles.oldPrice)[0].innerHTML) -
             parseInt(item.getElementsByClassName(cartStyles.endPrice)[0].innerHTML)).toString() + '₽';
    }
}
