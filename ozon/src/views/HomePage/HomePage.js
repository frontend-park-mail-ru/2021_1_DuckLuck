import {BasePage} from '../BasePage.js';

/**
 * This is a description of the MyClass constructor function.
 * @class
 * @classdesc This is a description of the MyClass class.
 */
export class HomePage extends BasePage {
    /**
     *
     * @param {Object} parent parent
     */
    constructor(parent) {
        super(parent);
    }

    /**
     *
     * @param {Object} config configuration
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
