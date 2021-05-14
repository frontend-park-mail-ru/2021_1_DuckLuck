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
        this.content = null;
        this.contentGap = null;
        this.contentWrapper = null;
        this.left = null;
        this.right = null;
        this.itemWidth = null;
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
        const slider = new DOMParser().parseFromString(template, 'text/html');
        const content = slider.getElementsByClassName(sliderStyles.content)[0];
        const contentWrapper = slider.getElementsByClassName(sliderStyles.contentWrapper)[0];
        const buttons = Array.from(slider.getElementsByClassName(buttonStyles.slider));
        const right = slider.getElementById('slider-right');
        const left = slider.getElementById('slider-left');


        this.content = content;
        this.contentWrapper = contentWrapper;
        this.right = right;
        this.left = left;


        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                button.disabled = true;
                const buttonTimeout = parseFloat(
                    getComputedStyle(content)
                        .transitionDuration.match(/[0-9]+\.?[0-9]+/)[0],
                ) * 1000;
                setTimeout(() => {
                    button.disabled = false;
                }, buttonTimeout);

                const contentWrapperBox = contentWrapper.getBoundingClientRect();
                const contentBox = content.getBoundingClientRect();

                let currentTranslate = parseInt(getComputedStyle(content).transform
                    .match(/matrix.*\((.+)\)/)[1].split(', ')[4]);


                const itemWidth = this.itemWidth;
                if (button === left) {
                    currentTranslate += Math.floor(contentWrapperBox.width / itemWidth) * itemWidth;
                } else {
                    currentTranslate -= Math.floor(contentWrapperBox.width / itemWidth) * itemWidth;
                }

                if (currentTranslate >= 0) {
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

        return slider.getElementById('slider');
    }

    checkOverflow = () => {
        this.contentGap = parseFloat(getComputedStyle(this.content).gap.match(/[0-9]+\.?[0-9]+/)[0]);
        this.itemWidth = this.content.children[0].getBoundingClientRect().width + this.contentGap;
        if (this.contentWrapper.scrollWidth > this.content.getBoundingClientRect().width) {
            this.content.style.maxWidth = `${Math.floor(
                this.content.getBoundingClientRect().width / this.itemWidth,
            ) * this.itemWidth}px`;

            this.right.classList.remove(decorators.noVisibility);
        }
    }
}
