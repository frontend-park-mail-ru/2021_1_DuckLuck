import {BasePage} from "../BasePage.js";

export class HomePage extends BasePage {
    #parent;
    #data;

    constructor(parent) {
        super ();
        this.#parent = parent;
        this.#data = {};
    }

    get data() {
        return this.#data;
    }

    set data(data) {
        this.#data = data;
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
                this.#parent.appendChild(element);
            })
        ;
    }
}