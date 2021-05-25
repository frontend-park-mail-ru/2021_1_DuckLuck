import listOFProductsItemTemplate from './ListOfProductsItem.hbs';
import itemStyles from './ListOfProductsItem.scss';
import decorators from '../../../decorators.scss';
import buttonStyles from '../../Button/Button.scss';
import imgStyles from '../../Img/Img.scss';

/**
 * @class ListOfProductsItem
 * @classdesc This class is using for construct html via templates. One of the common views
 */
class ListOfProductsItem {
    /**
     * @param {Object} Image of a product
     * @param {string} itemName
     * @param {number} itemRating
     * @param {Boolean} itemInCart
     * @param {Object} itemPrice
     * @param {Number} itemId
     * @param {Number} itemReviewsCount
     * @param {String} type
     */
    constructor({itemImage, itemInCart = false, itemName = '', itemRating = 0, itemReviewsCount = 0,
        itemPrice= {discountPrice: '', base: '', discount: ''}, itemId=0, type='products'} = {}) {
        this.itemInCart = itemInCart;
        this.itemImage = itemImage;
        this.itemName = itemName;
        this.itemRating = itemRating;
        this.itemPrice = itemPrice;
        this.itemId = itemId;
        this.itemReviewsCount = itemReviewsCount;
        this.type = type;
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
            width: this.itemRating / 5 * 100,
            itemReviewsCount: this.itemReviewsCount,
            itemPrice: this.itemPrice,
            type: this.type,
            itemStyles: itemStyles,
            decorators: decorators,
            buttonStyles: buttonStyles,
            imgStyles: imgStyles,
        });
    }
}

export default ListOfProductsItem;
