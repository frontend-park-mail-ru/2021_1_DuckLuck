/**
 * This is a description of the MyClass constructor function.
 * @class
 * @classdesc This is a description of the MyClass class.
 */
export class Input {
    /**
     *
     * @param {string} type type
     * @param {string} name name
     * @param {string} placeholder ph
     * @param {string} value vals
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
