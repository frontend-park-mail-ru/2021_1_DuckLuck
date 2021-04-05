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
    set root(root) {
        this.#root = root;
    }

    /**
     * @param {string} path URL Path
     * @param {BaseView} view View in MVP Architecture
     * @return {Object} This object
     */
    register(path, view) {
        this.#routes[path] = {
            view: view,
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

        const {view} = route;

        if (params.id !== undefined && params.id !== '') {
            view.ID = params.id;
        }

        view.show();
    }

    /**
     * @description We need to call this function to make router start works!
     */
    start() {
        this.#root.addEventListener('click', (event) => {
            if (!(event.target instanceof HTMLAnchorElement)) {
                return;
            }

            event.preventDefault();
            const link = event.target;

            this.open(link.pathname);
        });

        window.addEventListener('popstate', () => {
            const currentPath = window.location.pathname;
            let {url, id} = this.splitURL(currentPath);
            if (url[0] !== '/') {
                url = '/' + url;
            }
            this.open(url, {id: id});
        });

        const currentPath = window.location.pathname;
        const {url, id} = this.splitURL(currentPath);
        this.open(`/${url}`, {id: id});
    }

    /**
     *
     * @param {string} url
     * @param {Boolean} isPathOnly is url contains only pure path?
     * @return {{path, id: (string|number)}}
     */
    splitURL(url, isPathOnly = false) {
        const pathArray = url.split('/');
        url = pathArray[1 - isPathOnly];
        const id = pathArray[2 - isPathOnly] === undefined ? '' : pathArray[2 - isPathOnly];
        return {url, id};
    }
}

export default new Router();
