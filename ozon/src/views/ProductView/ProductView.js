import {BaseView} from '../BaseView.js';
import {Img} from '../Common/Img/Img.js';
import productPageTemplate from './ProductView.hbs';
import {fileServerHost} from '../../utils/urls/urls.js';
import Events from '../../utils/bus/events';
import productStyles from './ProductView.css';
import decorators from './../decorators.css';
import {Bus} from '../../utils/bus/bus';
import imagesStyles from './../Common/Img/Img.css';
import buttons from '../Common/Button/Button.css';


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
            buttons: buttons,
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

        let button = document.getElementsByClassName(buttons.mainColor)[0];
        if (!button) {
            button = document.getElementsByClassName(buttons.orderColor)[0];
        }

        button.addEventListener('click', (evt) => {
            evt.preventDefault();
            Bus.globalBus.emit(Events.CartAddProduct, this.IDs['productID'], 1);
            button.classList.remove(buttons.mainColor);
            button.classList.add(buttons.orderColor);
            button.getElementsByTagName('span')[0].innerHTML = 'Добавить +1';
        });

        Bus.globalBus.emit(Events.CartGetProductID);
    }

    setButtonInCart = () => {
        const button = document.getElementsByClassName(buttons.mainColor)[0];
        if (!button) {
            return;
        }
        button.classList.remove(buttons.mainColor);
        button.classList.add(buttons.orderColor);
        button.getElementsByTagName('span')[0].innerHTML = 'Добавить +1';
    }
}
