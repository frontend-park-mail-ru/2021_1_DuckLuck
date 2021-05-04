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
        this.bus.on(Events.ReviewRightsLoad, this.loadReviewRights);
        this.bus.on(Events.ReviewRightsLoaded, this.reviewRightsLoadedReaction);
        this.bus.on(Events.SendOrder, this.sendReview);

        Bus.globalBus.on(Events.ReviewUserDataLoaded, this.reviewUserDataLoaded);
        Bus.globalBus.on(Events.ReviewProductDataLoaded, this.reviewProductDataLoaded);

        Bus.globalBus.on(Events.ChangeReviewProductId, this.changeProductById);
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
    loadReviewRights = () => {
        this.model.loadReviewRights();
    }

    /**
     * @param {string} result
     * @description Reaction on view loading
     */
    reviewRightsLoadedReaction = (result) => {
        if (result === Responses.Success) {
            this.model.userName =
                `${window.localStorage.getItem('firstName')} ${window.localStorage.getItem('lastName')}`;
            Bus.globalBus.emit(Events.ProductTransmitData, Events.ReviewProductDataLoaded);
            this.view.render();
            this.view.cache.hidden = false;
        } else {
            console.error('Cant load review');
            Router.open('/items', {replaceState: true});
        }
    }

    /**
     * @param {Object} profileData
     */
    reviewUserDataLoaded = (profileData) => {
        this.model.userName = `${profileData.firstName} ${profileData.lastName}`;
    }

    /**
     * @param {Object} productData
     */
    reviewProductDataLoaded = (productData) => {
        this.model.product = productData;
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
