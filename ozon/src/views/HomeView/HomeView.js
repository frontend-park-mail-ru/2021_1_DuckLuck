import {BaseView} from '../BaseView.js';
import homeViewTemplate from './HomeView.hbs';
import {Link} from '../Common/Link/Link.js';
import config from '../../utils/configs/homeConfig';

/**
 * @class HomeView
 * @extends BaseView
 * @classdesc Class for initial, starting page
 */
export class HomeView extends BaseView {
    /**
     *
     * @param {HTMLElement} parent Parent element
     * @param {Object} bus bus of this mvp part
     */
    constructor(parent, bus) {
        super(parent, bus);
    }

    render = () => {
        this.parent.innerHTML = '';
        if (this.cache) {
            this.parent.appendChild(this.cache);
            return;
        }


        const htmlTemplate = homeViewTemplate(
            {links:
                    config.map((elem) => {
                        return new Link({href: elem.href,
                            name: elem.name,
                            type: 'href',
                            dataSection: elem.dataSection});
                    }),
            },
        );
        this.cache = new DOMParser().parseFromString(htmlTemplate, 'text/html').
            getElementById('home-view-block');
        this.parent.appendChild(this.cache);
    }
}
