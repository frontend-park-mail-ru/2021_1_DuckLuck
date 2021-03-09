import BlindTemplate from './Blind.hbs';

/**
 * @class Blind
 * @classdesc This class is using for construct html via templates. One of the common views
 */
export class Blind {
    constructor() {
        this.objectType = 'blind';
    };

    /**
     * @return {string} HTML string, which will generated after templating
     */
    getHtmlString = () => {
        return BlindTemplate({});
    };
}
