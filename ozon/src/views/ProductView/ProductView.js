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
        if (ProductView.__instance) {
            return ProductView.__instance;
        }

        super(parent);
        this._itemID = 1;
        ProductView.__instance = this;
    }


    /**
     *
     * @param {number} itemID
     */
    set itemID(itemID) {
        this._itemID = itemID;
    }

    show = () => {
        this._presenter.loadProduct(this._itemID);
    }

    /**
     * @param {Object} item product to render
     */
    render = () => {
        this.el.innerHTML = '';
        const images = [];
        this._presenter.item['images'].forEach((src) => {
            images.push(new Img({
                src: fileServerHost + src,
            }));
        });
        const template = productPageTemplate({
            name: this._presenter.item['name'],
            price: this._presenter.item['price'],
            rating: new Rating().getHtmlString({
                ratingObject: 'item',
                ratingValue: this._presenter.item['rating'],
            }),
            images: images,
            description: this._presenter.item['description'],
        });
        this.cache = new DOMParser().parseFromString(template, 'text/html').getElementById('item-page-container');
        this.el.appendChild(this.cache);
    }
}
