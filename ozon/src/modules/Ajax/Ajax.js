(function() {
    class AjaxModule {

        ajaxGetUsingFetch = (ajaxArgs) => {
            return this.#ajaxUsingFetch({method: 'GET', ...ajaxArgs});
        }

        ajaxPostUsingFetch = (ajaxArgs) => {
            return this.#ajaxUsingFetch({method: 'POST', ...ajaxArgs});
        }

        ajaxDeleteUsingFetch = (ajaxArgs) => {
            return this.#ajaxUsingFetch({method: 'DELETE', ...ajaxArgs});
        }

        ajaxPutUsingFetch = (ajaxArgs) => {
            return this.#ajaxUsingFetch({method: 'PUT', ...ajaxArgs});
        }

        #ajaxUsingFetch = async (ajaxArgs) => {
            const response = await fetch (ajaxArgs.url, {
                method: ajaxArgs.method,
                body: (ajaxArgs.body) ? JSON.stringify(ajaxArgs.body) : null,
                credentials: 'include',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                }
            });

            const parsedJsonObject = await response.json();
            return {
                statusCode: response.status,
                responseObject: parsedJsonObject,
            };
        }
    }
    globalThis.AjaxModule = new AjaxModule();
})()
