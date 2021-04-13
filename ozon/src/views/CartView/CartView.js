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
        const template = cartPageTemplate({
            productsList: this.presenter.products,
            cartStyles: cartStyles,
        });
        this.cache = new DOMParser().parseFromString(template, 'text/html').getElementById('products-list-block');
        this.parent.appendChild(this.cache);


        for (const product of document.getElementsByClassName(cartStyles.productsList)) {
            product.addEventListener('click', (evt) => {
                evt.preventDefault();
                Bus.globalBus.emit(Events.CartRemoveProduct, product.id);
            });
        }
    };
}
