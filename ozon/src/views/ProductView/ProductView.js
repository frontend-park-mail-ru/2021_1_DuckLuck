import {BaseView} from '../BaseView.js';
import {Img} from '../Common/Img/Img.js';
import {Rating} from '../Common/Rating/Rating.js';
import productPageTemplate from './ProductView.hbs';
import {fileServerHost} from '../../utils/urls/urls.js';
import Events from '../../utils/bus/events';
import {Bus} from '../../utils/bus/bus';

/**
 * @class ProductView
 * @extends BaseView
 * @classdesc Class for Product page
 */
export class ProductView extends BaseView {
    show = () => {
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
            rating: new Rating().getHtmlString({
                ratingObject: 'item',
                ratingValue: this.presenter.item['rating'],
            }),
            images: images,
            description: this.presenter.item['description']['Category'],
        });
        this.cache = new DOMParser().parseFromString(template, 'text/html').getElementById('item-page-container');
        this.parent.appendChild(this.cache);

        document.getElementsByClassName('button_inc')[0].addEventListener('click', (evt) => {
            evt.preventDefault();
            document.getElementsByClassName('item-count-block__item-count')[0].innerHTML =
            (+document.getElementsByClassName('item-count-block__item-count')[0].innerHTML + 1).toString();
        });

        document.getElementsByClassName('button_dec')[0].addEventListener('click', (evt) => {
            evt.preventDefault();
            const amount = +document.getElementsByClassName('item-count-block__item-count')[0].innerHTML;
            if (amount <= 0) {
                return;
            }
            document.getElementsByClassName('item-count-block__item-count')[0].innerHTML = (amount - 1).toString();
        });

        document.getElementsByClassName('button_add-to-cart')[0].addEventListener('click', (evt) => {
            evt.preventDefault();
            const count = document.getElementsByClassName('item-count-block__item-count')[0].innerHTML;
            Bus.globalBus.emit(Events.CartAddProduct, this.ID, count);
        });
    }
}
