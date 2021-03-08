import {Img} from "../Img/Img"
import {ListOfProductsItem} from "./ListOfProductsItem/ListOfProductsItem";
import ListOFProductsItemTemplate from "./ListOFProducts.hbs"

export class ListOfProducts {
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

    getHtmlString = () => {
        const itemsTemplates = [];
        this.items.forEach((item) => {
            itemsTemplates.push(item.getHtmlString());
        });

        return ListOFProductsItemTemplate({items: itemsTemplates});
    };
}
