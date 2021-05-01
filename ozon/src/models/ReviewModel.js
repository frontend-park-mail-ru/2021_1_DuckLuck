import {AjaxModule} from '../modules/Ajax/Ajax';
import {serverApiPath, staticServerHost, urls} from '../utils/urls/urls';
import BaseModel from './BaseModel';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';
import HTTPResponses from '../utils/http-responses/httpResponses';
import Router from '../utils/router/Router';

/**
 * @description Model for Review in MVP Arch
 */
class ReviewModel extends BaseModel {
    #product
    #rating
    #advantages
    #disadvantages
    #comment
    #isPublic
    #userName

    /**
     * @return {Object} product
     */
    get product() {
        return this.#product;
    }

    /**
     * @return {Number} rating
     */
    get rating() {
        return this.#rating;
    }

    /**
     * @return {string} advantages
     */
    get advantages() {
        return this.#advantages;
    }

    /**
     * @return {string} disadvantages
     */
    get disadvantages() {
        return this.#disadvantages;
    }

    /**
     * @return {string} comment
     */
    get comment() {
        return this.#comment;
    }

    /**
     * @return {boolean} isPublic
     */
    get isPublic() {
        return this.#isPublic;
    }

    /**
     * @return {String} userName
     */
    get userName() {
        return this.#userName;
    }

    /**
     * @param {Object} product
     */
    set product(product) {
        this.#product = product;
    }

    /**
     * @param {Number} rating
     */
    set rating(rating) {
        this.#rating = rating;
    }

    /**
     * @param {string} advantages
     */
    set advantages(advantages) {
        this.#advantages = advantages;
    }

    /**
     * @param {string} disadvantages
     */
    set disadvantages(disadvantages) {
        this.#disadvantages = disadvantages;
    }

    /**
     * @param {string} comment
     */
    set comment(comment) {
        this.#comment = comment;
    }

    /**
     * @param {boolean} isPublic
     */
    set isPublic(isPublic) {
        this.#isPublic = isPublic;
    }

    /**
     * @param {String} userName
     */
    set userName(userName) {
        this.#userName = userName;
    }

    /**
     * @description Loads all information about review via AJAX
     */
    loadReview = () => {
        AjaxModule.getUsingFetch({
            url: serverApiPath + '/review/rights/product/' + this.product.id,
        }).then((response) => {
            if (response.status !== HTTPResponses.Success) {
                throw response.status;
            }
            AjaxModule.getUsingFetch({
                url: serverApiPath + urls.profileUrl,
                body: null,
            }).then((response) => {
                if (response.status !== HTTPResponses.Success) {
                    throw response.status;
                }
                return response.json();
            }).then((response) => {
                this.userName = `${response.first_name} ${response.last_name[0]}.`;
                AjaxModule.getUsingFetch({
                    url: `${serverApiPath}${urls.productUrl}/${this.product.id}`,
                }).then((response) => {
                    if (response.status !== HTTPResponses.Success) {
                        throw response.status;
                    }
                    return response.json();
                }).then((response) => {
                    this.product = {
                        id: response.id,
                        category: response.category,
                        image: `${staticServerHost}${response.images[0]}`,
                        title: response.title,
                        href: `/item/${this.product.id}`,
                    };
                    this.bus.emit(Events.ReviewLoaded, Responses.Success);
                });
            });
        }).catch(() => {
            this.bus.emit(Events.ReviewLoaded, Responses.Error);
        });
    }

    /**
     * @description Sends review form to backend
     */
    sendReview = () => {
        const body = {
                product_id: this.#product.id,
                rating: this.#rating,
                advantages: this.#advantages,
                disadvantages: this.#disadvantages,
                comment: this.#comment,
                isPublic: this.#isPublic ? this.#isPublic : true,
        };
        AjaxModule.postUsingFetch({
            url: serverApiPath + urls.review,
            body: body
        }).then((response) => {
            if (response.status !== HTTPResponses.Success) {
                throw response.status;
            }
        }).catch((err) => {
            switch (err) {
            case HTTPResponses.Offline: {
                Router.open('/offline');
                break;
            }
            default: {
                console.error('error review sending');
            }
            }
        });
    }
}

export default ReviewModel;
