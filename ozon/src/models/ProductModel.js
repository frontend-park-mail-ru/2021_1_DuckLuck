import {AjaxModule} from '../modules/Ajax/Ajax';
import {serverApiPath} from '../utils/urls/urls';
import Bus from '../bus';

/**
 * @description Model for Product in MVP Arch
 */
class ProductModel {
    /**
     * @return {Object} item
     */
    get item() {
        return this._item;
    }

    /**
     *
     * @param {Number} itemId ID of item on server
     * @description Loads item IN MODEL!
     */
    loadProduct(itemId) {
        AjaxModule.getUsingFetch({
            url: serverApiPath + `/product/${itemId}`,
        }).then((response) => {
            return response.json();
        }).then((parsedJson) => {
            const base = parsedJson['price']['base_cost'];
            const discount = parsedJson['price']['discount'];
            const discountPrice = (base * (1 - discount * 0.01)).toFixed(2);
            this._item = {
                name: parsedJson['title'],
                price: {
                    discountPrice: discountPrice,
                    base: base,
                    discount: discount,
                },
                rating: parsedJson['rating'],
                description: {
                    Category: parsedJson['category'],
                },
                images: parsedJson['images'],
            };
            Bus.emit('product-model-loaded', 'success');
        });
    }
}

export default ProductModel;
