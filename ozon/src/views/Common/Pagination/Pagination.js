import {Button} from '../Button/Button.js';
import paginationTemplate from './Pagination.hbs';
import styles from './Pagination.css';

/**
 * @class Pagination
 * @classdesc This class is using for construct html via templates. One of the common views
 */
export class Pagination {
    /**
     *
     * @param {number} pagesCount maximum amount of page
     * @param {number} currentPage current page!
     */
    constructor({pagesCount, currentPage}) {
        this.pagesCount = pagesCount;
        this.currentPage = parseInt(currentPage);
        this.maxButtons = 10;
    }

    /**
     *
     * @return {string} generated HTML after templating
     */
    getHtmlString = () => {
        if (!this.pagesCount) {
            return '';
        }
        const buttons = [];
        let surplusPages = 0;
        let shortagePages = 0;
        for (
            let i = this.currentPage - this.maxButtons/2;
            i <= this.currentPage + this.maxButtons/2 + surplusPages;
            i++
        ) {
            if (i <= 0) {
                surplusPages++;
                continue;
            }
            if (i > this.pagesCount) {
                shortagePages = this.currentPage + this.maxButtons / 2 + surplusPages - i;
                break;
            }
            const buttonName = i === this.currentPage ? styles.currentPage : styles.commonPage;
            buttons.push(new Button({
                name: buttonName,
                value: i,
            }));
        }

        const shortageButtons = [];
        for (
            let i = parseInt(buttons[0].value) - shortagePages;
            i <= parseInt(buttons[0].value) + shortagePages;
            i++
        ) {
            if (i <= 0) {
                continue;
            }
            if (parseInt(buttons[0].value) <= i) {
                break;
            }
            shortageButtons.push(new Button({
                name: styles.commonPage,
                value: i,
            }));
        }
        const resultButtons = shortageButtons.concat(buttons);
        const firstButton = new Button({
            name: styles.bigButton,
            value: 1,
        });
        const nextButton = new Button({
            name: styles.bigButton,
            value: this.currentPage + 1,
        });
        if (parseInt(nextButton.value) > this.pagesCount) {
            nextButton.value = -1;
        }

        return paginationTemplate({
            firstButton: firstButton,
            buttons: resultButtons,
            nextButton: nextButton,
            styles: styles,
        });
    }
}
