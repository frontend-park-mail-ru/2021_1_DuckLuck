/**
 * @description A simple class which provides routing in our app. window.history inside!
 */
class Router {
    static #instance;
    #routes;
    #root;

    /**
     *
     * @return {Router}
     */
    constructor() {
        if (Router.#instance) {
            return Router.#instance;
        }
        this.#routes = {};
        Router.#instance = this;
    }

    /**
     * @param {HTMLElement} root root html element
     */
    setRoot(root) {
        this.#root = root;
    }

    /**
     * @param {string} path URL Path
     * @param {BaseView} View View in MVP Architecture
     * @return {Object} This object
     */
    register(path, View) {
        this.#routes[path] = {
            View: View,
            view: null,
            el: null,
        };

        return this;
    }

    /**
     * @description Return back in browse history
     */
    return() {
        window.history.back();
    }

    /**
     * @param {string} path
     * @param {Object} params params for Router
     */
    open(path, params = {
        replaceState: false,
        id: '',
    }) {
        const route = this.#routes[path];


        if (!route) {
            this.open('/');
            return;
        }

        if (params.id !== undefined && params.id !== '') {
            path = `${path}/${params.id}`;
        }

        if (window.location.pathname !== path && !params.replaceState) {
            window.history.pushState(
                null,
                '',
                path,
            );
        } else if (window.location.pathname !== path) {
            window.history.replaceState(
                null,
                '',
                path,
            );
        }

        let {View, view, el} = route;

        if (!view && params.id !== '') {
            view = new View(this.#root, params.id);
        } else if (!view) {
            view = new View(this.#root);
        }

        view.show();

        this.#routes[path] = {View, view, el};
    }

    /**
     * @description We need to call this function to make router start works!
     */
    start() {
        this.#root.addEventListener('click', function(event) {
            if (!(event.target instanceof HTMLAnchorElement)) {
                return;
            }

            event.preventDefault();
            const link = event.target;

            this.open(link.pathname);
        }.bind(this));

        window.addEventListener('popstate', function() {
            const currentPath = window.location.pathname;
            const {path, id} = this.splitURL(currentPath);
            this.open(path, {id: id});
        }.bind(this));

        const currentPath = window.location.pathname;
        const {path, id} = this.splitURL(currentPath);
        this.open(`/${path}`, {id: id});
    }

    /**
     *
     * @param {URL} path
     * @return {{path, id: (string|number)}}
     */
    splitURL(path) {
        const pathArray = path.split('/');
        path = pathArray[1];
        const id = pathArray[2] === undefined ? '' : pathArray[2];
        return {path, id};
    }
}

export default new Router();
