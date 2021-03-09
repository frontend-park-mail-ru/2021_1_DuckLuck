/**
 * @class Link
 * @classdesc This class is using for construct html via templates. One of the common views
 */
export class Link {
    /**
     *
     * @param {string} href link where to go
     * @param {string} name name of a link
     * @param {string} type type of a link
     */
    constructor({href, name, type} = {}) {
        this.objectType = 'link';
        this.href = href;
        this.name = name;
        this.type = type;
    }
}
