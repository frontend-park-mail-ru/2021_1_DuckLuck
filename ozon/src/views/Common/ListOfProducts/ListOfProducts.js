import {Img} from "../Img/Img"
import {ListOfProductsItem} from "./ListOfProductsItem/ListOfProductsItem";
import ListOFProductsItemTemplate from "./ListOFProducts.hbs"
import {FileServerHost} from "../../../utils/urls/urls.js";

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
            const base = item['price']['base_cost'];
            const discount = item['price']['discount'];
            const discountPrice = base * discount*0.01;
           this.items.push(new ListOfProductsItem({
               itemId: item['id'],
               itemImage: new Img({src: FileServerHost + item['preview_image']}),
               itemName: item['title'],
               itemRating: item['rating'],
               itemPrice: {
                   base: base,
                   discount: discount,
                   discountPrice: discountPrice,
               },
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
