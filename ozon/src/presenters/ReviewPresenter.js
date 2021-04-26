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
        this.model.address = document.getElementsByName('address')[0].value.trim();
        const email = document.getElementsByName('email')[0].value.trim();
        const first_name = document.getElementsByName('firstName')[0].value.trim();
        const last_name = document.getElementsByName('lastName')[0].value.trim();

        this.model.recipient = {first_name, last_name, email};
        this.model.sendOrder();
    }
}

export default ReviewPresenter;
