import {Button} from '../Button/Button.js';
import paginationTemplate from './Pagination.hbs';

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
        this.currentPage = currentPage;
    }

    /**
     *
     * @return {string} generated HTML after templating
     */
    getHtmlString = () => {
        const buttons = [];

        if (this.currentPage > 3) {
            buttons.push(new Button({name: 'button_pagination_first', value: '1'}));
        }

        for (let i = this.currentPage - 2; i <= this.currentPage + 2; i++) {
            if (i <= 0) {
                continue;
            }
            if (i > this.pagesCount) {
                break;
            }
            const buttonName = i === this.currentPage ? 'button_pagination_current-page' : 'button_pagination_common';
            buttons.push(new Button({name: buttonName, value: i.toString()}));
        }

        if (this.pagesCount > this.currentPage + 2) {
            buttons.push(new Button({name: 'button_pagination_last', value: this.pagesCount.toString()}));
        }

        return paginationTemplate({buttons: buttons});
    }
}
