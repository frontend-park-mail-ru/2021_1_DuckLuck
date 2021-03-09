import {BasePage} from "../BasePage.js";
import {Img} from "../Common/Img/Img.js";
import {Rating} from "../Common/Rating/Rating.js";
import ProductPageTemplate from "./ProductPage.hbs"
import {FileServerHost} from "../../utils/urls/urls.js";


/**
 * @class ProductPage
 * @extends BasePage
 * @classdesc Class for Product page
 */
export class ProductPage extends BasePage {
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
                src: FileServerHost + src,
            }));
        });
        const template = ProductPageTemplate({
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
