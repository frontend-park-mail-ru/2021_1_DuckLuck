import {Img} from "../Img/Img"
import {ListOfProductsItem} from "./ListOfProductsItem/ListOfProductsItem";
import ListOFProductsItemTemplate from "./ListOFProducts.hbs"
import {FileServerHost} from "../../../utils/urls/urls.js";

export class ListOfProducts {
    constructor(items) {
        this.items = [];
        items.forEach((item) => {
            const base = item['price']['base_cost'];
            const discount = item['price']['discount'];
            const discountPrice = base * discount*0.01;
           this.items.push(new ListOfProductsItem({
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

    getHtmlString = () => {
        const itemsTemplates = [];
        this.items.forEach((item) => {
            itemsTemplates.push(item.getHtmlString());
        });

        return ListOFProductsItemTemplate({items: itemsTemplates});
    };
}
