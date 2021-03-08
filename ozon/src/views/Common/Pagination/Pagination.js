import {Button} from "../Button/Button.js"
import PaginationTemplate from "./Pagination.hbs"

export class Pagination {
    constructor({pagesCount, currentPage}) {
        this.pagesCount = pagesCount;
        this.currentPage = currentPage;
    }

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
            let buttonName;
            if (i === this.currentPage) {
               buttonName = 'button_pagination_current-page';
            } else {
               buttonName = 'button_pagination_common';
            }
            buttons.push(new Button({name: buttonName, value: i.toString()}));
        }

        if (this.pagesCount > this.currentPage + 2) {
            buttons.push(new Button({name: 'button_pagination_last', value: this.pagesCount.toString()}));
        }

        return PaginationTemplate({buttons: buttons});
    }
}
