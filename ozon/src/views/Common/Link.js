/**
 * @class Link
 * @classdesc This class is using for construct html via templates. One of the common views
 */
export class Link {
    /**
     *
     * @param {string} href link where to go
     * @param {string} textContent text of link
     * @param {string} dataset dataset of link
     */
    constructor({href = '/home',
        textContent = '',
        dataset = '',
    } = {}) {
        this.objectType = 'link';
        this.href = href;
        this.textContent = textContent;
        this.section = dataset;
    }
}
