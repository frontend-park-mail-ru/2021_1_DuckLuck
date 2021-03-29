import {BaseView} from '../BaseView.js';
import {Img} from '../Common/Img/Img.js';
import {Rating} from '../Common/Rating/Rating.js';
import productPageTemplate from './ProductView.hbs';
import {fileServerHost} from '../../utils/urls/urls.js';


/**
 * @class ProductView
 * @extends BaseView
 * @classdesc Class for Product page
 */
export class ProductView extends BaseView {
    /**
     * @param {Object} parent parents object
     */
    constructor(parent) {
        super(parent);
    }


    set item(item) {
        this._item = item;
    }

    /**
     * @param {Object} item product to render
     * @return {HTMLElement} rendered element
     */
    render = () => {
        this.el.innerHTML = '';
        const images = [];
        this._item['images'].forEach((src) => {
            images.push(new Img({
                src: fileServerHost + src,
            }));
        });
        const template = productPageTemplate({
            name: this._item['name'],
            price: this._item['price'],
            rating: new Rating().getHtmlString({
                ratingObject: 'item',
                ratingValue: this._item['rating'],
            }),
            images: images,
            description: this._item['description'],
        });
        this.cache = new DOMParser().parseFromString(template, 'text/html').getElementById('item-page-container');
        this.el.appendChild(this.cache);
    }
}
