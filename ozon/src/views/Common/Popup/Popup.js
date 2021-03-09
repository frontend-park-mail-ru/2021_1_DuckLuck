import PopupTemplate from './Popup.hbs';

export class Popup {
    constructor({} = {}) {
        this.objectType = 'popup';
    };

    getHtmlString = ({popupBody, background, popupType}) => {
        return PopupTemplate({popupBody, background, popupType});
    };
}
