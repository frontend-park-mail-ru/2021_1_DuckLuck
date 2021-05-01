import BasePresenter from './BasePresenter.js';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';
import Router from '../utils/router/Router';
import {Bus} from '../utils/bus/bus';

/**
 * @description Presenter for Review View and Model
 */
class ReviewPresenter extends BasePresenter {
    /**
     * @param {HTMLElement} application html of application
     * @param {Class} View Class of view object
     * @param {Class} Model Class of model object
     */
    constructor(application, View, Model) {
        super(application, View, Model);
        this.bus.on(Events.ReviewLoad, this.loadReview);
        this.bus.on(Events.ReviewLoaded, this.reviewLoadedReaction);
        this.bus.on(Events.SendOrder, this.sendReview);

        Bus.globalBus.on(Events.ChangeReviewProductId, this.changeProductById);
        Bus.globalBus.on(Events.GetProductReviews, this.getProductReviews);
        Bus.globalBus.on(Events.GetProductReviewsReaction, this.getProductReviewsReaction);
    }

    /**
     * @return {Object} id of product
     */
    get product() {
        return this.model.product;
    }

    /**
     * @return {Number} rating
     */
    get rating() {
        return this.model.rating;
    }

    /**
     * @return {string} advantages
     */
    get advantages() {
        return this.model.advantages;
    }

    /**
     * @return {string} disadvantages
     */
    get disadvantages() {
        return this.model.disadvantages;
    }

    /**
     * @return {string} comment
     */
    get comment() {
        return this.model.comment;
    }

    /**
     * @return {boolean} isPublic
     */
    get isPublic() {
        return this.model.isPublic;
    }

    /**
     * @return {String} userName
     */
    get userName() {
        return this.model.userName;
    }

    /**
     * @param {Object} product
     */
    set product(product) {
        this.model.product = product;
    }

    /**
     * @param {Number} rating
     */
    set rating(rating) {
        this.model.rating = rating;
    }

    /**
     * @param {string} advantages
     */
    set advantages(advantages) {
        this.model.advantages = advantages;
    }

    /**
     * @param {string} disadvantages
     */
    set disadvantages(disadvantages) {
        this.model.disadvantages = disadvantages;
    }

    /**
     * @param {string} comment
     */
    set comment(comment) {
        this.model.comment = comment;
    }

    /**
     * @param {boolean} isPublic
     */
    set isPublic(isPublic) {
        this.model.isPublic = isPublic;
    }

    /**
     * @param {String} userName
     */
    set userName(userName) {
        this.model.userName = userName;
    }


    /**
     * @param {Number} productId
     */
    changeProductById = (productId) => {
        this.model.product = {id: productId};
    }

    /**
     * @description Loads all information about review from model
     */
    loadReview = () => {
        this.model.loadReview();
    }

    /**
     * @param {string} result
     * @description Reaction on view loading
     */
    reviewLoadedReaction = (result) => {
        if (result === Responses.Success) {
            this.view.render();
            this.view.cache.hidden = false;
        } else {
            console.error('Cant load review');
            Router.open('/items', {replaceState: true});
        }
    }

    /**
     * @description Sends view form to model
     */
    sendReview = () => {
        this.model.advantages = document.getElementsByName('advantages')[0].value.trim();
        this.model.disadvantages = document.getElementsByName('disadvantages')[0].value.trim();
        this.model.comment = document.getElementsByName('comment')[0].value.trim();
        this.model.sendReview();
    }

    /**
     * @param {number} productID
     * @param {number} page
     * @param {string} sortKey
     * @param {string} sortDirection
     */
    getProductReviews = (productID, page, sortKey, sortDirection) => {
        this.model.getProductReviews(productID, page, sortKey, sortDirection);
    }

    /**
     * @param {string} result
     */
    getProductReviewsReaction = (result) => {
        switch (result) {
        case Responses.Success: {
            Bus.globalBus.emit(Events.RenderProductReviews, this.model.reviews, this.model.paginationInfo);
            break;
        }
        default: {
            console.error(result);
            break;
        }
        }
    }
}

export default ReviewPresenter;
