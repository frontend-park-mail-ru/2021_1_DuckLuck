import listOFProductsItemTemplate from './ListOfProductsItem.hbs';
import itemStyles from './ListOfProductsItem.css';
import decorators from '../../../decorators.css';

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
    constructor({itemImage, itemInCart = false, itemName = '', itemRating = 0,
        itemPrice= {discountPrice: '', base: '', discount: ''}, itemId=0} = {}) {
        this.itemInCart = itemInCart;
        this.itemImage = itemImage;
        this.itemName = itemName;
        this.itemRating = itemRating;
        this.itemPrice = itemPrice;
        this.itemId = itemId;
    }


    /**
     *
     * @return {string} generated HTML after templating
     */
    getHtmlString = () => {
        return listOFProductsItemTemplate({
            itemInCart: this.itemInCart,
            itemId: this.itemId,
            itemImage: this.itemImage,
            itemName: this.itemName,
            itemRating: this.itemRating,
            itemPrice: this.itemPrice,
            itemStyles: itemStyles,
            decorators: decorators,
        });
    }
}
