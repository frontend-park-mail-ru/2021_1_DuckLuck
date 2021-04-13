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
        this.#routes = [];
        Router.#instance = this;
    }

    /**
     * @param {HTMLElement} root root html element
     */
    set root(root) {
        this.#root = root;
    }

    /**
     * @param {RegExp} path URL Path
     * @param {BaseView} view View in MVP Architecture
     * @return {Object} This object
     */
    register(path, view) {
        this.#routes.push([path, view]);
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
    }) {
        let route;
        let groups;
        for (const page of this.#routes) {
            if (path.match(page[0])) {
                groups = path.match(page[0]).groups;
                route = page;
            }
        }


        if (!route) {
            this.open('/');
            return;
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

        const view = route[1];
        if (groups) {
            view.IDs = groups;
        }


        console.log(view);

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
            let currentPath = window.location.pathname;
            if (currentPath[0] !== '/') {
                currentPath = '/' + url;
            }
            this.open(currentPath);
        });

        this.open(window.location.pathname);
    }
}

export default new Router();
