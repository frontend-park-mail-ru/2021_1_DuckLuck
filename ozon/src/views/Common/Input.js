/**
 * @class Input
 * @classdesc This class is using for construct html via templates. One of the common views
 */
export class Input {
    /**
     *
     * @param {string} type type of input(email, password, etc...)
     * @param {string} name name of input
     * @param {string} placeholder placeholder of input
     * @param {string} value value inside the placeholder
     */
    constructor({type = 'text',
        name = '',
        placeholder='',
        value = ''} = {}) {
        this.objectType = 'input';
        this.name=name;
        this.type = type;
        this.placeholder = placeholder;
        this.value = value;
    }
}
