export class Input {

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
