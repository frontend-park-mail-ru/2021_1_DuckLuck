import offlineFormTemplate from './OfflineForm.hbs';
import offlineFormStyles from './OfflineForm.scss';


/**
 * @class OfflineForm
 * @classdesc This class is using for construct html via templates. One of the common views
 */
export class OfflineForm {
    /**
     * A default constructor for OfflineForm
     */
    constructor() {
        this.objectType = 'offlineForm';
    };

    /**
     *
     * @return {string} HTML string, which will generated after templating
     */
    getHtmlString = () => {
        return offlineFormTemplate({
            formType: this.objectType,
            styles: offlineFormStyles,
        });
    };
}
