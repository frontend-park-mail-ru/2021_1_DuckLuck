export class AjaxModule {
    getUsingFetch = (ajaxArgs) => {
        return this.#usingFetch({method: 'GET', ...ajaxArgs});
    }

    postUsingFetch = (ajaxArgs) => {
        return this.#usingFetch({method: 'POST', ...ajaxArgs});
    }

    deleteUsingFetch = (ajaxArgs) => {
        return this.#usingFetch({method: 'DELETE', ...ajaxArgs});
    }

    putUsingFetch = (ajaxArgs) => {
        return this.#usingFetch({method: 'PUT', ...ajaxArgs});
    }

    #usingFetch = async (ajaxArgs) => {
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