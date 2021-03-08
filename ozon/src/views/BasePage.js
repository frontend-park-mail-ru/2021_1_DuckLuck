/**
 * This is a description of the MyClass constructor function.
 * @class
 * @classdesc This is a description of the MyClass class.
 */
export class BasePage {
    _parent;
    _data;

    /**
     *
     * @param {Object} parent parents object
     */
    constructor(parent) {
        this._parent = parent;
        this._data = {};
    }

    /**
     *
     * @return {*}
     */
    get data() {
        return this._data;
    }

    /**
     *
     * @param {Object} data data object
     */
    set data(data) {
        this._data = data;
    }
}
