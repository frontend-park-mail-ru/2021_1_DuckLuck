import ListOFProductsItemTemplate from './ListOFProductsItem.hbs';

export class ListOfProductsItem {
    constructor({itemImage, itemName = '', itemRating = 0,
        itemPrice= {discountPrice: '', base: '', discount: ''}} = {}) {
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
