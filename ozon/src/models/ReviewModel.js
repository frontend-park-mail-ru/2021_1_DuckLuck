import {AjaxModule} from '../modules/Ajax/Ajax';
import {serverApiPath, urls} from '../utils/urls/urls';
import BaseModel from './BaseModel';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';
import HTTPResponses from '../utils/http-responses/httpResponses';
import Router from '../utils/router/Router';

/**
 * @description Model for Review in MVP Arch
 */
class ReviewModel extends BaseModel {
    #productId
    #rating
    #advantages
    #disadvantages
    #comment
    #isPublic

    /**
     * @return {Number} id of product
     */
    get productId() {
        return this.#productId;
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
     * @param {Number} id of product
     */
    set productId(id) {
        this.#productId = id;
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
     * @description Loads all information about review via AJAX
     */
    loadReview = () => {
        // TODO: проверка на то, что пользователь может оставлять отзыв к данному товару
        this.bus.emit(Events.ReviewLoaded, Responses.Success);
    }

    /**
     * @description Sends review form to backend
     */
    sendReview = () => {
        AjaxModule.postUsingFetch({
            url: serverApiPath + urls.review,
            body: {
                product_id: this.#productId,
                rating: this.#rating,
                advantages: this.#advantages,
                disadvantages: this.#disadvantages,
                comment: this.#comment,
                isPublic: this.#isPublic,
            },
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
