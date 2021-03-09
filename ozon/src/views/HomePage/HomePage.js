import {BasePage} from '../BasePage.js';

/**
 * @class HomePage
 * @extends BasePage
 * @classdesc Class for initial, starting page
 */
export class HomePage extends BasePage {
    /**
     *
     * @param {Object} parent of a Home page (application)
     */
    constructor(parent) {
        super(parent);
    }

    /**
     *
     * @param {Object} config configuration which will use to render this page
     */
    render = (config) => {
        Object
            .keys(config)
            .map((menuKey) => {
                const {href, text} = config[menuKey];

                const menuItem = document.createElement('a');
                menuItem.href = href;
                menuItem.textContent = text;
                menuItem.dataset.section = menuKey;

                return menuItem;
            })
            .forEach((element) => {
                this._parent.appendChild(element);
            })
        ;
    }
}
