import ListOFProductsItemTemplate from "./ListOFProductsItem.hbs"

export class ListOfProductsItem {
    constructor({ itemImage, itemName = '', itemRating = 0,
                    itemPrice= {discountPrice: '0', base: '0', discount: '0'}} = {}) {
        this.itemImage = itemImage;
        this.itemName = itemName;
        this.itemRating = itemRating;
        this.itemPrice = itemPrice;
    }

    getHtmlString = () => {
        return ListOFProductsItemTemplate({
            itemImage: this.itemImage,
            itemName: this.itemName,
            itemRating: this.itemRating,
            itemPrice: this.itemPrice,
        });
    }
}
