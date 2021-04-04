import {BaseView} from '../BaseView.js';
import {Img} from '../Common/Img/Img.js';
import {Rating} from '../Common/Rating/Rating.js';
import productPageTemplate from './ProductView.hbs';
import {fileServerHost} from '../../utils/urls/urls.js';
import Events from '../../utils/bus/events';

/**
 * @class ProductView
 * @extends BaseView
 * @classdesc Class for Product page
 */
export class ProductView extends BaseView {
    show = () => {
        this.bus.emit(Events.ProductLoad, this.ID);
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
            description: this.presenter.item['description'],
        });
        this.cache = new DOMParser().parseFromString(template, 'text/html').getElementById('item-page-container');
        this.parent.appendChild(this.cache);
    }
}
