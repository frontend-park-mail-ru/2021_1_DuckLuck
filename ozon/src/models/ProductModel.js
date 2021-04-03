import {AjaxModule} from '../modules/Ajax/Ajax';
import {serverApiPath} from '../utils/urls/urls';
import Bus from '../utils/bus/bus';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';

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
            Bus.emit(Events.ProductLoaded, Responses.Success);
        }).catch(() => {
            Bus.emit(Events.ProductLoaded, Responses.Error);
        });
    }
}

export default ProductModel;
