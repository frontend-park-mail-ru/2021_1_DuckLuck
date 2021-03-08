/**
 * This is a description of the MyClass constructor function.
 * @class
 * @classdesc This is a description of the MyClass class.
 */
export class Link {
    /**
     *
     * @param {string} href ref
     * @param {string} textContent tc
     * @param {string} dataset ds
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
