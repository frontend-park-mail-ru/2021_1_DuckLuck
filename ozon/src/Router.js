/**
 * @description A simple class which provides routing in our app. window.history inside!
 */
class Router {
    /**
     *
     * @param {string} root root html element
     * @return {Router}
     */
    constructor(root) {
        if (Router.__instance) {
            return Router.__instance;
        }
        this.routes = {};
        this.root = root;
        Router.__instance = this;
    }

    /**
     * @param {string} path URL Path
     * @param {BaseView} View View in MVP Architecture
     * @return {Object} This object
     */
    register(path, View) {
        this.routes[path] = {
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
     * @param {boolean} replaceState If true - we replace the state to the new
     */
    open(path, replaceState = false) {
        const route = this.routes[path];

        if (!route) {
            this.open('/');
            return;
        }

        if (window.location.pathname !== path) {
            if (!replaceState) {
                window.history.pushState(
                    null,
                    '',
                    path,
                );
            } else {
                window.history.replaceState(
                    null,
                    '',
                    path,
                );
            }
        }

        let {View, view, el} = route;

        if (!view) {
            view = new View(this.root);
        }

        view.show();

        this.routes[path] = {View, view, el};
    }

    /**
     * @description We need to call this function to make router start works!
     */
    start() {
        this.root.addEventListener('click', function(event) {
            if (!(event.target instanceof HTMLAnchorElement)) {
                return;
            }

            event.preventDefault();
            const link = event.target;

            // console.log({
            //     pathname: link.pathname
            // });

            this.open(link.pathname);
        }.bind(this));

        window.addEventListener('popstate', function() {
            const currentPath = window.location.pathname;

            this.open(currentPath);
        }.bind(this));

        const currentPath = window.location.pathname;

        this.open(currentPath);
    }
}

export default Router;
