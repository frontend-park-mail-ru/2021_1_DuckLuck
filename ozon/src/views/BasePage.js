/**
 * @class BasePage
 * @classdesc Base class for all other views
 */
export class BasePage {
    _parent;
    _data;

    /**
     * @param {Object} parent parents object
     */
    constructor(parent) {
        this._parent = parent;
        this._data = {};
    }

    /**
     *
     * @return {Object} some data
     */
    get data() {
        return this._data;
    }

    /**
     *
     * @param {Object} data data to set
     */
    set data(data) {
        this._data = data;
    }
}
