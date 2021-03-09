import {Img} from '../Img/Img';
import {ListOfProductsItem} from './ListOfProductsItem/ListOfProductsItem';
import ListOFProductsItemTemplate from './ListOFProducts.hbs';

/**
 * @class ListOfProducts
 * @classdesc This class is using for construct html via templates. One of the common views
 */
export class ListOfProducts {
    /**
     *
     * @param {Object[]} items array of items to present on page
     */
    constructor(items) {
        this.items = [];
        items.forEach((item) => {
            this.items.push(new ListOfProductsItem({
                itemImage: new Img({src: item['src']}),
                itemName: item['name'],
                itemRating: item['rating'],
                itemPrice: item['price'],
            }));
        });
    };

    /**
     *
     * @return {string} generated HTML after templating
     */
    getHtmlString = () => {
        const itemsTemplates = [];
        this.items.forEach((item) => {
            itemsTemplates.push(item.getHtmlString());
        });

        return ListOFProductsItemTemplate({items: itemsTemplates});
    };
}
