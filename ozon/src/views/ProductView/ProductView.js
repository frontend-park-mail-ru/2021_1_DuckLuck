import {BaseView} from '../BaseView.js';
import {Img} from '../Common/Img/Img.js';
import productPageTemplate from './ProductView.hbs';
import {fileServerHost} from '../../utils/urls/urls.js';
import Events from '../../utils/bus/events';
import productStyles from './ProductView.scss';
import decorators from './../decorators.css';
import {Bus} from '../../utils/bus/bus';
import imagesStyles from './../Common/Img/Img.css';


/**
 * @class ProductView
 * @extends BaseView
 * @classdesc Class for Product page
 */
export class ProductView extends BaseView {
    /**
     * @param {Object} URLParams
     */
    show = (URLParams = {}) => {
        if (!this.IDs) {
            this.IDs = {};
        }
        if (!this.IDs['productID']) {
            this.IDs['productID'] = 1;
        }

        this.bus.emit(Events.ProductLoad, this.IDs['productID']);
    }

    /**
     *
     */
    render = () => {
        this.parent.innerHTML = '';
        const images = [];
        this.presenter.item['images'].forEach((src) => {
            images.push(new Img({
                src: fileServerHost + src,
            }));
        });

        const template = productPageTemplate({
            name: this.presenter.item['name'],
            price: this.presenter.item['price'],
            rating: this.presenter.item['rating'],
            images: images,
            description: this.presenter.item['description']['descriptionText'],
            category: this.presenter.item['description']['category'],
            productStyles: productStyles,
            imagesStyles: imagesStyles,
            decorators: decorators,
        });
        this.cache = new DOMParser().parseFromString(template, 'text/html')
            .getElementsByClassName(productStyles.block)[0];
        this.parent.appendChild(this.cache);

        const mainImage = this.cache.getElementsByClassName(productStyles.preview)[0];
        Array.from(this.cache.getElementsByClassName(imagesStyles.imgXL)).forEach((image) => {
            image.addEventListener('click', () => {
                mainImage.setAttribute('src', image.getAttribute('src'));
            });
        });


        const button = document.getElementsByClassName(productStyles.notInCartButton)[0];
        button.addEventListener('click', () => {
            Bus.globalBus.emit(Events.CartAddProduct, this.IDs['productID'], 1);
        });

        Bus.globalBus.emit(Events.CartGetProductID);
    }

    setProductAdded = () => {
        const button = document.getElementsByClassName(productStyles.notInCartButton)[0];
        if (!button) {
            return;
        }
        const newButton = button.cloneNode(true);
        button.replaceWith(newButton);

        newButton.className = productStyles.inCartButton;
        newButton.getElementsByTagName('span')[0].innerHTML = 'В корзине';
        newButton.addEventListener('click', () => {
            Bus.globalBus.emit(Events.CartRemoveProduct, this.IDs['productID']);
        });
    }

    setProductNotAdded = () => {
        const button = document.getElementsByClassName(productStyles.inCartButton)[0];
        if (!button) {
            return;
        }
        const newButton = button.cloneNode(true);
        button.replaceWith(newButton);

        newButton.getElementsByTagName('span')[0].innerHTML = 'В корзину';
        newButton.className = productStyles.notInCartButton;
        newButton.addEventListener('click', () => {
            Bus.globalBus.emit(Events.CartAddProduct, this.IDs['productID'], 1);
        });
    }
}
