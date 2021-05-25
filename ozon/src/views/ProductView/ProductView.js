import BaseView from '../BaseView.js';
import Img from '../Common/Img/Img.js';
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
import Bus from '../../utils/bus/bus';
import Router from '../../utils/router/Router';
import Pagination from '../Common/Pagination/Pagination';
import Slider from '../Common/Slider/Slider';
import ListOfProductsItem from '../Common/ListOfProducts/ListOfProductsItem/ListOfProductsItem';
import ListOfProductsItemStyles from '../Common/ListOfProducts/ListOfProductsItem/ListOfProductsItem.scss';


/**
 * @class ProductView
 * @extends BaseView
 * @classdesc Class for Product page
 */
class ProductView extends BaseView {
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
        this.goUp();

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
            rating: Math.ceil(this.presenter.item['rating']),
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
            Bus.globalBus.emit(Events.CartAddProduct, this.IDs['productID'], 1, Events.ProductItemAdded);
        });

        const reviewButton = this.cache.getElementsByClassName(buttonStyles.review)[0];
        if (reviewButton) {
            reviewButton.addEventListener('click', () => {
                Bus.globalBus.emit(Events.ChangeReviewProductId, this.IDs['productID']);
                Router.open('/review');
            });
        }

        Bus.globalBus.emit(Events.CartGetProductID);
        Bus.globalBus.emit(Events.GetProductReviews, +this.IDs['productID'], 1,
            this.presenter.sortKey,
            this.presenter.sortDirection);

        Bus.globalBus.emit(Events.ChangeReviewProductId, this.IDs['productID']);
        Bus.globalBus.emit(Events.ReviewRightsLoad);
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
            Bus.globalBus.emit(Events.CartRemoveProduct, this.IDs['productID'], Events.ProductItemNotAdded);
        });
    }

    setProductNotAdded = () => {
        if (!this.cache) {
            return;
        }
        const button = document.getElementsByClassName(buttonStyles.inCartProduct)[0];
        if (!button) {
            return;
        }
        const newButton = button.cloneNode(true);
        button.replaceWith(newButton);

        newButton.getElementsByTagName('span')[0].innerHTML = 'В корзину';
        newButton.className = buttonStyles.notInCartProduct;
        newButton.addEventListener('click', () => {
            Bus.globalBus.emit(Events.CartAddProduct, this.IDs['productID'], 1, Events.ProductItemAdded);
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
            review.user_name = (review.user_name !== '') ? review.user_name : 'Анонимный пользователь';
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

        const buttonPagination = document.getElementById('review-pagination').getElementsByTagName('button')[0];
        if (buttonPagination) {
            buttonPagination.addEventListener('click', () => {
                Bus.globalBus.emit(Events.GetProductReviews, +this.IDs['productID'], paginationInfo.currentPage + 1,
                    this.presenter.sortKey,
                    this.presenter.sortDirection);
            });
        }
    }

    addReviewButton = () => {
        const reviewButton = document.createElement('button');
        reviewButton.className = buttonStyles.review;
        const reviewSpan = document.createElement('span');
        reviewSpan.className = textStyles.bigButton;
        reviewSpan.innerHTML = 'Оставить отзыв';
        reviewButton.appendChild(reviewSpan);
        reviewButton.addEventListener('click', () => {
            Router.open('/review');
        });
        document.getElementsByClassName(productStyles.reviewButtonWrapper)[0].appendChild(reviewButton);
    }

    renderRecommendations = () => {
        const items = [];

        this.presenter.recommendations.forEach((item) => {
            const base = item['price']['base_cost'];
            const discount = item['price']['discount'];
            const discountPrice = Math.ceil(base * (1 - discount * 0.01));
            items.push(new ListOfProductsItem({
                itemInCart: item['inCart'],
                itemReviewsCount: item['count_reviews'],
                itemId: item['id'],
                itemImage: new Img({src: staticServerHost + item['preview_image']}),
                itemName: item['title'],
                itemRating: item['rating'],
                itemPrice: {
                    base: base,
                    discount: discount,
                    discountPrice: discountPrice,
                },
                type: 'recommendations',
            }).getHtmlString());
        });

        const slider = new Slider(items);
        const recommendationsBlock = document.getElementById('recommendations');
        recommendationsBlock.appendChild(slider.render());
        for (const itemContainer of document.getElementsByClassName(ListOfProductsItemStyles.block)) {
            const productID = parseInt(itemContainer.getAttribute('item-id'));
            itemContainer.getElementsByClassName(ListOfProductsItemStyles.infoWrapper)[0]
                .addEventListener('click', () => {
                    Bus.globalBus.emit(Events.ProductChangeID, productID);
                    Router.open(`/item/${productID}`);
                });

            let item = itemContainer.getElementsByClassName(buttonStyles.notInCartProducts)[0];
            if (item === undefined) {
                item = itemContainer.getElementsByClassName(buttonStyles.inCartProducts)[0];
            }

            item.addEventListener('click', (evt) => {
                evt.preventDefault();
                Bus.globalBus.emit(Events.CartAddProduct, productID, 1, Events.ProductsItemAdded);
            });
        }
        Bus.globalBus.emit(Events.CartGetProductsID, Events.ProductCartLoadedProductsID);
        slider.checkOverflow();
    }

    /**
     * @param {Set} productsInCart
     */
    recommendationSetAddedProducts = (productsInCart) => {
        for (const item of document.getElementsByClassName(ListOfProductsItemStyles.block)) {
            if (productsInCart.has(+item.getAttribute('item-id'))) {
                this.setButtonAdded(item.getElementsByTagName('button')[0], +item.getAttribute('item-id'));
            }
        }
    }

    /**
     * @param {number} productID
     */
    setProductAdded = (productID) => {
        const item = Array.from(document.getElementsByClassName(ListOfProductsItemStyles.block)).filter((item) => {
            return +item.getAttribute('item-id') === productID;
        })[0];
        if (item) {
            this.setButtonAdded(item.getElementsByClassName(
                ListOfProductsItemStyles.buttonsBlock)[0].getElementsByTagName('button')[0],
            productID);
        }
    }

    /**
     * @param {HTMLElement} button
     * @param {number} id
     */
    setButtonAdded = (button, id) => {
        const newButton = button.cloneNode(true);
        this.setButtonAddedStyle(newButton);
        newButton.addEventListener('click', () => {
            Bus.globalBus.emit(Events.CartRemoveProduct, id, Events.ProductsItemNotAdded);
        });
        button.replaceWith(newButton);
    }

    /**
     * @param {number} productID
     */
    setProductNotAdded = (productID) => {
        const item = Array.from(document.getElementsByClassName(ListOfProductsItemStyles.block)).filter((item) => {
            return +item.getAttribute('item-id') === +productID;
        })[0];
        if (item) {
            const button = item.getElementsByTagName('button')[0];
            const newButton = button.cloneNode(true);
            this.setButtonNotAddedStyle(newButton);
            newButton.addEventListener('click', () => {
                const id = item.getAttribute('item-id');
                Bus.globalBus.emit(Events.CartAddProduct, +item.getAttribute('item-id'), 1, Events.ProductsItemAdded);
                this.setProductAdded(+id);
            });
            button.replaceWith(newButton);
        }
    }

    /**
     * @param {HTMLElement} button
     */
    setButtonAddedStyle = (button) => {
        button.className = buttonStyles.inCartProducts;
        button.getElementsByTagName('span')[0].innerHTML = 'В корзине';
    }

    /**
     * @param {HTMLElement} button
     */
    setButtonNotAddedStyle = (button) => {
        button.className = buttonStyles.notInCartProducts;
        button.getElementsByTagName('span')[0].innerHTML = 'В корзину';
    }
}

export default ProductView;
