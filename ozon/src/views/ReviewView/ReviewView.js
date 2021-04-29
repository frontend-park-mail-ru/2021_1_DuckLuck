import {BaseView} from '../BaseView.js';
import Events from '../../utils/bus/events';
import reviewTemplate from './ReviewView.hbs';
import {Input} from '../Common/Input/Input';
import reviewStyles from './ReviewView.css';
import {staticServerHost} from '../../utils/urls/urls';
import Router from '../../utils/router/Router';

/**
 * @class ReviewView
 * @extends BaseView
 * @classdesc Class for showing review
 */
export class ReviewView extends BaseView {
    show = () => {
        this.bus.emit(Events.ReviewLoad);
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
        });
        this.cache = new DOMParser().parseFromString(template, 'text/html').getElementById('review-block');
        this.parent.appendChild(this.cache);

        const emptyStarLink = staticServerHost + '/svg/empty_star.svg';
        const starLink = staticServerHost + '/svg/star.svg';
        const stars = Array.from(this.cache.getElementsByClassName(reviewStyles.stars)[0].children);
        stars.forEach((star) => {
            star.addEventListener('mouseover', () => {
                const currentStarValue = parseInt(star.getAttribute('value'));
                this.presenter.rating = currentStarValue + 1;
                let i = 0;
                while (i < 5 && parseInt(stars[i].getAttribute('value')) <= currentStarValue) {
                    stars[i].setAttribute('src', starLink);
                    i++;
                }
                while (i < 5) {
                    stars[i].setAttribute('src', emptyStarLink);
                    i++;
                }
            });
        });

        const submitButton = this.cache.getElementsByClassName(reviewStyles.submitButton)[0];
        submitButton.addEventListener('click', () => {
            this.presenter.sendReview();
            Router.open('/');
        });

        const isPublic = document.getElementsByName('isPublic')[0];
        isPublic.addEventListener('change', () => {
            this.presenter.isPublic = !this.presenter.isPublic;
        });
    };
}
