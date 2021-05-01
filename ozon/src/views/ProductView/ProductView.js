import {BaseView} from '../BaseView.js';
import {Img} from '../Common/Img/Img.js';
import productPageTemplate from './ProductView.hbs';
import reviewsTemplate from './ProductReviews.hbs';
import {fileServerHost} from '../../utils/urls/urls.js';
import Events from '../../utils/bus/events';
import productStyles from './ProductView.css';
import decorators from './../decorators.css';
import {Bus} from '../../utils/bus/bus';
import imagesStyles from './../Common/Img/Img.css';
import Router from '../../utils/router/Router';
import {Pagination} from '../Common/Pagination/Pagination';


/**
 * @class ProductView
 * @extends BaseView
 * @classdesc Class for Product page
 */
export class ProductView extends BaseView {
    show = () => {
        if (!this.IDs) {
            this.IDs = {};
        }
        if (!this.IDs['productID']) {
            this.IDs['productID'] = 1;
        }

        this.presenter.sortKey = 'date';
        this.presenter.sortDirection = 'DESC';
        this.bus.emit(Events.ProductLoad, this.IDs['productID']);
    }

    /**
     *
     */
    render = () => {
        this.parent.innerHTML = '';
        const images = [];
        this.presenter.item['images'].forEach((src) => {
            images.push(new Img({
                src: fileServerHost + src,
            }));
        });

        const template = productPageTemplate({
            name: this.presenter.item['name'],
            price: this.presenter.item['price'],
            rating: this.presenter.item['rating'],
            images: images,
            description: this.presenter.item['description']['descriptionText'],
            category: this.presenter.item['description']['category'],
            productStyles: productStyles,
            imagesStyles: imagesStyles,
            decorators: decorators,
            select: [
                {
                    key: 'date',
                    direction: 'DESC',
                    name: 'Сначала новые',
                },
                {
                    key: 'date',
                    direction: 'ASC',
                    name: 'Сначала старые',
                },
            ],
            sort: {
                key: this.presenter.sortKey,
                direction: this.presenter.sortDirection,
            },
        });
        this.cache = new DOMParser().parseFromString(template, 'text/html')
            .getElementsByClassName(productStyles.block)[0];
        this.parent.appendChild(this.cache);

        const select = document.getElementsByTagName('select')[0];
        select.addEventListener('change', () => {
            const selected = select.selectedOptions[0];
            const sortKey = selected.getAttribute('key');
            const sortDirection = selected.getAttribute('direction');
            this.presenter.sortKey = sortKey;
            this.presenter.sortDirection = sortDirection;
            this.cache.getElementsByClassName(productStyles.reviewList)[0].innerHTML = '';
            Bus.globalBus.emit(Events.GetProductReviews, +this.IDs['productID'], 1,
                this.presenter.sortKey,
                this.presenter.sortDirection);
        });

        const mainImage = this.cache.getElementsByClassName(imagesStyles.imgXXL)[0];
        Array.from(this.cache.getElementsByClassName(imagesStyles.imgXL)).forEach((image) => {
            image.addEventListener('click', () => {
                mainImage.setAttribute('src', image.getAttribute('src'));
            });
        });

        let button = document.getElementsByClassName(productStyles.notInCartButton)[0];
        if (!button) {
            button = document.getElementsByClassName(productStyles.inCartButton)[0];
        }

        button.addEventListener('click', (evt) => {
            evt.preventDefault();
            Bus.globalBus.emit(Events.CartAddProduct, this.IDs['productID'], 1);
            button.className = productStyles.inCartButton;
            button.getElementsByTagName('span')[0].innerHTML = 'Добавить +1';
        });

        const reviewButton = this.cache.getElementsByClassName(productStyles.reviewButton)[0];
        reviewButton.addEventListener('click', () => {
            Bus.globalBus.emit(Events.ChangeReviewProductId, this.IDs['productID']);
            Router.open('/review');
        });
        Bus.globalBus.emit(Events.CartGetProductID);
        Bus.globalBus.emit(Events.GetProductReviews, +this.IDs['productID'], 1,
            this.presenter.sortKey,
            this.presenter.sortDirection);
    }

    setButtonInCart = () => {
        const button = document.getElementsByClassName(productStyles.notInCartButton)[0];
        if (!button) {
            return;
        }
        button.className = productStyles.inCartButton;
        button.getElementsByTagName('span')[0].innerHTML = 'Добавить +1';
    }


    /**
     * @param {Array} reviews
     * @param {Object} paginationInfo
     */
    renderProductsReview = (reviews, paginationInfo) => {
        const pagination = new Pagination(paginationInfo, true).getHtmlString();
        document.getElementById('review-pagination').innerHTML = pagination;

        if (this.cache.getElementsByClassName(productStyles.reviewBlock)[0]) {
            this.cache.getElementsByClassName(productStyles.reviewBlock)[0].innerHTML +=
                reviewsTemplate({
                    reviewsList: reviews,
                    productStyles: productStyles,
                });
        } else {
            this.cache.getElementsByClassName(productStyles.reviewList)[0].innerHTML = reviewsTemplate({
                reviewsList: reviews,
                pagination: pagination,
                productStyles: productStyles,
            });
        }
        if (paginationInfo.pagesCount === paginationInfo.currentPage) {
            return;
        }
        document.getElementById('review-pagination').getElementsByTagName('button')[0]
            .addEventListener('click', () => {
                Bus.globalBus.emit(Events.GetProductReviews, +this.IDs['productID'], paginationInfo.currentPage + 1,
                    this.presenter.sortKey,
                    this.presenter.sortDirection);
            });
    }
}
