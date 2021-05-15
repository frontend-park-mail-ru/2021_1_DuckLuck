import {BaseView} from '../BaseView.js';
import {Img} from '../Common/Img/Img.js';
import productPageTemplate from './ProductView.hbs';
import reviewsTemplate from './ProductReviews.hbs';
import {fileServerHost, staticServerHost} from '../../utils/urls/urls.js';
import Events from '../../utils/bus/events';
import productStyles from './ProductView.scss';
import reviewStyles from './ProductReview.scss';
import buttonStyles from './../Common/Button/Button.scss';
import textStyles from './../Common/TextArea/TextArea.scss';
import imgStyles from './../Common/Img/Img.scss';
import linkStyles from './../Common/Link/Link.scss';
import decorators from '../decorators.scss';
import {Bus} from '../../utils/bus/bus';
import Router from '../../utils/router/Router';
import {Pagination} from '../Common/Pagination/Pagination';


/**
 * @class ProductView
 * @extends BaseView
 * @classdesc Class for Product page
 */
export class ProductView extends BaseView {
    /**
     * @param {Object} URLParams
     */
    show = (URLParams = {}) => {
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
            reviewStyles: reviewStyles,
            buttonStyles: buttonStyles,
            textStyles: textStyles,
            imgStyles: imgStyles,
            linkStyles: linkStyles,
            decorators: decorators,
            category_path: this.presenter.item.category_path,
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

        const mainImage = this.cache.getElementsByClassName(imgStyles.productMain)[0];
        Array.from(this.cache.getElementsByClassName(imgStyles.productCommon)).forEach((image) => {
            image.addEventListener('click', () => {
                mainImage.setAttribute('src', image.getAttribute('src'));
            });
        });

        Array.from(this.cache.getElementsByClassName(linkStyles.link)).forEach((category) => {
            category.addEventListener('click', () => {
                Router.open(`/items/${category.getAttribute('category_id')}`);
            });
        });


        const button = document.getElementsByClassName(buttonStyles.notInCartProduct)[0];
        button.addEventListener('click', () => {
            Bus.globalBus.emit(Events.CartAddProduct, this.IDs['productID'], 1);
        });

        const reviewButton = this.cache.getElementsByClassName(buttonStyles.review)[0];
        reviewButton.addEventListener('click', () => {
            Bus.globalBus.emit(Events.ChangeReviewProductId, this.IDs['productID']);
            Router.open('/review');
        });
        Bus.globalBus.emit(Events.CartGetProductID);
        Bus.globalBus.emit(Events.GetProductReviews, +this.IDs['productID'], 1,
            this.presenter.sortKey,
            this.presenter.sortDirection);
    }

    setProductAdded = () => {
        if (!this.cache) {
            return;
        }
        const button = this.cache.getElementsByClassName(buttonStyles.notInCartProduct)[0];
        if (!button) {
            return;
        }
        const newButton = button.cloneNode(true);
        button.replaceWith(newButton);

        newButton.className = buttonStyles.inCartProduct;
        newButton.getElementsByTagName('span')[0].innerHTML = 'В корзине';
        newButton.addEventListener('click', () => {
            Bus.globalBus.emit(Events.CartRemoveProduct, this.IDs['productID']);
        });
    }

    setProductNotAdded = () => {
        const button = document.getElementsByClassName(buttonStyles.inCartProduct)[0];
        if (!button) {
            return;
        }
        const newButton = button.cloneNode(true);
        button.replaceWith(newButton);

        newButton.getElementsByTagName('span')[0].innerHTML = 'В корзину';
        newButton.className = buttonStyles.notInCartProduct;
        newButton.addEventListener('click', () => {
            Bus.globalBus.emit(Events.CartAddProduct, this.IDs['productID'], 1);
        });
    }


    /**
     * @param {Array} reviews
     * @param {Object} paginationInfo
     */
    renderProductsReview = (reviews, paginationInfo) => {
        const pagination = new Pagination(paginationInfo, true).getHtmlString();
        document.getElementById('review-pagination').innerHTML = pagination;

        reviews.forEach((review) => {
            review.date_added = review.date_added.slice(0, 10);
            review.firstChar = review.user_name[0];
            if (review.user_avatar) {
                review.avatar = `${staticServerHost}/${review.user_avatar}`;
            }
        });

        if (this.cache.getElementsByClassName(reviewStyles.block)[0]) {
            this.cache.getElementsByClassName(reviewStyles.block)[0].innerHTML +=
                reviewsTemplate({
                    reviewsList: reviews,
                    productStyles: productStyles,
                    reviewStyles: reviewStyles,
                    imgStyles: imgStyles,
                });
        } else {
            this.cache.getElementsByClassName(productStyles.reviewList)[0].innerHTML = reviewsTemplate({
                reviewsList: reviews,
                pagination: pagination,
                productStyles: productStyles,
                reviewStyles: reviewStyles,
                imgStyles: imgStyles,
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
