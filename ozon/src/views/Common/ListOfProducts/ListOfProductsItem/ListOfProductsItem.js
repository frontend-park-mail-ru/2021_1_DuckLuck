import ListOFProductsItemTemplate from './ListOFProductsItem.hbs';


/**
 * @class ListOfProductsItem
 * @classdesc This class is using for construct html via templates. One of the common views
 */
export class ListOfProductsItem {
    /**
     * @param {Object} Image of a product
     * @param {string} itemName
     * @param {number} itemRating
     * @param {Object} itemPrice
     */
    constructor({itemImage, itemName = '', itemRating = 0,
        itemPrice= {discountPrice: '', base: '', discount: ''}} = {}) {
        this.itemImage = itemImage;
        this.itemName = itemName;
        this.itemRating = itemRating;
        this.itemPrice = itemPrice;
    }


    /**
     *
     * @return {string} generated HTML after templating
     */
    getHtmlString = () => {
        return ListOFProductsItemTemplate({
            itemImage: this.itemImage,
            itemName: this.itemName,
            itemRating: this.itemRating,
            itemPrice: this.itemPrice,
        });
    }
}
