export class AjaxModule {
    static getUsingFetch = (ajaxArgs) => {
        return this.#usingFetch({method: 'GET', ...ajaxArgs});
    }

    static postUsingFetch = (ajaxArgs) => {
        return this.#usingFetch({method: 'POST', ...ajaxArgs});
    }

    static deleteUsingFetch = (ajaxArgs) => {
        return this.#usingFetch({method: 'DELETE', ...ajaxArgs});
    }

    static putUsingFetch = (ajaxArgs) => {
        return this.#usingFetch({method: 'PUT', ...ajaxArgs});
    }

    static #usingFetch = async (ajaxArgs) => {
        // TODO: make beauty
        if (!ajaxArgs.data) {
            if (ajaxArgs.body) {
                ajaxArgs.body = JSON.stringify(ajaxArgs.body)
            }
        }  else {
            console.log("IMG!");
        }
        const response =  await fetch (ajaxArgs.url, {
            method: ajaxArgs.method,
            body: (ajaxArgs.body) ? ajaxArgs.body : null,
            credentials: 'include',
            mode: 'cors',
            // TODO: Uncomment and make multipart/data and boundary (doesnt work right now)
            // headers: {
            //     'Content-Type': 'application/json;charset=utf-8',
            // }
        });
        const parsedJson = await response.json();

        return {
            status: response.status,
            parsedJson,
        };
    }
}