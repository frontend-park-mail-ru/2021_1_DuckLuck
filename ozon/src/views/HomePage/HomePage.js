import {BasePage} from '../BasePage.js';

export class HomePage extends BasePage {

    constructor(parent) {

        super(parent);

    }

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
