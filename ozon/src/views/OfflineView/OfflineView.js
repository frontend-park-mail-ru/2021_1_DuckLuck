import {BaseView} from '../BaseView.js';
import {Popup} from '../Common/Popup/Popup.js';
import {Blind} from '../Common/Blind/Blind.js';
import Router from '../../utils/router/Router.js';

/**
 * @class  SignupView
 * @extends BaseView
 * @classdesc Class for signup page
 */
export class OfflineView extends BaseView {
    /**
     *
     * @return {void} rendered page
     */
    render = () => {
        if (this.cache !== '') {
            this.parent.appendChild(this.cache);
            return;
        }

        const template = new Popup().getHtmlString({
            popupBody: 'YOU ARE CURRENTLY OFFLINE!',
            background: new Blind().getHtmlString(),
            popupType: 'signup',
        });

        this.cache = new DOMParser().parseFromString(template, 'text/html').getElementById('popup-wrapper');

        const blind = this.cache.getElementsByClassName('blind')[0];
        blind.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.remove();
            Router.return();
        });

        this.parent.appendChild(this.cache);
    }
}
