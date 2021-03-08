import {BasePage} from "../BasePage.js";
import {Img} from "../Common/Img/Img.js";
import {Rating} from "../Common/Rating/Rating.js";
import ProductPageTemplate from "./ProductPage.hbs"

export class ProductPage extends BasePage {
    constructor(parent) {
        super(parent);
    }

    render = (item) => {
        const images = [];
        item['images'].forEach((img) => {
            images.push(new Img({
                src: img['src'],
            }))
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
