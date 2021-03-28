import {BaseView} from '../BaseView.js';
import {Img} from '../Common/Img/Img.js';
import {Rating} from '../Common/Rating/Rating.js';
import productPageTemplate from './ProductPage.hbs';
import {fileServerHost} from '../../utils/urls/urls.js';


/**
 * @class ProductPage
 * @extends BaseView
 * @classdesc Class for Product page
 */
export class ProductPage extends BaseView {
    /**
     * @param {Object} parent parents object
     */
    constructor(parent) {
        super(parent);
    }

    /**
     * @param {Object} item product to render
     * @return {HTMLElement} rendered element
     */
    render = (item) => {
        const images = [];
        item['images'].forEach((src) => {
            images.push(new Img({
                src: fileServerHost + src,
            }));
        });
        const template = productPageTemplate({
            name: item['name'],
            price: item['price'],
            rating: new Rating().getHtmlString({
                ratingObject: 'item',
                ratingValue: item['rating'],
            }),
            images: images,
            description: item['description'],
        });
        return new DOMParser().parseFromString(template, 'text/html')
            .getElementById('item-page-container');
    }
}
