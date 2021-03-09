/**
 *
 * @class AjaxModule
 * @classdesc This class uses only by his private methods. Responsible for communication with backend via Ajax.
 */
export class AjaxModule {
    /**
     *
     * @param {Object} ajaxArgs Arguments for ajax GET method
     * @return {Promise<Response<*, Record<string, *>, number>>}
     */
    static getUsingFetch = (ajaxArgs) => {
        return this.#usingFetch({method: 'GET', ...ajaxArgs});
    }

    /**
     *
     * @param {Object} ajaxArgs Arguments for ajax POST method
     * @return {Promise<Response<*, Record<string, *>, number>>}
     */
    static postUsingFetch = (ajaxArgs) => {
        return this.#usingFetch({method: 'POST', ...ajaxArgs});
    }

    /**
     *
     * @param {Object} ajaxArgs Arguments for ajax DELETE method
     * @return {Promise<Response<*, Record<string, *>, number>>}
     */
    static deleteUsingFetch = (ajaxArgs) => {
        return this.#usingFetch({method: 'DELETE', ...ajaxArgs});
    }

    /**
     *
     * @param {Object} ajaxArgs Arguments for ajax PUT method
     * @return {Promise<Response<*, Record<string, *>, number>>}
     */
    static putUsingFetch = (ajaxArgs) => {
        return this.#usingFetch({method: 'PUT', ...ajaxArgs});
    }


    /**
     *
     * @param {Object} ajaxArgs argiments for ajax
     * @return {Promise<Response>}
     * @description all these functions above using this private function to communicate with backend.
     */
    static #usingFetch = (ajaxArgs) => {
        // TODO: make beauty
        if (!ajaxArgs.data && ajaxArgs.body) {
            ajaxArgs.body = JSON.stringify(ajaxArgs.body);
        }
        return fetch(ajaxArgs.url, {
            method: ajaxArgs.method,
            body: (ajaxArgs.body) ? ajaxArgs.body : null,
            credentials: 'include',
            mode: 'cors',
            // TODO: Uncomment and make multipart/data and boundary (doesnt work right now)
            // headers: {
            //     'Content-Type': 'application/json;charset=utf-8',
            // }
        });
    }
}
