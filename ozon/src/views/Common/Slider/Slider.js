import sliderTemplate from './Slider.hbs';
import sliderStyles from './Slider.scss';
import buttonStyles from './../Button/Button.scss';
import decorators from '../../decorators.scss';

/**
 * @class Slider
 * @classdesc This class is using for construct html via templates. One of the common views
 */
export class Slider {
    /**
     *
     * @param {Object[]} items
     */
    constructor(items) {
        this.items = items;
        this.onScreen = [];
        this.leftHidden = [];
        this.rightHidden = [];
        this.carousel = null;
        this.content = null;
        this.contentWrapper = null;
        this.left = null;
        this.right = null;
    };

    /**
     *
     * @return {HTMLElement}
     */
    render = () => {
        const template = sliderTemplate({
            items: this.items,
            sliderStyles: sliderStyles,
            buttonStyles: buttonStyles,
            decorators: decorators,
        });
        const carousel = new DOMParser().parseFromString(template, 'text/html');
        const content = carousel.getElementsByClassName(sliderStyles.content)[0];
        const contentWrapper = carousel.getElementsByClassName(sliderStyles.contentWrapper)[0];
        const buttons = Array.from(carousel.getElementsByClassName(buttonStyles.slider));
        const right = carousel.getElementById('slider-right');
        const left = carousel.getElementById('slider-left');


        this.carousel = carousel;
        this.content = content;
        this.contentWrapper = contentWrapper;
        this.right = right;
        this.left = left;


        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                button.disabled = true;
                const buttonTimeout = parseFloat(
                    getComputedStyle(content)
                        .transitionDuration.match(/[0-9]+\.[0-9]+/)[0],
                ) * 1000;
                setTimeout(() => {
                    button.disabled = false;
                }, buttonTimeout);

                const contentWrapperBox = contentWrapper.getBoundingClientRect();
                const contentBox = content.getBoundingClientRect();

                let currentTranslate = parseInt(getComputedStyle(content).transform
                    .match(/matrix.*\((.+)\)/)[1].split(', ')[4]);

                if (button === left) {
                    currentTranslate += contentWrapperBox.width;
                } else {
                    currentTranslate -= contentWrapperBox.width;
                }

                if (currentTranslate > 0) {
                    currentTranslate = 0;
                    left.classList.add(decorators.noVisibility);
                } else {
                    left.classList.remove(decorators.noVisibility);
                }

                if (-currentTranslate >= content.scrollWidth - contentBox.width) {
                    currentTranslate = contentBox.width - content.scrollWidth;
                    right.classList.add(decorators.noVisibility);
                } else {
                    right.classList.remove(decorators.noVisibility);
                }

                content.style.transform = `translateX(${currentTranslate}px)`;
            });
        });

        return carousel.getElementById('slider');
    }

    checkOverflow = () => {
        if (this.contentWrapper.scrollWidth > this.content.getBoundingClientRect().width) {
            this.right.classList.remove(decorators.noVisibility);
        }
    }
}
