import {serverApiPath, urls} from '../../utils/urls/urls';

/**
 *
 * @class AjaxModule
 * @classdesc This class uses only by his private methods.
 * Responsible for communication with backend via Ajax.
 */

const csrfTokenMinutesValid = 15;
const secondsInMinute = 60;
const MillisecondsInSecond = 1e3;

/**
 * @description AJAX interaction class
 */
export class AjaxModule {
    static #csrfToken;

    /**
     * @description sets a cookie and gets a csrf token for HTTP header
     */
    static getCSRFToken =() => {
        AjaxModule.getUsingFetch({
            url: serverApiPath + urls.csrfUrl,
        }).then(async(response) => {
            return response.json();
        }).then(async(response) => {
            AjaxModule.#csrfToken = response.token;
            setTimeout(this.getCSRFToken, csrfTokenMinutesValid * secondsInMinute * MillisecondsInSecond);
        }).catch((err) => {
            console.error(err);
        });
    }
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
     * @param {Object} ajaxArgs arguments for ajax
     * @return {Promise<Response>}
     * @description all these functions above using this private function to communicate with backend.
     */
    static #usingFetch = async(ajaxArgs) => {
        if (!ajaxArgs.data && ajaxArgs.body) {
            ajaxArgs.body = JSON.stringify(ajaxArgs.body);
        }

        const init = {
            method: ajaxArgs.method,
            body: (ajaxArgs.body) ? ajaxArgs.body : null,
            credentials: 'include',
            mode: 'cors',
        };

        if (ajaxArgs.data) {
            init['enctype'] = 'multipart/form-data';
            init['headers'] = {
                'X-CSRF-TOKEN': AjaxModule.#csrfToken,
            };
        } else {
            init['headers'] = {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRF-TOKEN': AjaxModule.#csrfToken,
            };
        }

        return fetch(ajaxArgs.url, init);
    }
}
