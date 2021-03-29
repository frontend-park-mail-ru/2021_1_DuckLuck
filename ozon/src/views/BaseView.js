/**
 * @class BaseView
 * @classdesc Base class for all other views
 */
export class BaseView {
    /**
     *
     * @param {Object} el HTML element
     */
    constructor(el) {
        this.el = el;

        this.el.dataset.view = this.constructor.name;
        this.el.hidden = false;
        this._cache = '';
    }

    /**
     *
     * @return {boolean} is element Active?
     */
    get active() {
        return !this.el.hidden;
    }

    /**
     *
     * @return {string} Cache of View
     */
    get cache() {
        return this._cache;
    }

    /**
     *
     * @param {string} cache Cache of View
     */
    set cache(cache) {
        this._cache = cache;
    }

    /**
     *
     * @param {Object} presenter Chained Presenter of View
     */
    set presenter(presenter) {
        this._presenter = presenter;
    }

    /**
     * @description Hides an element in HTML
     */
    hide() {
        this._cache.hidden = true;
    }

    /**
     * @description Removes Element from HTML
     */
    remove() {
        this.el.removeChild(this.cache);
    }

    /**
     * @description Show element in HTML
     */
    show() {
        this.render();
        this._cache.hidden = false;
    }

    /**
     * @description Drop cache and render
     */
    reRender() {
        this._cache = '';
        this.render();
    }

    /**
     * Render from template
     */
    render() {

    }
}
