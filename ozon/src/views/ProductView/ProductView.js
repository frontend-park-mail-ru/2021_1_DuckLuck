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
    static #instance
    /**
     * @param {Object} parent parents object
     * @param {Number} id ID of loaded product
     */
    constructor(parent, id = 1) {
        if (ProductView.#instance) {
            ProductView.#instance._itemID = id;
            return ProductView.#instance;
        }

        super(parent);
        this.itemID = id;
        ProductView.#instance = this;
    }


    /**
     *
     * @param {number} itemID
     */
    set itemID(itemID) {
        this._itemID = itemID;
    }

    show = () => {
        this.presenter.loadProduct(this._itemID);
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
