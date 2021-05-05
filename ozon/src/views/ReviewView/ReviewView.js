import {BaseView} from '../BaseView.js';
import Events from '../../utils/bus/events';
import reviewTemplate from './ReviewView.hbs';
import {Input} from '../Common/Input/Input';
import reviewStyles from './ReviewView.css';
import {staticServerHost} from '../../utils/urls/urls';
import Router from '../../utils/router/Router';
import {Bus} from '../../utils/bus/bus';

/**
 * @class ReviewView
 * @extends BaseView
 * @classdesc Class for showing review
 */
class ReviewView extends BaseView {
    show = () => {
        this.presenter.rating = 0;
        this.bus.emit(Events.ReviewRightsLoad);
    }

    render = () => {
        this.parent.innerHTML = '';
        const template = reviewTemplate({
            inputFields: [
                new Input({
                    type: 'text',
                    name: 'advantages',
                    placeholder: 'Достоинства',
                }),
                new Input({
                    type: 'text',
                    name: 'disadvantages',
                    placeholder: 'Недостатки',
                }),
                new Input({
                    type: 'text',
                    name: 'comment',
                    placeholder: 'Комментарий к отзыву',
                }),
            ],
            rating: 3,
            isPublic: new Input({
                type: 'checkbox',
                name: 'isPublic',
            }),
            styles: reviewStyles,
            product: this.presenter.product,
            userName: this.presenter.userName,
        });
        this.cache = new DOMParser().parseFromString(template, 'text/html').getElementById('review-block');
        this.parent.appendChild(this.cache);

        const emptyStarLink = staticServerHost + '/svg/empty_star.svg';
        const starLink = staticServerHost + '/svg/star.svg';
        const stars = Array.from(this.cache.getElementsByClassName(reviewStyles.stars)[0].children);

        const emptyRating = (event) => {
            if (!event.target.classList.contains(reviewStyles.stars) &&
                !event.target.classList.contains(reviewStyles.star)) {
                stars.forEach((star, i) =>
                    star.setAttribute('src', i < this.presenter.rating ? starLink : emptyStarLink),
                );
            }
        };

        this.cache.addEventListener('mouseover', emptyRating);


        stars.forEach((star) => {
            const currentStarValue = parseInt(star.getAttribute('value'));
            star.addEventListener('mouseover', () => {
                for (let i = 0; i < 5; i++) {
                    const isStar = parseInt(stars[i].getAttribute('value')) <= currentStarValue;
                    stars[i].setAttribute('src', isStar ? starLink : emptyStarLink);
                }
            });
            star.addEventListener('click', () => {
                this.presenter.rating = currentStarValue + 1;
            });
        });


        const submitButton = this.cache.getElementsByClassName(reviewStyles.submitButton)[0];
        submitButton.addEventListener('click', () => {
            this.presenter.sendReview();
            Router.open('/');
        });

        const isPublic = document.getElementsByName('isPublic')[0];
        isPublic.addEventListener('change', () => {
            this.presenter.isPublic = !isPublic.checked;
        });

        const productLink = this.cache.getElementsByClassName(reviewStyles.href)[0];
        productLink.addEventListener('click', () => {
            const productId = this.presenter.product.id;
            Bus.globalBus.emit(Events.ProductChangeID, productId);
            Router.open(`/item/${productId}`);
        });
    };
}

export default ReviewView;
