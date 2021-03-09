import ListOFProductsItemTemplate from "./ListOFProductsItem.hbs"

export class ListOfProductsItem {
    constructor({ itemImage, itemName = '', itemRating = 0,
                    itemPrice= {discountPrice: '', base: '', discount: ''}, itemId=0} = {}) {
        this.itemImage = itemImage;
        this.itemName = itemName;
        this.itemRating = itemRating;
        this.itemPrice = itemPrice;
        this.itemId = itemId;
    }

    getHtmlString = () => {
        return ListOFProductsItemTemplate({
            itemId: this.itemId,
            itemImage: this.itemImage,
            itemName: this.itemName,
            itemRating: this.itemRating,
            itemPrice: this.itemPrice,
        });
    }
}
