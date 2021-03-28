/**
 * @class BaseView
 * @classdesc Base class for all other views
 */
export class BaseView {
    /**
     * @param {Object} parent parents object
     */0

    constructor(el) {
        this.el = el;

        this.el.dataset.view = this.constructor.name;
        this.el.hidden = false;
        this._cache = '';
    }

    get active() {
        return !this.el.hidden;
    }

    get cache() {
        return this._cache;
    }

    set cache(cache) {
        this._cache = cache;
    }

    hide () {
        this._cache.hidden = true;
    }

    show () {
        this.render();
        this._cache.hidden = false;
    }

    reRender () {
        this._cache = '';
        this.render();
    }

    render() {

    }
}
