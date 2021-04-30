import {BaseView} from '../BaseView.js';
import {Img} from '../Common/Img/Img.js';
import productPageTemplate from './ProductView.hbs';
import {fileServerHost} from '../../utils/urls/urls.js';
import Events from '../../utils/bus/events';
import productStyles from './ProductView.css';
import decorators from './../decorators.css';
import {Bus} from '../../utils/bus/bus';
import imagesStyles from './../Common/Img/Img.css';
import Router from '../../utils/router/Router';


/**
 * @class ProductView
 * @extends BaseView
 * @classdesc Class for Product page
 */
export class ProductView extends BaseView {
    show = () => {
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
            inCart: this.presenter.item['inCart'],
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

        const mainImage = this.cache.getElementsByClassName(imagesStyles.imgXXL)[0];
        Array.from(this.cache.getElementsByClassName(imagesStyles.imgXL)).forEach((image) => {
            image.addEventListener('click', () => {
                mainImage.setAttribute('src', image.getAttribute('src'));
            });
        });

        let button = document.getElementsByClassName(productStyles.notInCartButton)[0];
        if (!button) {
            button = document.getElementsByClassName(productStyles.inCartButton)[0];
        }
        button.addEventListener('click', (evt) => {
            evt.preventDefault();
            Bus.globalBus.emit(Events.CartAddProduct, this.IDs['productID'], 1);
            button.className = productStyles.inCartButton;
            button.getElementsByTagName('span')[0].innerHTML = 'Добавить +1';
        });

        const reviewButton = this.cache.getElementsByClassName(productStyles.reviewButton)[0];
        reviewButton.addEventListener('click', () => {
            Bus.globalBus.emit(Events.ChangeReviewProductId, this.IDs['productID']);
            Router.open('/review');
        });
    }
}
