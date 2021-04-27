import BasePresenter from './BasePresenter.js';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';
import Router from '../utils/router/Router';

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
    }

    /**
     * @return {Number} id of product
     */
    get productId() {
        return this.model.productId;
    }

    /**
     * @return {Number} rating
     */
    get rating() {
        return this.mode.rating;
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
     * @param {Number} id of product
     */
    set productId(id) {
        this.model.productId = id;
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
}

export default ReviewPresenter;
